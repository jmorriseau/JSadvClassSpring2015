
var form = document.querySelector('form');

form.addEventListener('submit', checkForm);

function checkForm(e) {
    e.preventDefault();
    var email = document.querySelector('input[name="email"]');
    
    console.log('form submited');
    console.log(email.value);
    
    if ( email.value === '' ) {
        
    }
    
    
}


