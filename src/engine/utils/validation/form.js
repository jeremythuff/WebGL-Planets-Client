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

    if(isVallid && isComplete) {
        elem.classList.add("valid");
        elem.classList.remove("invalid");
    } else {
        elem.classList.add("invalid");
        elem.classList.remove("valid");
    }
}