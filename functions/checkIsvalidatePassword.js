const checkIsvalidatePassword = (password) => {
    var isPasswordRegrex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if (password.match(isPasswordRegrex)) {
        return true;
    } else {
        return false;
    }
}

export default checkIsvalidatePassword;
