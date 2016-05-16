import { form } from "engine/utils/validation/form";
import { email } from "engine/utils/validation/email";
import { minLength } from "engine/utils/validation/minLength";
import { match } from "engine/utils/validation/match";

class Validators {
    constructor() {

        this.form = form;
        this.email = email;
        this.minLength = minLength;
        this.match = match;

    }
}

let validators = new Validators();

export { validators }