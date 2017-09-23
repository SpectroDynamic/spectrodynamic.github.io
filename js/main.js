// Toggle Script
(function () {
	var container = document.getElementById('container'),
		trigger = container.querySelector('button.trigger');

	function toggleContent() {
		if (classie.has(container, 'container-open')) {
			classie.remove(container, 'container-open');
			classie.remove(trigger, 'trigger-active');
			window.addEventListener('scroll', noscroll);
		} else {
			classie.add(container, 'container-open');
			classie.add(trigger, 'trigger-active');
			window.removeEventListener('scroll', noscroll);
		}
	}

	function noscroll() {
		window.scrollTo(0, 0);
	}

	// reset scrolling position
	document.body.scrollTop = document.documentElement.scrollTop = 0;

	// disable scrolling
	window.addEventListener('scroll', noscroll);

	trigger.addEventListener('click', toggleContent);

	// For Demo purposes only (prevent jump on click)
	[].slice.call(document.querySelectorAll('.content-wrapper a')).forEach(function (el) {
		el.onclick = function () {
			return false;
		}
	});
})();

// Background Image Sideshow
(function () {
	'use strict';

	jQuery('#maximage').maximage();

})();

// screen loader
$(window).load(function () {
	"use strict";
	$('.screen-loader').fadeOut('slow');
});

// preload
$(document).ready(function () {
	"use strict";
	$('#preload').css({
		display: 'table'
	});
	$('[data-toggle="tooltip"]').tooltip();
});

// preload function
$(window).load(preLoader);
"use strict";

function preLoader() {
	setTimeout(function () {
		$('#preload').delay(1).fadeOut(1);
	});
};

// niceScroll
$(document).ready(function () {
	"use strict";
	$("body").niceScroll({
		cursorcolor: "#fff",
		cursorwidth: "5px",
		cursorborder: "1px solid #fff",
		cursorborderradius: "0px",
		zindex: "9999",
		scrollspeed: "60",
		mousescrollstep: "40"
	});
});

// niceScroll || scrollbars resize
$("body").getNiceScroll().resize();

(function ($) {
	$.fn.goTo = function () {
		$('html, body').animate({
			scrollTop: $(this).offset().top - 220 + 'px'
		}, 'fast');
		return this; // for chaining...
	}
})(jQuery);

$(document).keyup(function (e) {
	if (e.keyCode === 27)
		$('#btnTrigger').click();
});

$(".avili").click(function () {
	var index = $(this).index();
	$('#btnTrigger').click();
	switch (index) {
		case 0:
			$('.vibration').goTo();
			break;
		case 1:
			$('.thermo').goTo();
			break;
		case 2:
			$('.balance').goTo();
			break;
		case 3:
			$('.laser').goTo();
			break;
		case 4:
			$('.laser').goTo();
			break;
		case 5:
			$('.motor').goTo();
			break;
	}
});