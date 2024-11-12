function validateEmail(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(String(password));
}

function validateUsername(username) {
    const regex = /^[a-zA-Z0-9_-]{3,16}$/;
    return regex.test(String(username));
}

function validateAll(username, email, password){
  return validateEmail(email) && validateUsername(username) && validatePassword(password);
}

export { validateEmail, validatePassword, validateUsername, validateAll };