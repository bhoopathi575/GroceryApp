function checkIsvalidateEmail(emailAdress) {
    let isRegexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(isRegexEmail)) {
        return true;
    } else {
        return false;
    }
}

export default checkIsvalidateEmail;
