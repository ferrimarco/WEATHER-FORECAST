document.querySelector("form").addEventListener("submit", function (event){
    event.preventDefault()

    //dichiarazioni variabili latitudini e longitudini
    let latitudine = document.querySelector("#lat").value
    let longitudine = document.querySelector("#lng").value
    
    //vado a vedere se nella console log mi escano i valori
    console.log(latitudine, longitudine)

    //andiamo a fare la richiesta asincrona all'api di open.meteo
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitudine}&longitude=${longitudine}&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,windspeed_10m`

    console.log(url)

    fetch(url).then(function (resp) {
        return resp.json()
    }).then(function (data) {

        console.log(data)

        let list = document.querySelector(".creationListGroup")

        for (let i = 0; i < 7; i++) {
            let Element = document.createElement("li")

            Element.innerHTML = ` il ${data.hourly.time[i]} ci sono ${data.hourly.temperature_2m[i]}°`
            list.appendChild(Element)
 
        }
    })







})