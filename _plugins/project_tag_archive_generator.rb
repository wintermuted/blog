require 'set'

module ProjectTagArchiveGenerator
  class Generator < Jekyll::Generator
    safe true
    priority :low

    def generate(site)
      project_pages = site.pages.select { |page| page.data['layout'] == 'project-detail' }
      return if project_pages.empty?

      project_tag_slugs = Set.new

      project_pages.each do |project|
        devlog_tag = normalize_slug(project.data['devlog_tag'])
        project_tag_slugs.add(devlog_tag) unless devlog_tag.empty?

        Array(project.data['tech_stack']).each do |stack_item|
          stack_slug = normalize_slug(stack_item)
          project_tag_slugs.add(stack_slug) unless stack_slug.empty?
        end
      end

      project_tag_slugs.each do |tag_slug|
        tag_url = "/weblog/tag/#{tag_slug}/"
        next if site.pages.any? { |page| page.url == tag_url }

        page = Jekyll::PageWithoutAFile.new(site, site.source, "weblog/tag/#{tag_slug}", 'index.html')
        page.content = ''
        page.data['layout'] = 'tag-archive'
        page.data['title'] = tag_slug
        page.data['permalink'] = tag_url
        page.data['posts'] = site.tags.fetch(tag_slug, [])
        site.pages << page
      end
    end

    private

    def normalize_slug(value)
      value.to_s.strip.downcase.gsub(/[^a-z0-9]+/, '-').gsub(/^-|-$/, '')
    end
  end
end