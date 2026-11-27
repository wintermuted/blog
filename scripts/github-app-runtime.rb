require "open3"

module GithubAppRuntime
  class Error < StandardError; end

  def self.windows?
    Gem.win_platform?
  end

  def self.executables(name)
    ENV.fetch("PATH", "").split(File::PATH_SEPARATOR).filter_map do |directory|
      path = File.join(directory.delete_prefix('"').delete_suffix('"'), "#{name}.exe")
      File.realpath(path) if File.file?(path)
    end
  end

  def self.powershell_vips
    output, error, status = Open3.capture3(
      "powershell.exe", "-NoProfile", "-NonInteractive", "-Command",
      "(Get-Command vips.exe -CommandType Application -ErrorAction Stop).Source"
    )
    raise Error, "Cannot discover libvips: #{error.strip}" unless status.success?

    output.strip
  rescue Errno::ENOENT
    raise Error, "Install libvips and add its bin directory to PATH (vips.exe must be discoverable)."
  end

  def self.vips_directory
    candidates = executables("vips")
    candidates << powershell_vips unless candidates.any? do |path|
      File.file?(File.join(File.dirname(path), "libvips-42.dll"))
    end
    candidates.each do |path|
      next unless File.file?(path)

      directory = File.dirname(File.realpath(path))
      return directory if File.file?(File.join(directory, "libvips-42.dll"))
    end
    raise Error, "Cannot find libvips-42.dll beside vips.exe. Install the libvips DLL distribution and add its bin directory to PATH."
  end

  def self.set_dll_directory(directory)
    require "fiddle"

    kernel = Fiddle.dlopen("kernel32")
    # 64-bit Windows has a unified ABI; Fiddle exposes STDCALL only on 32-bit.
    convention = if Fiddle::Function.const_defined?(:STDCALL)
      Fiddle::Function::STDCALL
    else
      Fiddle::Function::DEFAULT
    end
    setter = Fiddle::Function.new(
      kernel["SetDllDirectoryW"], [Fiddle::TYPE_VOIDP], Fiddle::TYPE_INT, convention
    )
    wide_path = (directory + "\0").encode(Encoding::UTF_16LE)
    return if setter.call(wide_path) != 0

    last_error = Fiddle::Function.new(
      kernel["GetLastError"], [], Fiddle::TYPE_LONG, convention
    ).call
    raise Error, "SetDllDirectoryW failed for #{directory} (Windows error #{last_error})."
  end

  def self.configure_windows!
    return unless windows?

    directory = vips_directory
    set_dll_directory(directory)
    ENV["PATH"] = [directory, ENV["PATH"]].compact.join(File::PATH_SEPARATOR)
  end

  def self.check_setup_prerequisites!
    return unless windows?

    if executables("node").empty?
      raise Error, "Install Node.js and add node.exe to PATH for Windows Autoprefixer support."
    end
  end

  def self.load_bundle!
    require "bundler/setup"
    require "vips" if windows?
  rescue LoadError => error
    raise Error, "Cannot load preview dependencies: #{error.message}. Run Setup and verify the libvips DLL dependencies."
  end
end
