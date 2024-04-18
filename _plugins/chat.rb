module Jekyll
  class ChatBlock < Liquid::Block

    def render(context)
      text = super
      #"<pre>#{text} #{Time.now}</pre>"
      render_ex(context, text)
    end

    def render_ex(context, text)
      site = context.registers[:site]
      converter = site.find_converter_instance(::Jekyll::Converters::Markdown)

      baseurl = context.registers[:site].config['baseurl']
      r = Kramdown::Document.new(text,{remove_span_html_tags:true}).to_html # render markdown in caption
      r = converter.convert(r)
      r = "<div class='bg-gray-100 px-4 py-2 rounded-md prose-sm'>#{r}</div>"
      r
    end
  end
end

Liquid::Template.register_tag('chat', Jekyll::ChatBlock)
