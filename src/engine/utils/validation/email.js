export function email(elem) {
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