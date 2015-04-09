/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var form = document.querySelector('form');
var geocoder;

form.addEventListener('submit', checkForm);

function checkForm(e) {
    e.preventDefault();

    var isValid = true;
    var fields = document.querySelectorAll('form p');
    var fieldlen = fields.length;

    var jsondata = {};

    for (var i = 0; i < fieldlen; i++) {
        var input = fields[i].querySelector('input');
        jsondata[input.name] = input.value;

        if (input.value === '') {
            fields[i].classList.add('error');
            isValid = false;
        } else {
            fields[i].classList.remove('error');
        }

    }
    console.log(jsondata);

    if (jsondata.password !== jsondata.confirmPassword) {
        document.querySelector('.passwordError').classList.add('error');
        document.querySelector('.confirmPasswordError').classList.add('error');

        isValid = false;
    }


    if (isValid) {
        form.classList.add('hide');
        var confirmation = document.querySelector('#confirmation');

        var html = '<p>First Name: ' + jsondata.fname + '</p>';
        html += '<p>Last Name: ' + jsondata.lname + '</p>';
        html += '<p>Email: ' + jsondata.email + '</p>';
        html += '<p>Phone: ' + jsondata.phone + '</p>';
        html += '<p>Address Line 1: ' + jsondata.address_one + '</p>';
        html += '<p>Address Line 2: ' + jsondata.address_two + '</p>';
        html += '<p>City: ' + jsondata.city + '</p>';
        html += '<p>State: ' + jsondata.state + '</p>';
        html += '<p>Postal Code: ' + jsondata.zip + '</p>';
        html += '<p>Username: ' + jsondata.username + '</p>';
        html += '<p>Password: ' + jsondata.password + '</p>';
        html += '<p>Confirmed Password: ' + jsondata.confirmPassword + '</p>';

        confirmation.innerHTML = html;

    }


}
function initialize() {
    geocoder = new google.maps.Geocoder();
    var zipCode = document.querySelector('input[name="zip"]');
    zipCode.addEventListener("blur", codeAddress);
}

google.maps.event.addDomListener(window, 'load', initialize);

function codeAddress() {
    var address = document.querySelector('input[name="zip"]').value;
    geocoder.geocode({'address': address}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results);
            handleResults(results);
        } else {
            console.log('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function handleResults(results) {
    var geocodeObject = results[0];

    // declare variable for length of JSON object
    var len = geocodeObject.address_components.length;
    console.log(len);

    for (var i = 0; i < len; i++) {
        if (geocodeObject.address_components[i].types.indexOf('locality') > -1) {
            console.log(geocodeObject.address_components[i].long_name);
            console.log("This is the city.");
            var city = document.querySelector('body > form > p.cityError > input[type="text"]');
            city.value = geocodeObject.address_components[i].long_name;
        }

        if (geocodeObject.address_components[i].types.indexOf('administrative_area_level_1') > -1) {
            console.log(geocodeObject.address_components[i].short_name);
            console.log("This is the state.");
            var state = document.querySelector('body > form > p:nth-child(8) > input[type="text"]');
            state.value = geocodeObject.address_components[i].short_name;
        }


    }

}