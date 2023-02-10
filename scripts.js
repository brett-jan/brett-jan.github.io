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
        todayMorning(data);
        todayEvening(data);
        tomorrowMorning(data);
        tomorrowEvening(data);
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
        const today7am = new Date();
        today7am.setHours(7)
        today7am.setMinutes(0)
        today7am.setSeconds(0)
        today7am.setMilliseconds(0)
        const today7AM_ts = Math.floor(today7am.getTime() / 1000);

        for (i=0; i < d.hourly.length; i++){
            if (d.hourly[i].dt === today7AM_ts){
                document.getElementById('today7am_temp').innerHTML = Math.round(parseFloat(d.hourly[i].temp)) + '&deg;';
                document.getElementById('today7am_feelslike').innerHTML = Math.round(parseFloat(d.hourly[i].feels_like)) + '&deg;';
                document.getElementById('today7am_windspeed').innerHTML = Math.round(parseFloat(d.hourly[i].wind_speed) * 3.6) + ' km/h';
                document.getElementById('today7am_winddirection').innerHTML = windDirectionMorning(d.hourly[i].wind_deg);
            }
        }
        document.getElementById('todayMorning').style.display = 'block'
    } else {
        document.getElementById('todayMorning').style.display = 'none'
    }
}

function todayEvening( d ) {
    const currentTime = new Date();
    if (currentTime.getHours() < 17) {
        const today5pm = new Date();
        today5pm.setHours(7)
        today5pm.setMinutes(0)
        today5pm.setSeconds(0)
        today5pm.setMilliseconds(0)
        const today5pm_ts = Math.floor(today5pm.getTime() / 1000);

        for (i=0; i < d.hourly.length; i++){
            if (d.hourly[i].dt === today5pm_ts){
                document.getElementById('today5pm_temp').innerHTML = Math.round(parseFloat(d.hourly[i].temp)) + '&deg;';
                document.getElementById('today5pm_feelslike').innerHTML = Math.round(parseFloat(d.hourly[i].feels_like)) + '&deg;';
                document.getElementById('today5pm_windspeed').innerHTML = Math.round(parseFloat(d.hourly[i].wind_speed) * 3.6) + ' km/h';
                document.getElementById('today5pm_winddirection').innerHTML = windDirectionMorning(d.hourly[i].wind_deg);
            }
        }
        document.getElementById('todayEvening').style.display = 'block'
    } else {
        document.getElementById('todayEvening').style.display = 'none'
    }
}

function tomorrowMorning( d ) {
    const tomorrow7am = new Date();
    tomorrow7am.setDate(tomorrow7am.getDate() + 1);
    tomorrow7am.setHours(7);
    tomorrow7am.setMinutes(0);
    tomorrow7am.setSeconds(0);
    tomorrow7am.setMilliseconds(0);
    const tomorrow7am_ts = Math.floor(tomorrow7am.getTime() / 1000);
    console.log(tomorrow7am_ts)

    for (i=0; i < d.hourly.length; i++){
        if (d.hourly[i].dt === tomorrow7am_ts){
            document.getElementById('tomorrow7am_temp').innerHTML = Math.round(parseFloat(d.hourly[i].temp)) + '&deg;';
            document.getElementById('tomorrow7am_feelslike').innerHTML = Math.round(parseFloat(d.hourly[i].feels_like)) + '&deg;';
            document.getElementById('tomorrow7am_windspeed').innerHTML = Math.round(parseFloat(d.hourly[i].wind_speed) * 3.6) + ' km/h';
            document.getElementById('tomorrow7am_winddirection').innerHTML = windDirectionMorning(d.hourly[i].wind_deg);
        }
    }
}

function tomorrowEvening( d ) {
    const tomorrow5pm = new Date();
    tomorrow5pm.setDate(tomorrow5pm.getDate() + 1);
    tomorrow5pm.setHours(17);
    tomorrow5pm.setMinutes(0);
    tomorrow5pm.setSeconds(0);
    tomorrow5pm.setMilliseconds(0);
    const tomorrow5pm_ts = Math.floor(tomorrow5pm.getTime() / 1000);
    console.log(tomorrow5pm_ts)

    for (i=0; i < d.hourly.length; i++){
        if (d.hourly[i].dt === tomorrow5pm_ts){
            document.getElementById('tomorrow5pm_temp').innerHTML = Math.round(parseFloat(d.hourly[i].temp)) + '&deg;';
            document.getElementById('tomorrow5pm_feelslike').innerHTML = Math.round(parseFloat(d.hourly[i].feels_like)) + '&deg;';
            document.getElementById('tomorrow5pm_windspeed').innerHTML = Math.round(parseFloat(d.hourly[i].wind_speed) * 3.6) + ' km/h';
            document.getElementById('tomorrow5pm_winddirection').innerHTML = windDirectionMorning(d.hourly[i].wind_deg);
        }
    }
}

function windDirectionMorning(value) { value = parseFloat(value); if (value <= 11.25) return 'N'; value -= 11.25; var allDirections = ['NNE', 'NE (headwind)', 'ENE (headwind)', 'E (headwind)', 'ESE (headwind)', 'SE (headwind)', 'SSE', 'S', 'SSW', 'SW (tailwind)', 'WSW (tailwind)', 'W (tailwind)', 'WNW (tailwind)', 'NW (tailwind)', 'NNW', 'N']; var dIndex = parseInt(value/22.5); return allDirections[dIndex] ? allDirections[dIndex] : 'N'; }
function windDirectionEvening(value) { value = parseFloat(value); if (value <= 11.25) return 'N'; value -= 11.25; var allDirections = ['NNE', 'NE (tailwind)', 'ENE (tailwind)', 'E (tailwind)', 'ESE (tailwind)', 'SE (tailwind)', 'SSE', 'S', 'SSW', 'SW (headwind)', 'WSW (headwind)', 'W (headwind)', 'WNW (headwind)', 'NW (headwind)', 'NNW', 'N']; var dIndex = parseInt(value/22.5); return allDirections[dIndex] ? allDirections[dIndex] : 'N'; }
function windDirection(value) { value = parseFloat(value); if (value <= 11.25) return 'N'; value -= 11.25; var allDirections = ['NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N']; var dIndex = parseInt(value/22.5); return allDirections[dIndex] ? allDirections[dIndex] : 'N'; }
