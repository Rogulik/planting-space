function viewPort() {
    var width = $(window).width()
    if (width <= 375) {
        calc = (parseFloat(width) / parseFloat(375))
        scale = 0.5 * calc
        scale = scale.toFixed(2)
        $('meta[name=viewport]').attr('content', 'user-scalable=yes, initial-scale=' + scale + ', maximum-scale=' + scale + ', width=750')
    } else {
        $('meta[name=viewport]').attr('content', 'user-scalable=yes, initial-scale=.5, maximum-scale=.5, width=750')
    }
}

function menu() {
    var scrollTop = $(window).scrollTop()
    var width = $(window).width()
    var top = 426
    var force = $(".main-container").hasClass("joinus") || $(".main-container").hasClass("team")
    if (scrollTop > 80 || force || width >= 1024) {
        $(".main-container").addClass("fixed")
        $(".logo-big").css('top', '')
    } else {
        result = top - scrollTop
        $(".logo-big").css('top', result + 'px')
        $(".main-container").removeClass("fixed")
    }
}

viewPort()
$(function () {
    var width = $(window).width()
    if (width >= 1024) {
        $(".menu").addClass('collapsed')
    }
    $(document).on("click", ".menu-button", function () {
        $(".menu").toggleClass("collapsed")
    })
    $(document).on("mouseenter", ".person img", function (e) {
        e.stopPropagation()
        e.preventDefault()
        $(".person-info").hide()
        $(".person-main-name").show()
        var _this = $(this)
        $(".person").addClass("zindex0")
        $(".person").removeClass("zindex")
        $(this).parent().parent().removeClass("zindex0")
        $(this).parent().parent().addClass("zindex")
        $(this).parent().parent().find(".person-main-name").fadeOut(100, function () {
            _this.parent().parent().find(".person-info").fadeIn(500)
        })

    })
    $(document).on("mouseleave", ".person", function (e) {
        e.stopPropagation()
        e.preventDefault()
        var _this = $(this)
        $(this).find(".person-info").fadeOut(200, function () {
            _this.find(".person-main-name").fadeIn(200)
        })
    })
    $(document).on("click", '.contact,a[href="#contact"]', function () {
        console.log('scrolldown')
        $('html, body').animate({
            scrollTop: $(".footer-header").offset().top
        }, 2000)
    })

    menu()
    $(window).scroll(function () {
        menu()
    })
    //load feed
    if ($(".feeds").length > 0) {
        var isAny = false
        $.ajax({
            url: "https://mas.to/users/PlantingSpace.rss",
            dataType: 'xml'
        }).done(function (xmlDoc) {
            $xml = $(xmlDoc)
            $item = $xml.find("item")
            $.each($xml.find("item"), function (index, value) {
                $date = $(this).find('pubDate').text().split(' ').slice(1, 4).toString().replace(/,/g, ' ')
                $txt = $(this).find('description').text()
                if ($txt != "") {
                    isAny = true
                    if (index == 0) {
                        $feed = $(".feed:eq(0)")
                        $feed.find(".feed-content").html($txt)
                        $feed.find(".feed-date").html($date)
                    } else {
                        $feed = $(".feed:eq(0)").clone()
                        $feed.find(".feed-content").html($txt)
                        $feed.find(".feed-date").html($date)
                        $(".feeds").append($feed)
                    }
                }
            })
            if (!isAny) {
                $(".feed:eq(0)").remove()
            }
        })
    }
})

