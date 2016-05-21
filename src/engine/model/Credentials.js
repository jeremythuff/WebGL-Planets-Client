export class Credentials {
    constructor(credentialInfo) {
        this._firstName = credentialInfo.firstName;
        this._lastName = credentialInfo.lastName;
        this._email = credentialInfo.email;
        this._role = credentialInfo.role;
    }

    getFirstName() {
        return this._firstName;
    }

    getLastName() {
        return this._lastName;
    }

    getName() {
        return this._firstName + " " + this._lastName;
    }

    getEmail() {
        return this._email;
    }

    getRole() {
        return this._role;
    }


}