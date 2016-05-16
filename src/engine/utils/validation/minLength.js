export function minLength(min, elem) {
    if(elem.value.length>min) {
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