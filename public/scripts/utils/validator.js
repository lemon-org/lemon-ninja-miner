class Validator {
    validateUserName(user) {
        var regex = /^[a-zA-Z0-9 ]{5,15}$/;
        if (!(regex.test(user))) {
            return false;
        }

        return true;
    }

    validatePassword(password) {
        var regex = /^[A-Za-z0-9]\w{5,20}$/;
        if (!(regex.test(password))) {
            return false;
        }

        return true;
    }

    validateEmail(email) {
        var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

        if (!(regex.test(email))) {
            return false;
        }

        return true;
    }
    validateEmptyInput(input) {
        if (input==='') {
            return false;
        }

        return true;
    }
}

const validator = new Validator();

export { validator };