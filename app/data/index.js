const mongoose = require('mongoose');

module.exports = (config) => {
    mongoose.connect('mongodb://admin:admin@ds133991.mlab.com:33991/lemon-ninja-miner');

    let userModel = require('./models/user-model');

    return {
        findUserById(id){
            return new Promise((resolve, reject) => {
                userModel.findById(id, (err, user) => {
                    if(err){
                        reject(err);
                    } else{ 
                        resolve(user);
                    }
                })
            })
        },
        findUserByName(name){
            return new Promise((resolve,reject) => {
                userModel.findOne({username: name},(err, res) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve(res);
                    }
                })
            })
        },
        createUser(user){
            return new Promise((resolve, reject) => {
                userModel.create(user,(err, user) => {
                    if(err){
                        reject(err);
                    } else{
                        resolve(user);
                    }
                })
            })
        }
    }
}
