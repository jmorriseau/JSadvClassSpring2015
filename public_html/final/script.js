/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//creat an array to store some stuff
var storeStuff = [];
var html = '';

//create an event listener to save the dtata
var saveData = document.querySelector('#saveData');
saveData.addEventListener('click', checkForm);

//when the save data button is clicked check the form
function checkForm(e) {
    e.preventDefault();

    //get the input names and set them to variable to use
    var name = document.querySelector('input[name="name"]');
    var email = document.querySelector('input[name="email"]');
    var phone = document.querySelector('input[name="phone"]');
    var description = document.querySelector('#description');

    //get the error names and set them to variable to use
    var nameError = document.querySelector('#fullname_err');
    var emailError = document.querySelector('#email_err');
    var phoneError = document.querySelector('#phone_err');
    var descriptionError = document.querySelector('#description_err');

    //set regex validation
    var regexValidations = {
        "name": /^[a-zA-Z]+$/,
        "email": /^[a-zA-Z0-9$]+[@]{1}[a-zA-Z]+[\.]{1}[a-zA-Z]{2,3}$/,
        "phone": /^\(?([2-9]{1}[0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    };

    //create valid variable to use when checking form
    var isValid = true;

    //if the name is null or the regex doesn't match, add an error message
    if (name.value === "" || !regexValidations['name'].test(name.value)) {
        nameError.innerHTML = "Please enter your full name.";
        isValid = false;
    }
    //else remove the error message
    else {
        nameError.innerHTML = "";
    }
    //if the email is null or the regex doesn't match, add an error message
    if (email.value === "" || !regexValidations['email'].test(email.value)) {
        emailError.innerHTML = "Please enter a valid email address.";
        isValid = false;
    }
    else {
        emailError.innerHTML = "";
    }
    //if the phone is null or the regex doesn't match, add an error message
    if (phone.value === "" || !regexValidations['phone'].test(phone.value)) {
        phoneError.innerHTML = "Please enter your phone number.";
        isValid = false;
    }
    else {
        phoneError.innerHTML = "";
    }
    //if the description is null or the regex doesn't match, add an error message
    if (description.value === "") {
        descriptionError.innerHTML = "Please enter a description.";
        isValid = false;
    }
    else {
        descriptionError.innerHTML = "";
    }

    //if all the data is valid create the json object
    if (isValid) {
        var jsonData = {
            "name": name.value,
            "email": email.value,
            "phone": phone.value,
            "description": description.value};
        
        //push the json object into an array
        storeStuff.push(jsonData);

        //stringify the array to add it to local storage
        var dataString = JSON.stringify(storeStuff);
        localStorage.removeItem('test');
        localStorage.setItem('test', dataString);

        //reset value to null for next entry
        name.value = "";
        email.value = "";
        phone.value = "";
        description.value = "";

        //clear htm and then set it to the values in the array
        html = '';
        for (var i = 0; i < storeStuff.length; i++) {
            var name = storeStuff[i].name;
            var email = storeStuff[i].email;
            var phone = storeStuff[i].phone;
            var description = storeStuff[i].description;
            html += '<tr><td>' + i + '</td><td>' + name + '</td>' + '<td>' + email + '</td>' + '<td>' + phone + '</td>' + '<td>' + description + '</td></tr>';
        }
        
        //clear the table and then add the values from the array
        document.querySelector('#tableData').innerHTML = "";
        document.querySelector('#tableData').innerHTML = html;

    }



}
//add an eventlistener for when the window loads that calls the function loadData
window.addEventListener('load', loadData);

//get the local storage item that was set when data was added
function loadData() {
    var data = localStorage.getItem('test');

    //if data exists, parse is and display it in the table
    if (data) {
        data = JSON.parse(data);
        storeStuff = data;

        for (var x in data) {
            html += '<tr><td>' + x + '</td><td>' + data[x].name + '</td><td>' + data[x].email + '</td><td>' + data[x].phone + '</td><td>' + data[x].description + '</td></tr>';
            document.querySelector('#tableData').innerHTML = html;
        }
        console.log("There is local data");

    }



}

//event listener and function to clear the data
var getRideofData = document.querySelector('#clearData');
getRideofData.addEventListener('click', clearAllData);

function clearAllData(e) {
    e.preventDefault();
    localStorage.removeItem('test');
    html = "";
    document.querySelector('#tableData').innerHTML = html;
}

//event listener and function to remove the last row
var removeOneItem = document.querySelector('#deleteLastRowData');
removeOneItem.addEventListener('click', RemoveLastRow);

function RemoveLastRow(e) {
    e.preventDefault();
    storeStuff.pop();
    console.log(storeStuff);

    var dataString = JSON.stringify(storeStuff);

    localStorage.setItem('test', dataString);



}


