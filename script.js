window.addEventListener('load', () => getWeather());

const getWeather = () => {
  let long;
  let lat;
  const tempDescription = document.querySelector('.temp-description');
  const tempDegrees = document.querySelector('.temp-degrees');
  const locationTimezone = document.querySelector('.location-timezone');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async pos => {
      long = pos.coords.longitude;
      lat = pos.coords.latitude;
      console.log(pos);


      //get the weather here
      // const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `https://api.darksky.net/forecast/ec7b465b01b0b3388e7d84819c9c8ec1/${lat},${long}`
      let response = await fetch(api);
      let data = await response.json(); 
      console.log(data);
      //set the weather here 
      const {temperature, summary, icon} = data.currently;
      tempDescription.textContent = summary
      locationTimezone.textContent = 'Current Temperature';
      tempDegrees.textContent = Math.round(temperature);

      setIcons(icon, document.querySelector('#icon'));
    });
  }
}

const setIcons = (icon, iconID) => {
  const skycons = new Skycons({color: "gray"});
  const currentIcon = icon.replace(/-/g, '_').toUpperCase();
  skycons.play();
  return skycons.set(iconID, Skycons[currentIcon]);
  
}
