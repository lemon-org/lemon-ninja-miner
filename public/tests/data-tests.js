import { requester } from 'requester';
import * as data  from 'data';

mocha.setup('bdd');
const { expect } = chai;

describe('Data layer tests', () => {  
    describe('RegisterUser tests', () => {

        let requesterPostStub;
        let username = 'testuser';
        let password = '12341234';
        let passHash = username + password;
        let email = 'test@email.com';

        const response = {
            dbUser: {
                username: username,
                _id: 'ID'
            }
        }

        beforeEach(() => {
            requesterPostStub = sinon.stub(requester, 'post');
            requesterPostStub.returns(Promise.resolve(response));
        });
        afterEach(() => {
            requesterPostStub.restore();
        });

        it('Expect registerUser to make a POST request', (done) => {
            data.registerUser(username, passHash, email)
                .then(() => {
                    expect(requesterPostStub).to.be.calledOnce;
                })
                .then(done, done);
        });

        it('Expect registerUser to make a POST request to api/users/register ', (done) => {
            data.registerUser(username, passHash, email)
                .then(() => {
                    expect(requesterPostStub).to.be.calledWith('api/users/register');
                })
                .then(done, done);
        });

        it('Expect registerUser to make a POST request with username ', (done) => {
            data.registerUser(username, passHash, email)
            .then(() => {
                expect(requesterPostStub.args[0][1].data.username).to.be.equal(response.dbUser.username);
            })  
            .then(done, done);
        });

        it('Expect registerUser to make a POST request with passHash ', (done) => {
            data.registerUser(username, passHash, email)
            .then(() => {
                expect(requesterPostStub.args[0][1].data.passHash).to.be.equal(response.dbUser.passHash);
            })  
            .then(done, done);
        });

        it('Expect registerUser to set username in localStorage ', (done) => {
            data.registerUser(username, passHash, email)
            .then(() => {
                expect(localStorage.getItem('signed-in-user-username')).to.be.equal(response.dbUser.username);
            })  
            .then(done, done);
        });

        it('Expect registerUser to set _id in localStorage ', (done) => {
            data.registerUser(username, passHash, email)
            .then(() => {
                expect(localStorage.getItem('signed-in-user-auth-key')).to.be.equal(response.dbUser._id);
            })  
            .then(done, done);
        });

        it('Expect registerUser to return a Promise ', () => {
            const promise =  data.registerUser(username, passHash, email)
          
            expect(promise).to.be.a.instanceof(Promise);
        });

        it('Expect registerUser to return a Promise with correct username ', (done) => {
            data.registerUser(username, passHash, email)
            .then((value) => {
                expect(value).to.be.deep.equal(response.dbUser);
            })  
            .then(done, done);
        });
    });





    describe('Login tests', () => {

        let requesterPutStub;
        let username = 'testuser';
        let password = '12341234';
        let passHash = username + password;
        let email = 'test@email.com';

        const response = {
            user: {
                username: username,
                authKey: 'SOME_KEY'
            }
        }

        beforeEach(() => {
            requesterPutStub = sinon.stub(requester, 'put');
            requesterPutStub.returns(Promise.resolve(response));
        });
        afterEach(() => {
            requesterPutStub.restore();
        });

        it('Expect login to make a PUT request', (done) => {
            data.login(username, passHash)
                .then(() => {
                    expect(requesterPutStub).to.be.calledOnce;
                })
                .then(done, done);
        });

        it('Expect login to make a PUT request to api/users/login ', (done) => {
            data.login(username, passHash)
                .then(() => {
                    expect(requesterPutStub).to.be.calledWith('api/users/login');
                })
                .then(done, done);
        });

        it('Expect login to make a PUT request with username ', (done) => {
            data.login(username, passHash)
            .then(() => {
                expect(requesterPutStub.args[0][1].data.username).to.be.equal(response.user.username);
            })  
            .then(done, done);
        });

        it('Expect loign to make a PUT request with passHash ', (done) => {
            data.login(username, passHash)
            .then(() => {
                expect(requesterPutStub.args[0][1].data.passHash).to.be.equal(response.user.passHash);
            })  
            .then(done, done);
        });

        it('Expect login to set username in localStorage ', (done) => {
            data.login(username, passHash)
            .then(() => {
                expect(localStorage.getItem('signed-in-user-username')).to.be.equal(response.user.username);
            })  
            .then(done, done);
        });

        it('Expect login to set _id in localStorage ', (done) => {
            data.login(username, passHash)
            .then(() => {
                expect(localStorage.getItem('signed-in-user-auth-key')).to.be.equal(response.user.authKey);
            })  
            .then(done, done);
        });

        it('Expect login to return a Promise ', () => {
            const promise =  data.login(username, passHash)
          
            expect(promise).to.be.a.instanceof(Promise);
        });

        it('Expect login to return a Promise with correct username ', (done) => {
            data.login(username, passHash)
            .then((value) => {
                expect(value).to.be.deep.equal(response.user);
            })  
            .then(done, done);
        });
    });


});

mocha.run();