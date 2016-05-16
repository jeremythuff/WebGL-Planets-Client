export function match(elem, valueToMatch) {

    console.log(elem.value);
    console.log(valueToMatch);

    if(elem.value == valueToMatch) {
        elem.classList.add("valid");
        elem.classList.remove("invalid");
    } else {
        elem.classList.add("invalid");
        elem.classList.remove("valid");
    }

}