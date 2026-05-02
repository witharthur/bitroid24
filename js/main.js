/* Global interactions */
(function ($) {
  "use strict";

  $(function () {
    var $body = $("body");
    var $header = $(".site-header");
    var $burger = $(".js-burger-toggle");
    var $searchToggle = $(".js-search-toggle");
    var $overlay = $(".site-header__overlay");
    var $mobileSearch = $("#mobile-search");
    var $mobileSearchInput = $("#mobile-search-field, #component-mobile-search");

    /* Mobile menu helpers */
    function closeMenu() {
      $header.removeClass("is-open");
      $burger.attr("aria-expanded", "false");
      $body.removeClass("body--menu-open");
    }

    function openMenu() {
      $header.addClass("is-open");
      $burger.attr("aria-expanded", "true");
      $body.addClass("body--menu-open");
    }

    /* Mobile search helpers */
    function closeSearch() {
      $searchToggle.attr("aria-expanded", "false");
      $mobileSearch.stop(true, true).slideUp(200);
    }

    function openSearch() {
      $searchToggle.attr("aria-expanded", "true");
      $mobileSearch.stop(true, true).slideDown(220, function () {
        $mobileSearchInput.first().trigger("focus");
      });
    }

    $burger.on("click", function () {
      if ($header.hasClass("is-open")) {
        closeMenu();
        return;
      }

      closeSearch();
      openMenu();
    });

    $searchToggle.on("click", function () {
      var isExpanded = $(this).attr("aria-expanded") === "true";

      closeMenu();

      if (isExpanded) {
        closeSearch();
      } else {
        openSearch();
      }
    });

    $overlay.on("click", function () {
      closeMenu();
      closeSearch();
    });

    $(".site-header__drawer a").on("click", function () {
      closeMenu();
    });

    $(document).on("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
        closeSearch();
      }
    });

    $(window).on("resize", function () {
      if (window.innerWidth > 1180) {
        closeMenu();
        closeSearch();
      }
    });

    /* FAQ accordion */
    $(".faq-item__answer").hide();
    $(".faq-item.is-active .faq-item__answer").show();

    $(".faq-item__question").on("click", function () {
      var $currentItem = $(this).closest(".faq-item");
      var isOpen = $currentItem.hasClass("is-active");

      $(".faq-item").removeClass("is-active");
      $(".faq-item__question").attr("aria-expanded", "false");
      $(".faq-item__answer").stop(true, true).slideUp(220);

      if (!isOpen) {
        $currentItem.addClass("is-active");
        $(this).attr("aria-expanded", "true");
        $currentItem.find(".faq-item__answer").stop(true, true).slideDown(220);
      }
    });

    /* Swiper cases slider */
    if (typeof Swiper !== "undefined" && $(".cases-slider").length) {
      new Swiper(".cases-slider", {
        slidesPerView: 1.08,
        spaceBetween: 16,
        speed: 700,
        loop: false,
        navigation: {
          nextEl: ".cases__arrow--next",
          prevEl: ".cases__arrow--prev"
        },
        pagination: {
          el: ".cases__pagination",
          clickable: true
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 18
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 20,
            centeredSlides: true,
            initialSlide: 1
          }
        }
      });
    }

    /* Footer year sync */
    $("#site-year").text(new Date().getFullYear());
  });
})(jQuery);
