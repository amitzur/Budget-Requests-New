(function($) {
    $(function() {
        $(".diff").each(function() {
            var $this = $(this);
            if (Number($this.val()) > 0 ) {
                $this.addClass("positive");
            } else if (Number($this.val()) < 0) {
                $this.addClass("negative");
            }
        });


        $(".money").each(function() {
            $(this).val(addCommasToNumber($(this).val()));
        });


    });

    function addCommasToNumber(str) {
        return str.replace(addCommasRe, ",");
    }

    var addCommasRe = /\B(?=(?:\d{3})+(?!\d))/g;
})(jQuery);