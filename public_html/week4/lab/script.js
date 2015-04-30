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
    var html = "";
    
    var regexValidations = {
        "fname": /^[a-zA-Z]+$/,
        "lname": /^[a-zA-Z]+$/,
        "email": /^[a-zA-Z0-9$]+[@]{1}[a-zA-Z]+[\.]{1}[a-zA-Z]{2,3}$/,
        "phone": /^\(?([2-9]{1}[0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        "address_one":  /[0-9 a-zA-Z]+/,
        "address_two":  /[0-9 a-zA-Z]+/,
        "city": /.*/,
        "state": /^[A-Z]{2}$/,
        "zip":  /^\d{5}(?:[-\s]\d{4})?$/,
        "username":  /^[a-zA-Z0-9_-]{4,13}$/,
        "password":   /^(?=.[0-9]+.)(?=.[a-zA-Z]+.)[0-9a-zA-Z]{6,}$/,
        "confirmPassword":  /^(?=.[0-9]+.)(?=.[a-zA-Z]+.)[0-9a-zA-Z]{6,}$/
    };

    for (var i = 0; i < fieldlen; i++) {
        var input = fields[i].querySelector('input');
        var label = fields[i].querySelector('label');
       
        html += '<p>' + label.innerText + ": " + input.value + '</p>';
        
        jsondata[input.name] = input.value;

        if(input.name === "address_two" && input.value === "")
                {
                    fields[i].classList.remove('error');
                    continue;
                }
        
        if (input.value === '' || !regexValidations[input.name].test(input.value)) {
            fields[i].classList.add('error');
            isValid = false;
        } else {
            fields[i].classList.remove('error');
        }

    }
    

    if (jsondata.password !== jsondata.confirmPassword) {
        document.querySelector('.passwordError').classList.add('error');
        document.querySelector('.confirmPasswordError').classList.add('error');

        isValid = false;
    }


    if (isValid) {
        console.log(jsondata);
        form.classList.add('hide');
        var confirmation = document.querySelector('#confirmation');       
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