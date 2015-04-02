/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var form = document.querySelector('form');

form.addEventListener('submit', checkForm);

function checkForm(e) {
    e.preventDefault();
    
    var fname = document.querySelector('input[name="fname"]');
    var lname = document.querySelector('input[name="lname"]');
    var email = document.querySelector('input[name="email"]');
    var phone = document.querySelector('input[name="phone"]');
    
    var fnameError = document.querySelector('.fnameError').classList;
    var lnameError = document.querySelector('.lnameError').classList;
    var emailError = document.querySelector('.emailError').classList;
    var phoneError = document.querySelector('.phoneError').classList;
    
    var isValid = true;
    
    
    if ( fname.value === '' ) {
       fnameError.add('error');
       isValid = false;
    } else {
       fnameError.remove('error');
    }
    
    if ( lname.value === '' ) {
       lnameError.add('error');
       isValid = false;
    } else {
       lnameError.remove('error');
    }
    
    if ( email.value === '' ) {
       emailError.add('error');
       isValid = false;
    } else {
       emailError.remove('error');
    }
    
    if ( phone.value === '' ) {
       phoneError.add('error');
       isValid = false;
    } else {
       phoneError.remove('error');
    }
    
    if (isValid){
        form.classList.add('hide');
        var confirmation = document.querySelector('#confirmation');
        
        var html = '<p>First Name: ' + fname.value + '</p>';
            html += '<p>Last Name: ' + lname.value + '</p>';
            html += '<p>Email: ' + email.value + '</p>';
            html += '<p>Phone: ' + phone.value + '</p>';
            
        confirmation.innerHTML = html;    
            
    }
    
    
}