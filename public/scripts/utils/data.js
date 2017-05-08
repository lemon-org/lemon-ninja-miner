import { requester } from 'requester';
import { puzzles } from 'puzzle';

const LOCAL_STORAGE_USERNAME_KEY = 'signed-in-user-username',
    LOCAL_STORAGE_AUTHKEY_KEY = 'signed-in-user-auth-key';

export function getPuzzle(id) {

    return requester.get('api/puzzles/' + id)
        .then(function (res) {
            const puzzle = res.result;
            return puzzle;
        });

    // return puzzles[id];
}

export function getPuzzles() {

    return requester.get('api/puzzles')
        .then(function (res) {
            const puzzles = res.puzzles;
            return puzzles;
        });

    //  return puzzles;
}

export function getReachedLevel() {
    
    return requester.get('api/users/reachedLevel')
        .then(function (res) {
            const reachedLevel = res.reachedLevel;
            return reachedLevel;
        });
    //  return Promise.resolve(2);
}



export function saveScore(points, id) {
    const username = localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY);
    const score = {
        username,
        points
    }
    const options = {
        data: {
            score
        },
        headers: {
            // current puzzles/id.scores -> push in scores
        }
    };

    return requester.post('api/puzzles' + id, options)
        .then(function (resp) {
            return resp.result;
        });
}

export function registerUser(username, passHash, email) {
    const body = {
        username,
        password: passHash,
        email,
        reachedLevel: 1
    };
    return requester.post('api/users/register', {
        data: body
    })
        .then(function (res) {
            const user = res.dbUser;
            localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, user.username);
            localStorage.setItem(LOCAL_STORAGE_AUTHKEY_KEY, user._id);
            return user;
        });
}

export function login(username, passHash) {
    const body = {
        username,
        password: passHash
    };
    return requester.put('api/users/login', {
        data: body
    })
        .then(function (res) {
            const user = res.user;
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