
  let this_ele = document.querySelectorAll('#form_1 input[type=text')[0];
  console.log(this_ele);


const ele_form = document.getElementById('form_1');
const ele_form_submit = document.getElementById('form_submit');
//console.log(ele_form_submit);

el_form_submit.onclick = function() {
  axios.get('https://phzmapi.org/76179.json')
  .then(function (response) {
    // handle success
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
}

