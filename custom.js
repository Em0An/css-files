/*global $, jQuery, console, alert, prompt */
$(document).ready(function () {
    "use strict";
    var arrTypescript = ["Html - Css - JS", "Bootstrap - jQ", "json - Ajax"],
        checkClick = 0,
        workUltab = $('.work .ultab');
    
    // Type Script =================================================================================
    function typeScriptHead(txt) {
        if (checkClick === 0) {
            checkClick = 1;
            typescript.innerHTML = "";
            var i = 0,
                typeWriterHead = setInterval(function () {
                    typescript.innerHTML += txt[i];
                    i++;
                    if (i >= txt.length) {
                        clearInterval(typeWriterHead);
                        typescript.innerHTML = txt;
                        i = 0;
                        checkClick = 0;
                    }
                }, 100);
        }
    }
    typeScriptHead(arrTypescript[0]);
    
    // Slider ===================================================================================
    function sliderHeader() {
        // All Variable +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        var body        = $('body'),
            slider      = $(".slider"),
            sliderUl    = slider.find("ul"),
            sliderUlLi  = sliderUl.find("li"),
            sliderOl    = slider.find("ol"),
            sliderOlLi  = sliderOl.find("li"),
            controlFa   = $(".control .fa"),
            sliderTime  = 300,
            clickHere   = "yes click",
            autoPlay,
            headerBG    = $(".header");

        // All Functions +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        sliderUl.append("<li>" + sliderUlLi.first().html() + "</li>");
        sliderUl.prepend("<li>" + sliderUlLi.last().html() + "</li>");
        
        function imageChange(num) {
            headerBG.css('background-image', sliderUlLi.eq($(".slider .active").index() + num).css('background-image'));
            typeScriptHead(arrTypescript[($(".slider .active").index() + num) + 1]);
        }
        
        function runSlider() {
            if (clickHere === "yes click") {
                clickHere = "no click";
                sliderUl.animate({
                    marginLeft: -sliderUlLi.width() * ($(".slider .active").index() + 1)
                }, sliderTime, function () { clickHere = "yes click"; });
            }
        }
        function addActive(param) {
            if (clickHere === "yes click" && checkClick === 0) {
                param.addClass("active").siblings("li").removeClass("active");
            }
        }

        // Click Point +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        sliderOlLi.on("click", function () {
            addActive($(this));
            runSlider();
        });

        controlFa.last().on("click", function () { // Click Arrow Right
            if ($(".slider .active").is(":last-of-type")) {
                addActive(sliderOlLi.first());
                if (clickHere === "yes click") {
                    clickHere = "no click";
                    sliderUl.animate({
                        marginLeft: "-=" + sliderUlLi.first().width()
                    }, sliderTime, function () {
                        sliderUl.css("margin-left", -sliderUlLi.width() * ($(".slider .active").index() + 1));
                        clickHere = "yes click";
                    });
                }
                imageChange(-1);
            } else {
                addActive($(".slider .active").next("li"));
                runSlider();
                imageChange(-1);
            }
        });

        // Start Set +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        sliderOlLi.first().click();

        // Keyboard +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        $("body").keydown(function (e) {
            if (e.keyCode === 37) { // left
                controlFa.first().click();
            } else if (e.keyCode === 39) { // right
                controlFa.last().click();
            }
        });
    }
    sliderHeader();
    
    // Navbar When Scroll =======================================================================
    function navbarSceoll() {
        var iamHere = $(window).scrollTop(),
            nav = $('.navbar-custom');
        $(window).scroll(function () {
            if ($(this).scrollTop() > iamHere) {
                nav.addClass('up');
                iamHere = $(window).scrollTop();
            } else if ($(this).scrollTop() < iamHere) {
                nav.removeClass('up');
                iamHere = $(window).scrollTop();
            }
        });
    }
    navbarSceoll();
    // Navbar When Responsive ==================================================================
    function navbar() {
        var active = $('.nav-two li:not(.slide)'),
            ctrlMenu = $('.logo-nav > .fa');
        active.on('click', function () {
            $(this).addClass('active').siblings().removeClass('active');
        });
        $('*:not(.logo-nav > .fa, .logo-nav .nav-two, .nav-two li)').click(function () {
            if (ctrlMenu.hasClass('fa-close')) {
                ctrlMenu.click();
            }
        });
        ctrlMenu.on('click', function () {
            $(this).toggleClass('fa-bars fa-close').next('ul').slideToggle();
        });
        $('.logo-nav > .fa, .logo-nav .nav-two, .nav-two li').click(function (event) {
            event.stopPropagation();
        });
        $(window).on('resize', function () {
            if ($(window).innerWidth() >= 800) {
                $('.nav-two').css('display', 'block');
            } else {
                $('.nav-two').css('display', 'none');
                ctrlMenu.addClass('fa-bars').removeClass('fa-close');
            }
        });
    }
    navbar();
    
    // Smooth Link =============================================================================
    $("[data-link]").on('click', function () {
        $("html, body").animate({
            scrollTop: $($(this).data("link")).offset().top
        }, 500, function () {
            if ($(window).scrollTop() > 0) {
                $(window).scrollTop($(window).scrollTop() + 1);
            }
        });
    });
    $(window).on("scroll", function () {
        $('[data-link]').each(function () {
            if ($($(this).data("link")).offset().top <= $(window).scrollTop()) {
                $(this).addClass("active").siblings().removeClass("active");
            }
        });
    });
    
    // Footer Year =================================================================================
    $('.year').text($('.year').text() + new Date().getFullYear());
    
    // Go Top =================================================================================
    function goTop() {
        var top = $('.top');
        top.hide();
        top.on('click', function () {
            $('html, body').animate({scrollTop: 0}, 750);
        });
        $(window).on('scroll', function () {
            if ($(window).scrollTop() >= 700) {top.fadeIn(); }
                else {top.fadeOut(); }
        });
    }
    goTop();
    
    // Placeholder =================================================================================
    $('[placeholder]').focus(function () {
		$(this).attr('data-place', $(this).attr('placeholder'));
		$(this).attr('placeholder', '');
	}).blur(function () {
		$(this).attr('placeholder', $(this).attr('data-place'));
	});
    
    // Datatab ===============================================================================
    $('.datatab .ultab li').on('click', function () {
        $(this).addClass('active').siblings('li').removeClass('active');
        $(this).parent('.ultab').parent('.datatab').find('div').hide();
        $('.datatab div' + $(this).data('tab')).fadeIn();
        if ($(this).parent('.ultab').parent('.datatab').parent().parent().hasClass('work') && $(window).width() <= 550) {
            $('html, body').animate({scrollTop: workUltab.offset().top + workUltab.height()}, 500);
        }
    });
    
    // SKILLS ONE ============================================================================
    function charToSpan() {
        var i,
            skillsOneH6 = $('.skills .datatab .one h6'),
            output = "",
            colors = [
                "#c14747", "#ac6a28", "#c4b438",
                "#369d59", "#4280be", "#7f63a7",
                "#a362a8", "#a83a69", "#596f3a",
                "#6b9359", "#27967d", "#39a3a7",
                "#565480"];
        for (i = 0; i < skillsOneH6.length; i++) {
            skillsOneH6.eq(i).css('background', colors.splice((Math.random() * colors.length) | 0, 1));
        }
    }
    charToSpan();
    
    // Slider Say ================================================================================
    function slidersayFuc() {
        var slidersay = $('.slidersay'),
            slidersayUl = $('.slidersay ul'),
            slidersayOlLi = $('.slidersay ol li');
        slidersayOlLi.on('click', function () {
            $(this).addClass('active').siblings('li').removeClass('active');
            slidersayUl.animate({
                marginLeft: -slidersay.width() * $('.slidersay .active').index()
            }, 600);
        });
    }
    slidersayFuc();
    
    // Contact Form =============================================================================
    function contactForm() {
        var input = $('form div .inpt');
        input.on('focus', function () {
            if ($(this).val() === "") {
                $(this).prev('label').css({
                    fontSize: 13,
                    top: -16,
                    color: '#18cfab',
                    fontWeight: 'bold'
                });
            }
        });
        input.on('blur', function () {
            if ($(this).val() === "") {
                $(this).prev('label').css({
                    fontSize: 17,
                    top: 0,
                    color: '#aaa',
                    fontWeight: 'normal'
                });
            }
        });
    }
    contactForm();
    
    // progress body ==========================================================================
    $(window).scroll(function () {
        var winTop = $(window).scrollTop(),
            winHeight = $(window).height(),
            docHeight = $(document).height(),
            per = (winTop / (docHeight - winHeight)) * 100;
        $('.progress-body').width(per.toFixed() + "%");
    });
    
    // https://codepen.io/Em-An/pen/dGVeaV
});
