/*DECLARACIÓN DE VARIABLES DEL DOM*/
const toggleColors = document.getElementById("toggle-colors")
const rootStyles = document.documentElement.style

/* TOGGLE COLORS, SELECT COLOR ITEMS */
toggleColors.addEventListener('click', (e) => {
  if (e.target.classList[0] === 'colors__item') {
    rootStyles.setProperty('--primary-color', e.target.dataset.color)
  }
})

// OBTENIENDO DATOS DE LA API
window.addEventListener('load', () => {
  let lon
  let lat
  let id

  let temperaturaValor = document.getElementById("temperatura-valor")
  let temperaturaDescripcion = document.getElementById("temperatura-descripcion")

  let ubicacion = document.getElementById("ubicacion")
  let iconoAnimado = document.getElementById("icono-animado")

  let vientoVelocidad = document.getElementById("viento-velocidad")
  //let APPID ='6d5b86615d00637675ff4198323ace26'

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(posicion => {
      lon = posicion.coords.longitude
      lat = posicion.coords.latitude
      // UBICACIÓN POR LATITUD Y LONGITUD
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=6d5b86615d00637675ff4198323ace26`
      // UBICACION POR CIUDAD
      //  const url = `https://api.openweathermap.org/data/2.5/weather?q=Asunción&lang=es&units=metric&appid=6d5b86615d00637675ff4198323ace26`
      fetch(url)
        .then(response => { return response.json() })
        .then(data => {
          console.log(data)
          console.log(data.main.temp)
          let temp = Math.round(data.main.temp)
          temperaturaValor.textContent = `${temp} °C`
          let desc = data.weather[0].description
          temperaturaDescripcion.textContent = desc.toUpperCase()

          ubicacion.textContent = data.name

          vientoVelocidad.textContent = `${data.wind.speed} m/s`

          switch (data.weather[0].main) {
            case 'Thunderstorm':
              iconoAnimado.src = 'animated/thunder.svg'
              console.log('TORMENTA')
              break
            case 'Drizzle':
              iconoAnimado.src = 'animated/rainy-2.svg'
              console.log('LLOVIZNA')
              break
            case 'Rain':
              iconoAnimado.src = 'animated/rainy-7.svg'
              console.log('LLUVIA')
              break
            case 'Snow':
              iconoAnimado.src = 'animated/snowy-6.svg'
              console.log('NIEVE')
              break
            case 'Clear':
              iconoAnimado.src = 'animated/day.svg'
              console.log('LIMPIO')
              break
            case 'Atmosphere':
              iconoAnimado.src = 'animated/weather.svg'
              console.log('ATMOSFERA')
              break
            case 'Clouds':
              iconoAnimado.src = 'animated/cloudy-day-1.svg'
              console.log('NUBES')
              break
            default:
              iconoAnimado.src = 'animated/cloudy-day-1.svg'
              console.log('por defecto')
          }

        })
        .catch(error => {
          console.log(error)
        })
    })
  }
})