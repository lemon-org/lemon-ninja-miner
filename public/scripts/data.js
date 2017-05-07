import { requester} from 'requester';
import { puzzles } from 'puzzle';

export function getPuzzle(id) { // triabva da vzima puzelite ot player
    // Add authentication
    // return requester.get('api/puzzles'); //player-puzzles;
    return puzzles.find(p => p.id == id);
}

export function getPuzzles() { // triabva da vzima puzelite ot player
    // Add authentication
    // return requester.get('api/puzzles'); //player-puzzles;
    return puzzles;
}

export function getPlayer() {
    // Add authentication
   // return requester.get('api/users');
}

//save puzzle

export function registerPlayer(user) {

    return new Promise((resolve,reject) => {
        requester.post('/register',user)
            .then(resolve)
            .catch(reject);
    })

}

export function loginPlayer(user) {

    return new Promise((resolve,reject) => {
        requester.post('/login', user)
        .then(resolve)
        .catch(reject);
    });
}