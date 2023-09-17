var map = L.map('map').setView([41,1187, 16,852], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.on("click", function(e) {
    //console.log(e)

    var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)
    
    let latitudine = document.querySelector("#lat").value = e.latlng.lat
    let longitude = document.querySelector("#lng").value = e.latlng.lng 
})