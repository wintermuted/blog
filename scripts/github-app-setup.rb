require_relative "github-app-runtime"

begin
  Dir.chdir(File.expand_path("..", __dir__))
  GithubAppRuntime.check_setup_prerequisites!
  GithubAppRuntime.configure_windows!
  require "bundler"
  require "bundler/cli"
  Bundler::CLI.start(["install", *ARGV])
  GithubAppRuntime.load_bundle!
rescue GithubAppRuntime::Error => error
  warn "Setup failed: #{error.message}"
  exit 1
end
