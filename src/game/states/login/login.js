import { State } from "engine/model/State";
import { Keyboard } from "engine/io/Keyboard";
import { validators } from "engine/utils/validation/Validators";

let Login = new State("Login");

Login.init(function() {

	console.log("Login init");

});

Login.load(function() {
	if(Login.loaded) return;
	
	Login.context.forms = {};
	
	Login.context.forms.login = {
		email: {
			value: "",
			validation: validators.email
		},
		password: {
			value: "",
			validation: function(elem) {
				validators.minLength(3, elem);
			}
		},
		login: function(e) {
			e.preventDefault();
			console.log(Login.context.forms.login.email.value);
			console.log(Login.context.forms.login.password.value);
		},
		startRegistration: function(e) {
			e.preventDefault();
			Login.game.setCurrentState("Register");
			console.log("Register");
		},
		validateForm: validators.form
	}

	Login.gui.addView("Login", "src/game/states/login/gui/templates/loginForm.hbs");

	console.log(Login);
	console.log("Login loaded");
});

Login.update(function() {}); // Will take pass delta as arg if needed

Login.render(function() {}); // Will take pass delta as arg if needed

Login.close(function() {
	Login.gui.close()
	console.log("Login close");
});

Login.destroy(function() {
	console.log("Login destroy");
});

export {Login};