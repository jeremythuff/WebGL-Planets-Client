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
	
	Login.context.form = {};
	
	Login.context.form.login = {
		email: {
			value: "",
			validation: function(elem) {
				validators.email(elem);
			}
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
				email: Login.context.form.login.email.value,
				password: Login.context.form.login.password.value
			});

			loginPromise.then(
				function(apiResponse) {
					if(apiResponse.meta.type == "SUCCESS") {
						StorageService.setValue("JWT", apiResponse.payload.JWT.tokenAsString);
						Login.game.setCurrentState("Main Menu");
					} 
				}, 
				function(apiResponse) {
					Login.gui.updateContext("form.error", apiResponse.meta.message);
				}
			);
		},
		startRegistration: function(e) {
			e.preventDefault();
			Login.game.setCurrentState("Register");
			console.log("Register");
		},
		validateForm: function(elem) {
			if(!validators.form(elem)) {
				Login.gui.updateContext("form.error", elem.getAttribute("error"));
			}
		}
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