import { State } from "engine/model/State";
import { Keyboard } from "engine/io/Keyboard";
import { validators } from "engine/utils/validation/Validators";
import { StorageService } from "engine/services/StorageService";
import { ApiService } from "engine/services/ApiService"

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
			let loginPromise = ApiService.fetch("/auth/login", {
				email: Login.context.forms.login.email.value,
				password: Login.context.forms.login.password.value
			});

			loginPromise.then(function(apiResponse) {
				if(apiResponse.meta.type == "SUCCESS") {
					StorageService.set("JWT", apiResponse.payload.JWT);
					ApiService.setMode(ApiService.modeType.WS);
					Login.game.setCurrentState("Main Menu");
				}
			});
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