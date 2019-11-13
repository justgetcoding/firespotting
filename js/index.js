$(function () {
    if ("geolocation" in navigator) {
        navigator.geolocation;
        $('#btnGetCoordinates').click(getGPSCoordinates);
    }
    else {
        $('#warning').text('No access to geolocation data');
        $('#warning').setAttr('hidden', false);
    }
});

function getGPSCoordinates() {
    let numVars = arguments.length;

    let geo_options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
    };

    navigator.geolocation.getCurrentPosition(function (position) {
        setTimeout(displayCoordinates(position.coords), 0);
    }, null, geo_options);
}

function displayCoordinates(coords) {
    $('#latitude').text(coords.latitude);
    $('#longitude').text(coords.longitude);
    $('#accuracy').text(coords.accuracy);
}

