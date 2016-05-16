import { State } from "engine/model/State";
import { Keyboard } from "engine/io/Keyboard";
import { validators } from "engine/utils/validation/Validators";
import { ApiService } from "engine/services/ApiService"
import { AjaxLoader } from "engine/utils/assets/AjaxLoader"

let Register = new State("Register");
let apiService = new ApiService("http://localhost:9000");
let ajax = new AjaxLoader();

Register.init(function() {
	console.log("Register init");
	console.log(apiService);
});

Register.load(function() {
	if(Register.loaded) return;
	
	Register.context.forms = {};

	Register.context.forms.register = {
		email: {
			value: "",
			validation: validators.email
		},
		confirmEmail: {
			value: "",
			validation: function(elem) {
				validators.email(elem);
				validators.match(elem, Register.context.forms.register.email.value);
			}
		},
		password: {
			value: "",
			validation: function(elem) {
				validators.minLength(3, elem);
			}
		},
		confirmPassword: {
			value: "",
			validation: function(elem) {
				validators.minLength(3, elem);
				validators.match(elem, Register.context.forms.register.password.value);
			}
		},
		register: function(e) {
			e.preventDefault();

			let registerPromise = ajax.POST("http://localhost:9000/auth/register", {
				email: Register.context.forms.register.email.value,
				password: Register.context.forms.register.password.value
			});

			registerPromise.then(function(res) {
				console.log(JSON.parse(res));
			});

			console.log("Register");
		},
		returnToLogin: function(e) {
			e.preventDefault();
			Register.game.setCurrentState("Login");
			console.log("back to login");
		},
		validateForm: validators.form
	}

	Register.gui.addView("Register", "src/game/states/register/gui/templates/registerForm.hbs");

	console.log(Register);
	console.log("Register loaded");
});

Register.update(function() {}); // Will take pass delta as arg if needed

Register.render(function() {}); // Will take pass delta as arg if needed

Register.close(function() {
	Register.gui.close();
	console.log("Register close");
});

Register.destroy(function() {
	console.log("Register destroy");
});

export {Register};