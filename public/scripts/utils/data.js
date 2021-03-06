import { requester } from 'requester';
import { puzzles } from 'puzzle';

const LOCAL_STORAGE_USERNAME_KEY = 'signed-in-user-username',
    LOCAL_STORAGE_AUTHKEY_KEY = 'signed-in-user-auth-key';


export function getPuzzle(level) {

    return requester.get('api/puzzles/' + level)
        .then(function (res) {
            const puzzle = res.puzzle;
            return puzzle;
        });

    //  return puzzles[level];
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

    // return Promise.resolve(2);
}

export function updateReachedLevel(reachedLevel) {
    const options = {
        data: { reachedLevel: reachedLevel },
        headers: {
            'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
        }
    };
    return requester.put('api/users/reachedLevel', options)
        .then(function (res) {
            const reachedLevel = res.rechedLevel;
            return reachedLevel;
        });
    // return reachedLevel;
}

export function saveScore(points, level) {
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


    return requester.put('api/puzzles/' + level, options)
        .then(function (resp) {
            return resp.puzzle;
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