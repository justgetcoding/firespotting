var watchId = null;
var mapCreated = false;
var imagePreviewElement = null;

$(function () {
    $('#photo_input').on('change', onPhotoSelected)

    imagePreviewElement = document.getElementById('imagePreview');

    if ("geolocation" in navigator) {
        navigator.geolocation;
        getGPSCoordinates();
    }
    else {
        $('#warning').text('No access to geolocation data');
        $('#warning').setAttr('hidden', false);
    }
});

function onPhotoSelected(event) {
    var files = $('#photo_input').prop('files');
    if (files.length > 0) {
        let file = files[0];
        if (file.type.startsWith('image/')) {
            let img = document.createElement("img");
            img.classList.add("obj");
            img.file = file;
            while (imagePreviewElement.firstChild) {
                imagePreviewElement.removeChild(imagePreviewElement.firstChild);
            }
            imagePreviewElement.appendChild(img);

            let reader = new FileReader();
            reader.onload = (function (aImg) { return function (e) { aImg.src = e.target.result; }; })(img);
            reader.readAsDataURL(file);
        }
    }
}

function getGPSCoordinates() {
    let numVars = arguments.length;

    let geo_options = {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 27000
    };

    watchId = navigator.geolocation.watchPosition(
        function (position) {
            onGotCoordinates(position.coords)
        },
        null,
        geo_options);
}

function onGotCoordinates(coords) {
    displayReading(coords);
    displayCoordinates(coords);
    if (!mapCreated) {
        createMap(coords.latitude, coords.longitude);
        mapCreated = true;
    }
}

function displayCoordinates(coords) {
    $('#latitude').text(coords.latitude);
    $('#longitude').text(coords.longitude);
    $('#accuracy').text(coords.accuracy);
}

function displayReading(coords) {
    $('#readingsList').append(`<li>Reading taken at: ${new Date(Date.now())}. Lat:${coords.latitude} Long:${coords.longitude} Acc:${coords.accuracy}</li>`)
    let theNumber = $("#readingsList li").length
    while (theNumber > 5) {
        $("#readingsList li").first().detach()
        theNumber = $("#readingsList li").length
    }
    $('#readingsCount').text(theNumber)
}

function formatDate(date) {
    return date.getHours() + ':'
}

function createMap(lat, long) {
    var mymap = L.map('mapid').setView([lat, long], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);

    L.marker([lat, long]).addTo(mymap);
}

