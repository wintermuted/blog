source "https://rubygems.org"

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
gem "jekyll", "~> 4.0"
# gem "jekyll", github: "jekyll/jekyll", ref: "refs/pull/9248/head"


# This is the default theme for new Jekyll sites. You may change this to anything you like.
gem "minima", "~> 2.0"
gem 'jekyll-autoprefixer'
# libv8-node ships no x64-mingw-ucrt binary and cannot build on Windows, so skip
# installing mini_racer there. install_if keeps it in the lockfile for every other
# platform, which matters because CI installs with frozen mode enabled.
install_if -> { !Gem.win_platform? } do
  gem "mini_racer"
end

# If you have any plugins, put them here!
group :jekyll_plugins do
   # gem 'jekyll-admin'
   gem "jekyll-feed", "~> 0.15.1"
   gem 'jekyll-timeago', '~> 0.13.1'
   gem 'jekyll-archives'
   gem 'jekyll_picture_tag', '~> 2.1.3'
end
