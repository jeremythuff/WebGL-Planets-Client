import { State } from "engine/model/State";
import { Keyboard } from "engine/io/Keyboard";

let Login = new State("Login");

Login.init(function() {

    console.log("Login init");

});

Login.load(function() {
    if(Login.loaded) return;
    
    Login.context.form = {
        email: {
            value: "",
            validation: function(elem) {
                let regEx = /\S+@\S+\.\S+/;
                if(regEx.test(elem.value)) {
                    elem.classList.remove("invalid");
                    elem.classList.add("valid");
                } else {
                    elem.classList.remove("valid");
                    elem.classList.add("invalid");
                }

                if(elem.value.length === 0) {
                    elem.classList.remove("valid");
                    elem.classList.remove("invalid");
                }
            }
        },
        password: {
            value: "",
            validation: function(elem) {
                if(elem.value.length>3) {
                    elem.classList.remove("invalid");
                    elem.classList.add("valid");
                } else {
                    elem.classList.remove("valid");
                    elem.classList.add("invalid");
                }

                if(elem.value.length === 0) {
                    elem.classList.remove("valid");
                    elem.classList.remove("invalid");
                }
            }
        },
        login: function() {
            console.log(Login.context.form.email.value);
            console.log(Login.context.form.password.value);
        },
        register: function() {
            console.log("Register");
        }
    }

    Login.gui.addView("Login", "src/game/states/login/gui/templates/loginForm.hbs");

    console.log(Login);
    console.log("Login loaded");
});

Login.update(function() {}); // Will take pass delta as arg if needed

Login.render(function() {}); // Will take pass delta as arg if needed

Login.close(function() {
    console.log("Login close");
});

Login.destroy(function() {
    console.log("Login destroy");
});

export {Login};