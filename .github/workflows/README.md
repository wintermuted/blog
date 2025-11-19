# GitHub Actions Workflows

This directory contains GitHub Actions workflows for building and deploying the Jekyll site.

## Workflows

### deploy.yml
Builds and deploys the Jekyll site to GitHub Pages (gh-pages branch) when changes are pushed to the master branch.

- **Trigger**: Push to `master` branch
- **Target**: Root of gh-pages branch
- **URL**: Main site accessible via custom domain (jnyeholt.dev)
- **Method**: GitHub Pages with CNAME
- **Baseurl**: None (serves from root for custom domain)

### deploy-pr-preview.yml
Creates preview deployments for pull requests on GitHub Pages (without custom domain).

- **Trigger**: Pull request opened, synchronized, or reopened
- **Target**: `pr-<number>/` subdirectory on gh-pages branch
- **URL**: `https://wintermuted.github.io/blog/pr-<number>/`
- **Baseurl**: `/blog/pr-<number>` (for GitHub Pages project URL)
- **Features**:
  - Automatically builds the Jekyll site with PR-specific baseurl
  - Deploys to gh-pages without CNAME (uses GitHub Pages URL, not custom domain)
  - Posts a comment on the PR with the preview URL
  - Updates the preview when the PR is updated
  - No conflicts with main site's custom domain
  - No external services or secrets required

### cleanup-pr-preview.yml
Removes PR preview deployments from gh-pages when pull requests are closed.

- **Trigger**: Pull request closed (merged or unmerged)
- **Action**: Removes `pr-<number>/` directory from gh-pages branch
- **Features**:
  - Checks if preview exists before attempting removal
  - Posts a confirmation comment on the PR
  - Only removes the specific PR's preview

## PR Preview Usage

When you open a pull request:
1. The `deploy-pr-preview.yml` workflow automatically runs
2. It builds the Jekyll site with baseurl `/blog/pr-<number>` for GitHub Pages URLs
3. The site is deployed to `pr-<number>/` subdirectory on gh-pages branch
4. A bot comments on your PR with the preview URL (GitHub Pages URL, not custom domain)
5. When you push updates, the preview is automatically redeployed
6. When the PR is closed, the preview directory is automatically removed

**Preview URLs follow the pattern**: `https://wintermuted.github.io/blog/pr-<number>/`

## How It Works

The key to avoiding conflicts between the main site and PR previews:

1. **Main site** (deploy.yml):
   - Deploys to root of gh-pages with CNAME file
   - Accessible via custom domain: `https://jnyeholt.dev/`
   - Built without baseurl

2. **PR previews** (deploy-pr-preview.yml):
   - Deploy to subdirectories: `pr-<number>/`
   - Do NOT include CNAME file
   - Built with baseurl `/blog/pr-<number>`
   - Accessible via GitHub Pages URLs: `https://wintermuted.github.io/blog/pr-<number>/`
   - Custom domain still works for main site because CNAME is in root

This approach means:
- Main site uses custom domain (jnyeholt.dev)
- PR previews use GitHub Pages URLs (wintermuted.github.io)
- No conflicts between deployments
- No external services required
- Everything stays within GitHub ecosystem

## Requirements

All workflows require:
- Ruby 3.2
- System dependencies for image processing (libvips, etc.)
- Jekyll and all gems specified in Gemfile
- No external secrets or services needed
