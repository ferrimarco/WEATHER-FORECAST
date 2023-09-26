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

        creationMap(Utentlat, UtentLnl)
    }, 

    //se l'utente non accetta di condividere la sua posizione, la mappa verrà generata in maniera casuale
    function (decline){
        console.log("L'utente non ha accettato di condividere la sua posizione")
        creationMap(80, 50)
    }
)


//funzione che crea la mappa
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

 //richiesta dati tramite api
document.querySelector("form").addEventListener("submit", function (e){
    e.preventDefault()

    let chart
    let latitudine = document.querySelector("#lat").value
    let longitudine = document.querySelector("#lng").value

    //provo a vedere che coordinate mi escono loggando latitudine e longitudine
    console.log(latitudine, longitudine)

    let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitudine}&longitude=${longitudine}&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,windspeed_10m`

    //loggo l'url perchè mi va :)
    console.log(url)

    //richiesta all'api tramite l'url
    fetch(url).then(function (resp){
        return resp.json()
    }).then(function (data){
        if(chart != undefined){
            chart.destroy()
        }
        console.log(data.hourly.time)
        console.log(data.hourly.temperature_2m)

        let dates = []
        let temperature = []
        let u = []

        let config = {
            type: 'line',
            data:
            {
                labels: data.hourly.time,
                datasets:
                [
                    {
                        labels: 'temperature',
                        data: data.hourly.temperature_2m,
                        fill: false,
                        bordeColor: 'rgb(255, 255, 0',
                        tension: 0.1,
                        yAxisID: "y1"
                    }, 
                    /*{
                        labels: 'Umidità',
                        data: data.hourly.relativehumidity_2m,
                        fill: false,
                        borderColor: 'rgb(0, 255, 0)',
                        tension: 0.1,
                        yAxisID: "y2"
                    }*/
                ]
            },
            options:
            {
                scales:
                {
                    y1:
                    {
                        type: "linear",
                        display: true,
                        position: "left"
                    },
                    /*y2:
                    {
                        type: "linear",
                        display: true,
                        position: "right"
                    }*/
                }
            }
        };
        can.classList.remove("d-none")

        chart = new Chart (can, config)
    })
})