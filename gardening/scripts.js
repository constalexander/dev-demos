const ele_zip = document.querySelectorAll('#form_1 input[id=zip]')[0];
const ele_submit = document.querySelectorAll('#form_1 input[type=button]')[0];
const ele_response = document.querySelectorAll('#response')[0];
const ele_form_error = document.querySelectorAll('#form_error')[0];
const zipRegex = /^\d{5}$/;



ele_submit.onclick = function() {
  let zip = ele_zip.value;
  if (zipRegex.test(zip)) {

    document.querySelectorAll('#form_error')[0].classList.add('d-none');

    axios.get(`https://phzmapi.org/${zip}.json`)
    .then(function (response) {
      console.log(response.data);
      document.querySelector('#response').classList.remove('d-none');
      document.querySelectorAll('#response p span')[0].innerText = zip;
      document.querySelectorAll('#response h2')[0].innerText = response.data.zone;

      /* Make the map */
      let map = L.map('map', {
        center: [51.505, -0.09],
        zoom: 13
      });
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3ZuYWx4IiwiYSI6ImNrdDN4eGhmMzBiZXoydnE4bHZjbjNpaXkifQ.fGag40eXeaOEFgf5h8RXSQ', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'pk.eyJ1Ijoic3ZuYWx4IiwiYSI6ImNrdDN4eGhmMzBiZXoydnE4bHZjbjNpaXkifQ.fGag40eXeaOEFgf5h8RXSQ'
      }).addTo(map);

    })
    .catch(function (error) {
      console.log(error);
      document.querySelectorAll('#form_error')[0].classList.remove('d-none');
      document.querySelectorAll('#form_error')[0].innerText = "Could not find zone for that zip code.";
    })
    .then(function () {
    });
  } else {
    document.querySelectorAll('#form_error')[0].classList.remove('d-none');
    document.querySelectorAll('#form_error')[0].innerText = "Please enter a valid zip code.";
  }


}

