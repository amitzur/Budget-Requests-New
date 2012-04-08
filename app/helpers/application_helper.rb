module ApplicationHelper
    def title
        base_title = t(:pniyot_taktsiviot)
        if @title.nil?
            base_title
        else
            "#{base_title} | #{@title}"
        end
    end

  def heading
    base_heading = t(:pniyot_taktsiviot)
    if @heading.nil?
      base_heading
    else
      @heading
    end
  end
end
