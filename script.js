let can = document.querySelector("canvas")

navigator.geolocation.getCurrentPosition(
    //se l'utente accetta di condividere la sua posizione, la mappa verrà generata in base alla posizione dell'utente
    function (accept){
        const Utentlat = accept.coords.latitude
        const UtentLnl = accept.coords.longitude
        document.querySelector("#lat").value = Utentlat
        document.querySelector("#lng").value = UtentLnl

        //test per capire ocme funzione
        console.log("L'utente ha accettato di condividere la sua posizione, le sue coordinate sono: longitudine: " + UtentLnl + "  e latitudine: " + Utentlat)

        creationMap(UtentLnl, Utentlat)
    }, 

    //se l'utente non accetta di condividere la sua posizione, la mappa verrà generata in maniera casuale
    function (decline){
        console.log("L'utente non ha accettato di condividere la sua posizione")
        creationMap(80, 50)
    }
)

function creationMap(lat, lng)
{
    let map = L.map('map').setView([lat, lng], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    map.on("click", function(e) {
        //console.log(e)

        let marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)
        
        let latitudine = document.querySelector("#lat").value = e.latlng.lat
        let longitude = document.querySelector("#lng").value = e.latlng.lng 
    })
}