import validator from 'validator';


export const  validateFormRegister=(form)=>{
    console.log(form)
    //var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{5,})");
    const errors={
        emailError:"",
        nameError:"",
        passwordError:""
    }
    
    if (!validator.isEmail(form.email)) {
        errors.emailError="Enter a valid email!"
    }

    if(form.name.length<5){
        errors.nameError="minLength is 5!"
    }

    // if(!strongRegex.test(form.password) ){
    //     errors.passwordError="A secure password requird!"
    // }

    // if (form.password.length < 8) {
    //     errors.push("Your password must be at least 8 characters"); 
    // }
    // if (form.password.search(/[a-z]/i) < 0) {
    //     errors.push("Your password must contain at least one letter.");
    // }
    // if (form.password.search(/[A-Z]/i) < 0) {
    //     errors.push("Your password must contain at least one letter.");
    // }
    // if (form.password.search(/[0-9]/) < 0) {
    //     errors.push("Your password must contain at least one digit."); 
    // }

    return errors;

}