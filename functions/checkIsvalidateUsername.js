// var usernameRegex = /^[a-zA-Z0-9]+$/;
function checkIsvalidateUsername(username) {
    let isRegrexUsername = /^[a-zA-Z0-9]+$/
    if (username.match(isRegrexUsername)) {
        return true;
    } else {
        return false;
    }
}

export default checkIsvalidateUsername;
