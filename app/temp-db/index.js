const db = [{
    id: 0,
    username: 'admin',
    password: 'admin'
}]

module.exports = {
    findById(id){
         return Promise.resolve(db.find(u => u.id === id));
    },
    findByName(name){
         return Promise.resolve(db.find(u => u.username === name));
    },
    saveUser(user){
       return Promise.resolve(db.push({
            id: db.length,
            password: user.password,
            username: user.username
        }));
    }
}