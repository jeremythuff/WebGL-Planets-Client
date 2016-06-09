export function form(elem) {

    let isVallid = elem.querySelectorAll(".invalid").length == 0;
    let requiredElems = elem.querySelectorAll('[required]');
    let isComplete = true;
    for(let i=0; i<requiredElems.length; i++) {
        let rElem = requiredElems[i];
        if(rElem.value == "") {
            isComplete = false;
            break;
        }
    }

    let valid = true;
    if(isVallid && isComplete) {
        valid = true;
        elem.classList.add("valid");
        elem.classList.remove("invalid");
    } else {
        valid = false;
        elem.classList.add("invalid");
        elem.classList.remove("valid");
    }

    return valid;
}