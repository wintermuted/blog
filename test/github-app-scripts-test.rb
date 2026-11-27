require "minitest/autorun"
require "tmpdir"
require "fileutils"
require "json"
require "open3"
require "rbconfig"
require "fiddle"
require_relative "../scripts/github-app-runtime"

class GithubAppScriptsTest < Minitest::Test
  def with_vips
    Dir.mktmpdir("libvips with spaces ") do |directory|
      executable = File.join(directory, "vips.exe")
      File.write(executable, "")
      File.write(File.join(directory, "libvips-42.dll"), "")
      yield directory, executable
    end
  end

  def test_discovers_dll_next_to_path_executable_with_spaces
    with_vips do |directory, executable|
      GithubAppRuntime.stub(:executables, [executable]) do
        GithubAppRuntime.stub(:powershell_vips, -> { flunk "unneeded PowerShell lookup" }) do
          assert_equal File.realpath(directory), GithubAppRuntime.vips_directory
        end
      end
    end
  end

  def test_falls_back_to_powershell_resolved_executable
    with_vips do |directory, executable|
      GithubAppRuntime.stub(:executables, []) do
        GithubAppRuntime.stub(:powershell_vips, executable) do
          assert_equal File.realpath(directory), GithubAppRuntime.vips_directory
        end
      end
    end
  end

  def test_missing_dll_is_an_actionable_error
    Dir.mktmpdir do |directory|
      executable = File.join(directory, "vips.exe")
      File.write(executable, "")
      GithubAppRuntime.stub(:executables, [executable]) do
        GithubAppRuntime.stub(:powershell_vips, executable) do
          error = assert_raises(GithubAppRuntime::Error) { GithubAppRuntime.vips_directory }
          assert_match "libvips-42.dll", error.message
        end
      end
    end
  end

  def test_powershell_discovery_failure_is_not_silently_ignored
    status = Object.new
    def status.success?; false; end
    Open3.stub(:capture3, ["", "vips.exe was not found", status]) do
      error = assert_raises(GithubAppRuntime::Error) { GithubAppRuntime.powershell_vips }
      assert_match "vips.exe was not found", error.message
    end
  end

  def test_missing_powershell_reports_libvips_prerequisite
    Open3.stub(:capture3, ->(*) { raise Errno::ENOENT }) do
      error = assert_raises(GithubAppRuntime::Error) { GithubAppRuntime.powershell_vips }
      assert_match "Install libvips", error.message
    end
  end

  def test_non_windows_does_not_discover_or_configure_dlls
    GithubAppRuntime.stub(:windows?, false) do
      GithubAppRuntime.stub(:vips_directory, -> { flunk "Windows discovery on another OS" }) do
        GithubAppRuntime.configure_windows!
        GithubAppRuntime.check_setup_prerequisites!
      end
    end
  end

  def test_configures_dll_search_and_child_process_path
    original = ENV["PATH"]
    with_vips do |directory, _|
      configured = nil
      GithubAppRuntime.stub(:windows?, true) do
        GithubAppRuntime.stub(:vips_directory, directory) do
          GithubAppRuntime.stub(:set_dll_directory, ->(path) { configured = path }) do
            GithubAppRuntime.configure_windows!
            assert_equal directory, configured
            assert_equal "#{directory}#{File::PATH_SEPARATOR}#{original}", ENV["PATH"]
          end
        end
      end
    end
  ensure
    ENV["PATH"] = original
  end

  def test_dll_configuration_failure_propagates_without_mutating_path
    original = ENV["PATH"]
    GithubAppRuntime.stub(:windows?, true) do
      GithubAppRuntime.stub(:vips_directory, "missing DLL directory") do
        GithubAppRuntime.stub(:set_dll_directory, ->(_) { raise GithubAppRuntime::Error, "DLL failure" }) do
          assert_raises(GithubAppRuntime::Error) { GithubAppRuntime.configure_windows! }
          assert_equal original, ENV["PATH"]
        end
      end
    end
  end

  def test_native_dll_failure_reports_windows_error_and_uses_wide_path
    received = nil
    setter = ->(path) { received = path; 0 }
    last_error = -> { 126 }
    library = { "SetDllDirectoryW" => 1, "GetLastError" => 2 }
    factory = ->(address, *) { address == 1 ? setter : last_error }
    Fiddle.stub(:dlopen, library) do
      Fiddle::Function.stub(:new, factory) do
        error = assert_raises(GithubAppRuntime::Error) do
          GithubAppRuntime.set_dll_directory("C:\\vips with spaces")
        end
        assert_match "Windows error 126", error.message
        assert_equal ("C:\\vips with spaces\0").encode(Encoding::UTF_16LE), received
      end
    end
  end

  def test_missing_native_dependency_reports_setup_guidance
    GithubAppRuntime.stub(:windows?, true) do
      GithubAppRuntime.stub(:require, ->(name) { raise LoadError, "missing DLL" if name == "vips" }) do
        error = assert_raises(GithubAppRuntime::Error) { GithubAppRuntime.load_bundle! }
        assert_match "Run Setup", error.message
        assert_match "missing DLL", error.message
      end
    end
  end

  def test_missing_node_stops_windows_setup
    GithubAppRuntime.stub(:windows?, true) do
      GithubAppRuntime.stub(:executables, []) do
        error = assert_raises(GithubAppRuntime::Error) { GithubAppRuntime.check_setup_prerequisites! }
        assert_match "Node.js", error.message
      end
    end
  end

  def test_executable_discovery_handles_quoted_path_with_spaces
    with_vips do |directory, executable|
      original = ENV["PATH"]
      ENV["PATH"] = "\"#{directory}\""
      assert_equal [File.realpath(executable)], GithubAppRuntime.executables("vips")
    ensure
      ENV["PATH"] = original
    end
  end

  def run_entrypoint(name, *arguments, fail_setup: false)
    Dir.mktmpdir("script fixtures ") do |directory|
      boot = File.join(directory, "boot.rb")
      fake_jekyll = File.join(directory, "jekyll.rb")
      FileUtils.mkdir_p(File.join(directory, "bundler"))
      File.write(File.join(directory, "bundler.rb"), "")
      File.write(File.join(directory, "bundler", "cli.rb"), <<~RUBY)
        module Bundler
          class CLI
            def self.start(arguments)
              puts JSON.generate(arguments)
              exit 7 if #{fail_setup}
            end
          end
        end
      RUBY
      File.write(fake_jekyll, "puts JSON.generate(ARGV)\n")
      File.write(boot, <<~RUBY)
        require "json"
        require #{File.expand_path("../scripts/github-app-runtime", __dir__).inspect}
        def GithubAppRuntime.configure_windows!; end
        def GithubAppRuntime.check_setup_prerequisites!; end
        def GithubAppRuntime.load_bundle!; end
        def Gem.bin_path(*); #{fake_jekyll.inspect}; end
      RUBY
      script = File.expand_path("../scripts/github-app-#{name}.rb", __dir__)
      Open3.capture3(RbConfig.ruby, "-I", directory, "-r", boot, script, *arguments)
    end
  end

  def test_preview_forwards_arguments_without_shell_quoting
    output, error, status = run_entrypoint("preview", "--port", "4001", "--destination", "path with spaces")
    assert status.success?, error
    assert_equal ["serve", "--livereload", "--port", "4001", "--destination", "path with spaces"], JSON.parse(output)
  end

  def test_setup_forwards_bundler_arguments
    output, error, status = run_entrypoint("setup", "--jobs", "2")
    assert status.success?, error
    assert_equal ["install", "--jobs", "2"], JSON.parse(output)
  end

  def test_setup_preserves_bundler_failure
    _, _, status = run_entrypoint("setup", fail_setup: true)
    assert_equal 7, status.exitstatus
  end
end
