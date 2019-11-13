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
    navigator.geolocation.getCurrentPosition(function (position) {
        setTimeout(displayCoordinates(position.coords), 0);
    });
}

function displayCoordinates(coords) {
    $('#latitude').text(coords.latitude);
    $('#longitude').text(coords.longitude);
    $('#accuracy').text(coords.accuracy);
}

