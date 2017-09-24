// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
     

// -------------------------------------------------------------
// Google Map Customization
// -------------------------------------------------------------

function initMap() {
    var matrusriNagar = {
        lat: 17.492887,
        lng: 78.366905
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: matrusriNagar
    });
    var marker = new google.maps.Marker({
        position: matrusriNagar,
        map: map
    });
}