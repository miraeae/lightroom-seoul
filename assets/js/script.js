$(function(){
    var lastScrollTop = 0, delta = 15;
    
    $(window).scroll(function(e){
        var st = $(this).scrollTop();
        
        if( Math.abs(lastScrollTop - st) <= delta )
            return;

        if ((st > lastScrollTop) && (lastScrollTop > 0)) {
        $(".header").css("top","-100%");

        } else {
        $(".header").css("top","0px");
        }
        lastScrollTop = st;
    });


    // Faq
    $(".faq__question").click(function(){
        var container = $(this).parents(".faq__item");

        if (container.hasClass("expand")) {
            container.removeClass("expand");
        }else{
            container.addClass("expand");
        }

    });

});