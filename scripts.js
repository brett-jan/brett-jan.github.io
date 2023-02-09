function weatherBalloon() {
    var base_url = "https://api.openweathermap.org/data/3.0/onecall?lat="
    var lat = "51.057813435595875"
    var lon =  "-114.1445183155602"
    var exclusions = "minutely,daily,alerts"
    var api_key = "eea7b07420eb241043b049da7682c2e1"
    var complete_url = base_url + lat + "&lon=" + lon + "&exclude=" + exclusions + "&appid=" + api_key + "&units=metric"
    
    fetch(complete_url)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
        console.log(data);
        currentConditions(data); // Call drawWeather
        tomorrowMorning(data);
    })
    .catch(function() {
        // catch any errors
    });
}

window.onload = function() {
    weatherBalloon();
}

function currentConditions( d ) {
    document.getElementById('temp').innerHTML = Math.round(parseFloat(d.current.temp)) + '&deg;';
}

function tomorrowMorning( d ) {
    const currentTime = new Date();
    const tomorrow7AM = new Date();
    tomorrow7AM.setDate(tomorrow7AM.getDate() + 1);
    tomorrow7AM.setHours(7)
    tomorrow7AM.setMinutes(0)
    tomorrow7AM.setSeconds(0)
    tomorrow7AM.setMilliseconds(0)
    const tomorrow7AM_ts = Math.floor(tomorrow7AM.getTime() / 1000);
    document.getElementById('currentTime').innerHTML = currentTime;
    document.getElementById('tomorrow7AM').innerHTML = tomorrow7AM_ts;

    for (i=0; i < d.hourly.length; i++){
        if (d.hourly[i].dt === tomorrow7AM_ts){
            console.log(i);
            console.log(tomorrow7AM_ts);
            console.log(d.hourly[i].dt);
        }
    }
    }
    function degToCard(value) { value = parseFloat(value); if (value <= 11.25) return 'N'; value -= 11.25; var allDirections = ['NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N']; var dIndex = parseInt(value/22.5); return allDirections[dIndex] ? allDirections[dIndex] : 'N'; }
