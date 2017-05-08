import { templateLoader } from 'template-loader';
import { registerPlayer } from 'data';
import { loginPlayer } from 'data';

const $root = $('#root');

class UserController {
    register() {
        templateLoader.get('register')
            .then((template) => {
                $root.html(template);
            })
            .then(() => {
                $('#btn-register').on('click', (ev) => {
                    let fullName = $('#fullName').val(),
                        username = $('#username').val(),
                        password = $('#password').val(),
                        confirmPassword = $('#verify').val(),
                        email = $('#email').val();

                    //validations

                    let newUser = {
                        username,
                        password,
                        fullName,
                        email,

                    };

                    registerPlayer(newUser)
                        .then((user) => {
                            //         notifier.success(`${user.username} successfully registered!`);
                            //         _toggleCLassWhenLoggedIn();
                            console.log(user)
                            window.location = '#/map';
                        });
                    //      .catch((err) => {
                    //         notifier.error(err);
                    //         console.log(err);
                    //     });

                    //   ev.preventDefault();
                    //      return false;
                });
            });
    }

    login() {
        templateLoader.get('login')
            .then((template) => {
                $root.html(template);
            })
            .then(() => {
                $('#btn-login').on('click', (ev) => {

                    let username = $('#input-username').val(),
                        password = $('#input-password').val();

                    let user = {
                        username,
                        password
                    };
                    loginPlayer(user)
                        .then((user) => {
                            console.log(user);
                            window.location = '#/map';
                        })
                        .catch(err => {
                            console.log(err);
                        });
                });
            });

    }
}
const userController = new UserController();

export { userController };