(function($) {
   $(function() {
       $(".diff").each(function() {
           var $this = $(this);
           if (Number($this.text()) > 0 ) {
               $this.addClass("positive");
           } else if (Number($this.text()) < 0) {
               $this.addClass("negative");
           }
       });


        $(".money").each(function() {
            $(this).text(addCommasToNumber($(this).text()));
        });


   });


    function addCommasToNumber(str) {
        return str.replace(addCommasRe, ",");
    }

    var addCommasRe = /\B(?=(?:\d{3})+(?!\d))/g;
})(jQuery);