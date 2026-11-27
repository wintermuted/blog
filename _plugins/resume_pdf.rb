# Publish the reviewed bundle's PDF at its stable public URL.
module Jekyll
  class ResumePdf < StaticFile
    def destination(dest)
      File.join(dest, "resume.pdf")
    end
  end

  class ResumePdfGenerator < Generator
    def generate(site)
      path = File.join(site.source, "resume-bundle", "resume.pdf")
      site.config["resume_bundle_ready"] = File.file?(File.join(site.source, "resume-bundle", "manifest.json"))
      return unless File.file?(path)

      site.static_files << ResumePdf.new(site, site.source, "resume-bundle", "resume.pdf")
    end
  end
end
