import { requester } from 'requester';
import { puzzles } from 'puzzle';

const LOCAL_STORAGE_USERNAME_KEY = 'signed-in-user-username',
    LOCAL_STORAGE_AUTHKEY_KEY = 'signed-in-user-auth-key';

export function getPuzzle(id) {

    return requester.get('api/puzzles' + id)
        .then(function (res) {
            const puzzle = res.result;
            return puzzle;
        });

    //  return puzzles[id];
}

export function getPuzzles() {

    return requester.get('api/puzzles')
        .then(function (res) {
            const puzzles = res.result;
            return puzzles;
        });

    //  return puzzles;
}

export function getReachedLevel() {
    const options = {
        headers: {
            'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
        }
    };
    return requester.get('api/users/reachedLevel', options)
        .then(function (res) {
            const reachedLevel = res.result;
            return reachedLevel;
        });
    //   return 2;
}

export function updateReachedLevel(reachedLevel) {
    const options = {
        data: { reachedLevel: reachedLevel },
        headers: {
            'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
        }
    };
    return requester.put('api/users', options)
        .then(function (res) {
            const reachedLevel = res.result;
            return reachedLevel;
        });
}

export function registerUser(username, passHash, email) {
    const body = {
        username,
        passHash,
        email,
        reachedLevel: 1
    };
    return requester.post('api/users', {
        data: body
    })
        .then(function (res) {
            const user = res.result;
            localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, user.username);
            localStorage.setItem(LOCAL_STORAGE_AUTHKEY_KEY, user.authKey);
            return user;
        });
}

export function login(user, passHash) {
    const body = {
        username,
        passHash
    };
    return requester.put('/api/users/auth', {
        data: body
    })
        .then(function (res) {
            const user = res.result;
            localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, user.username);
            localStorage.setItem(LOCAL_STORAGE_AUTHKEY_KEY, user.authKey);
            return user;
        });
}

export function logoutUser() {
    var promise = new Promise(function (resolve, reject) {
        localStorage.removeItem(LOCAL_STORAGE_USERNAME_KEY);
        localStorage.removeItem(LOCAL_STORAGE_AUTHKEY_KEY);
        resolve();
    });
    return promise;
}

export function isLogged() {
    return localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY) !== null;
}