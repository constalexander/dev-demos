const ele_zip = document.querySelectorAll("#form_1 input[id=zip]")[0];
const ele_submit = document.querySelectorAll("#form_1 input[type=button]")[0];
const ele_response = document.querySelectorAll("#response")[0];
const ele_form_error = document.querySelectorAll("#form_error")[0];
const zipRegex = /^\d{5}$/;

ele_submit.onclick = function () {
  let zip = ele_zip.value;

  if (zipRegex.test(zip)) {
    document.querySelectorAll("#form_error")[0].classList.add("d-none");
    document.querySelector("#map").remove();
    let ele_map = document.createElement("div");
    ele_map.setAttribute("id", "map");
    document.querySelector("#response").append(ele_map);

    axios
      .get(`https://phzmapi.org/${zip}.json`)
      .then(function (response) {
        console.log(response.data);

        /* DOM changes */
        document.querySelector("#response").classList.remove("d-none");
        document.querySelector("#app").classList.add("p-0");
        document.querySelector("#form_1").classList.add("d-none");

        /* Make the map */
        let lat = response.data.coordinates.lat;
        let lng = response.data.coordinates.lon;
        let latlng = L.latLng(lat, lng);

        let map = L.map("map", {
          center: [lat, lng],
          zoom: 9,
        });
        L.tileLayer(
          "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3ZuYWx4IiwiYSI6ImNrdDN4eGhmMzBiZXoydnE4bHZjbjNpaXkifQ.fGag40eXeaOEFgf5h8RXSQ",
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            accessToken:
              "pk.eyJ1Ijoic3ZuYWx4IiwiYSI6ImNrdDN4eGhmMzBiZXoydnE4bHZjbjNpaXkifQ.fGag40eXeaOEFgf5h8RXSQ",
          }
        ).addTo(map);
        var popup = L.popup()
          .setLatLng(latlng)
          .setContent(
            "<h4>Zone <strong>" + response.data.zone + "</strong></h4>"
          )
          .openOn(map);
      })
      .catch(function (error) {
        console.log(error);
        document.querySelectorAll("#form_error")[0].classList.remove("d-none");
        document.querySelectorAll("#form_error")[0].innerText =
          "Could not find zone for that zip code.";
      })
      .then(function () {});
  } else {
    document.querySelectorAll("#form_error")[0].classList.remove("d-none");
    document.querySelectorAll("#form_error")[0].innerText =
      "Please enter a valid, 5-digit zip code.";
  }
};
