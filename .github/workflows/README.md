# GitHub Actions Workflows

This directory contains GitHub Actions workflows for building and deploying the Jekyll site.

## Workflows

### deploy.yml
Builds and deploys the Jekyll site to the production Netlify site when changes are pushed to the master branch.

- **Trigger**: Push to `master` branch
- **Target**: Netlify production site (`reverent-aryabhata-74e98b`)
- **URL**: Main site accessible via custom domains (`jnyeholt.dev`, `www.jnyeholt.dev`)
- **Method**: GitHub Actions builds Jekyll, then publishes `_site/` to Netlify

### deploy-pr-preview.yml
Creates preview deployments for pull requests using Netlify, completely separate from the main site deployment.

- **Trigger**: Pull request opened, synchronized, or reopened
- **Target**: Netlify (separate hosting platform)
- **URL**: Unique Netlify deploy preview URL (e.g., `https://deploy-preview-71--your-site.netlify.app`)
- **Features**:
  - Automatically builds the Jekyll site for preview
  - Deploys to Netlify to avoid conflicts with main site
  - Posts a comment on the PR with the preview URL
  - Updates the preview when the PR is updated
  - Automatic cleanup when PR is closed
  - No conflicts with the main site's custom domain

### cleanup-pr-preview.yml
Posts a cleanup confirmation when pull requests are closed.

- **Trigger**: Pull request closed (merged or unmerged)
- **Action**: Posts a confirmation comment (Netlify handles actual cleanup automatically)
- **Features**:
  - Netlify automatically removes deploy previews
  - Posts a comment for visibility

## PR Preview Usage

When you open a pull request:
1. The `deploy-pr-preview.yml` workflow automatically runs
2. It builds the Jekyll site (without baseurl, as Netlify serves from root)
3. The site is deployed to Netlify with a unique preview URL
4. A bot comments on your PR with the preview URL
5. When you push updates, the preview is automatically redeployed
6. When the PR is closed, Netlify automatically removes the deploy preview

## Requirements

### Main deployment (deploy.yml)
- Ruby 3.2
- System dependencies for image processing (libvips, etc.)
- Jekyll and all gems specified in Gemfile
- **Netlify credentials**: `NETLIFY_AUTH_TOKEN` repository secret must be configured for production deploys

### PR previews (deploy-pr-preview.yml)
- Ruby 3.2
- System dependencies for image processing (libvips, etc.)
- Jekyll and all gems specified in Gemfile
- **Netlify credentials**: Two repository secrets must be configured:
  - `NETLIFY_AUTH_TOKEN`: Your Netlify personal access token
  - `NETLIFY_SITE_ID`: Your Netlify site ID

## Setup Netlify for PR Previews

To enable PR previews, you need to configure Netlify credentials as repository secrets:

### Step 1: Create a Netlify site
1. Go to [Netlify](https://app.netlify.com/) and sign up/login
2. Create a new site (can be empty/placeholder for now)
3. Note your **Site ID** from Site settings > General > Site details

### Step 2: Generate a Personal Access Token
1. Go to User settings > Applications > Personal access tokens
2. Click "New access token"
3. Give it a name (e.g., "GitHub Actions")
4. Copy the token (you won't see it again)

### Step 3: Add secrets to GitHub
1. Go to your repository Settings > Secrets and variables > Actions
2. Add two secrets:
   - Name: `NETLIFY_AUTH_TOKEN`, Value: your personal access token
   - Name: `NETLIFY_SITE_ID`, Value: your site ID

## Why Netlify?

Netlify is a widely-adopted, modern platform that:
- Has excellent GitHub Actions support
- Automatically manages deploy previews
- Provides instant rollbacks
- Offers a generous free tier
- Is actively maintained and well-documented
- Used by thousands of production sites

## Production Hosting Note

The repository previously published production builds to `gh-pages`, but the live custom domains resolve to Netlify. Production deploys therefore need to publish to Netlify to update the public site.
