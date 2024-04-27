
async function weather() {

    const data = new Date()
    let arr = data.toDateString()
    let hour = data.getHours()
    let minuts = data.getMinutes()

    const date = document.getElementById('date')
    date.textContent = arr

    const times = document.getElementById('time')
    if(minuts < 10){
        times.textContent = hour + ' : 0' + minuts
    } else {
        times.textContent = hour + ' : ' + minuts
    }

    const key = `5f8503fb89ffdb650735ce3ffd36d138`
    let city = document.querySelector('.inputcity').value
    console.log(city)

    if (city == '') {
        city = 'tashkent'
    }

    if (city) {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`

            const res = await fetch(url)
            const json = await res.json()
            // console.log(json)

            let gradus = document.getElementsByClassName('degre__gradus')[0]
            gradus.textContent = `${Math.floor(json.main.temp)}${'°'}`

            const graduses = document.querySelector('.graduses')
            graduses.textContent = Math.floor(json.main.temp_max) + '°' + ' / ' + Math.floor(json.main.temp_min) + '°'


            const humidity = document.querySelector('.humidity')
            humidity.textContent = json.main.humidity + '%'

            const wind = document.querySelector('.wind')
            wind.textContent = Math.floor(json.wind.speed) + ' km/h'

            const pressure = document.querySelector('.pressure')
            pressure.textContent = json.main.pressure + ' mb'


            const citys = document.querySelector('.city')

            let shortcity = ',' + json.sys.country;
            if (shortcity == ',undefined') { shortcity = '' };
            citys.textContent = 'Weather today in ' + json.name + shortcity;

            const weathertype = document.querySelector('.weathertype')
            weathertype.textContent = (json.weather[0].description)[0].toUpperCase() + json.weather[0].description.slice(1)

            let airInfo = json.weather[0].main

            const air = document.querySelector('.icons')
            air.src = `/image/${airInfo}.png`

        } catch {
            console.log('Bunday shahar topilmadi')
        }

    } else {
        console.log('inputni toldir!')
    }
}

weather()


const input = document.querySelector('.btn')
input.children[0].addEventListener('click', weather)



