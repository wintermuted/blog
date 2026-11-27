require_relative "github-app-runtime"

begin
  Dir.chdir(File.expand_path("..", __dir__))
  GithubAppRuntime.configure_windows!
  GithubAppRuntime.load_bundle!
  ARGV.unshift("serve", "--livereload")
  load Gem.bin_path("jekyll", "jekyll")
rescue GithubAppRuntime::Error => error
  warn "Preview failed: #{error.message}"
  exit 1
end
