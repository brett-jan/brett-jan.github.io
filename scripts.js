window.onload = function() {
    weatherBalloon();
}

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
        currentConditions(data);
        tomorrowMorning(data);
    })
    .catch(function() {
        // catch any errors that occur
    });
}

function currentConditions( d ) {
    document.getElementById('current_temp').innerHTML = Math.round(parseFloat(d.current.temp)) + '&deg;';
    document.getElementById('current_feelslike').innerHTML = Math.round(parseFloat(d.current.feels_like)) + '&deg;';
    document.getElementById('current_windspeed').innerHTML = Math.round(parseFloat(d.current.wind_speed) * 3.6) + ' km/h';
    const currentTime = new Date();
    if (currentTime.getHours() < 10) {
        document.getElementById('current_winddirection').innerHTML = windDirectionMorning(d.current.wind_deg);
    } else if (currentTime.getHours() < 19) {
        document.getElementById('current_winddirection').innerHTML = windDirectionEvening(d.current.wind_deg);
    } else {
        document.getElementById('current_winddirection').innerHTML = windDirection(d.current.wind_deg);
    }
}

function todayMorning( d ) {
    const currentTime = new Date();
    if (currentTime.getHours() < 7) {
        const today7AM = new Date();
        today7AM.setHours(7)
        today7AM.setMinutes(0)
        today7AM.setSeconds(0)
        today7AM.setMilliseconds(0)
        const today7AM_ts = Math.floor(today7AM.getTime() / 1000);

        for (i=0; i < d.hourly.length; i++){
            if (d.hourly[i].dt === today7AM_ts){
                console.log(i);
                console.log(today7AM_ts);
                console.log(d.hourly[i].dt);
            }
        }
        document.getElementById('todayMorning').style.display = 'block'
    } else {
        document.getElementById('todayMorning').style.display = 'none'
    }
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

    for (i=0; i < d.hourly.length; i++){
        if (d.hourly[i].dt === tomorrow7AM_ts){
            console.log(i);
            console.log(tomorrow7AM_ts);
            console.log(d.hourly[i].dt);
        }
    }
}

    function windDirectionMorning(value) { value = parseFloat(value); if (value <= 11.25) return 'N'; value -= 11.25; var allDirections = ['NNE', 'NE (headwind)', 'ENE (headwind)', 'E (headwind)', 'ESE (headwind)', 'SE (headwind)', 'SSE', 'S', 'SSW', 'SW (tailwind)', 'WSW (tailwind)', 'W (tailwind)', 'WNW (tailwind)', 'NW (tailwind)', 'NNW', 'N']; var dIndex = parseInt(value/22.5); return allDirections[dIndex] ? allDirections[dIndex] : 'N'; }
    function windDirectionEvening(value) { value = parseFloat(value); if (value <= 11.25) return 'N'; value -= 11.25; var allDirections = ['NNE', 'NE (tailwind)', 'ENE (tailwind)', 'E (tailwind)', 'ESE (tailwind)', 'SE (tailwind)', 'SSE', 'S', 'SSW', 'SW (headwind)', 'WSW (headwind)', 'W (headwind)', 'WNW (headwind)', 'NW (headwind)', 'NNW', 'N']; var dIndex = parseInt(value/22.5); return allDirections[dIndex] ? allDirections[dIndex] : 'N'; }
    function windDirection(value) { value = parseFloat(value); if (value <= 11.25) return 'N'; value -= 11.25; var allDirections = ['NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N']; var dIndex = parseInt(value/22.5); return allDirections[dIndex] ? allDirections[dIndex] : 'N'; }
