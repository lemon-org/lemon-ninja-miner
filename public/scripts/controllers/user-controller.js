import { templateLoader } from 'template-loader';
import * as data from 'data';
import { validator } from 'validator';

const $root = $('#root');

export function get() {
    templateLoader.get('login')
        .then((template) => {
            $root.html(template);
        })
        .then(() => {
            $('#login-form-link').click(function (e) {
                $("#login-form").delay(100).fadeIn(100);
                $("#register-form").fadeOut(100);
                $('#register-form-link').removeClass('active');
                $(this).addClass('active');
                e.preventDefault();
                $('#btn-login').on('click', () => {//promise?
                    login();
                });
            });
            $('#register-form-link').click(function (e) {
                $("#register-form").delay(100).fadeIn(100);
                $("#login-form").fadeOut(100);
                $('#login-form-link').removeClass('active');
                $(this).addClass('active');
                e.preventDefault();
                $('#btn-register').on('click', () => { //promise??
                    register();
                });
            });
            //   return Promise.resolve();
        });
}

export function register() {
    let $username = $('#username'),
        $password = $('#password'),
        $confirmPassword = $('#confirm-password'),
        $email = $('#email'),

        username = $username.val(),
        password = $password.val(),
        confirmPassword = $confirmPassword.val(),
        email = $email.val();

    if (!validator.validateEmptyInput(username)) {
        toastr.error('Username is required!');
        $password.val('');
        $confirmPassword.val('');
    }

    if (!validator.validateEmptyInput(password)) {
        toastr.error('Password is required!');
        $confirmPassword.val('');
    }

    if (!validator.validateEmptyInput(confirmPassword)) {
        toastr.error('Confir password is required!');
        $password.val('');
    }

    if (!validator.validateEmptyInput(email)) {
        toastr.error('E-mail is required!');
        $password.val('');
        $confirmPassword.val('');
    }

    if (!validator.validateUserName(username)) {
        toastr.error('Username must be between 5 and 15 symbols!');
        $username.val('');
        $password.val('');
        $confirmPassword.val('');
    }

    if (!validator.validatePassword(password)) {
        toastr.error('Password must be between 5 and 20 symbols!');
        $password.val('');
        $confirmPassword.val('');
    }

    if (validator.validateEmail(email)) {
        toastr.error('E-mail must be valid e-mail address!');
        $password.val('');
        $confirmPassword.val('');
        $email.val('');
    }

    if (password !== confirmPassword) {
        toastr.error('Password doesn\'t match'); // drug tekst
        $password.val('');
        $confirmPassword.val('');
    }

    const passHash = CryptoJS.SHA1(username + password).toString();
    data.registerUser(username, passHash, email)
        .then((user) => {
            toastr.success(`New user ${user.username} registered!`);
            window.location = '#/map';
        })
        .catch((err) => {
            toastr.error(`${err} occured`);
            console.log(err);
        });
};

export function login() {
    const username = $('#username').val(),
        password = $('#password').val(),
        passHash = CryptoJS.SHA1(username + password).toString();

    if (!validator.validateUserName(username)) {//ima validacii na bootstrap no dali mogat da se polzvat
        $username.val('');
        $password.val('');
    }

    if (!validator.validatePassword(password)) {
        $password.val('');
    }

    data.login(username, passHash)
        .then((user) => {
            toastr.success(`User ${user.username} logged in!`);
            window.location = '#/map';
        })
        .catch((err) => {
            toastr.error(`${err} occured`);
            console.log(err);
        });
}

export function logout() {
    data.logoutUser()
        .then(() => {
            toastr.success(`User logged out!`);
            location.href = '';
        })
}