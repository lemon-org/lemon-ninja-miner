import { requester } from 'requester';
import * as data  from 'data';

mocha.setup('bdd');
const { expect } = chai;

describe('Data layer tests', () => {  

    const LOCAL_STORAGE_USERNAME_KEY = 'signed-in-user-username',
        LOCAL_STORAGE_AUTHKEY_KEY = 'signed-in-user-auth-key';

        const clearStorage = () => {
            localStorage.removeItem(LOCAL_STORAGE_USERNAME_KEY);
            localStorage.removeItem(LOCAL_STORAGE_AUTHKEY_KEY);
        }

        beforeEach(clearStorage);
        afterEach(clearStorage);

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
                    expect(localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY)).to.be.equal(response.dbUser.username);
                })  
                .then(done, done);
        });

        it('Expect registerUser to set _id in localStorage ', (done) => {
            data.registerUser(username, passHash, email)
                .then(() => {
                    expect(localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)).to.be.equal(response.dbUser._id);
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
                    expect(localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY)).to.be.equal(response.user.username);
                })  
                .then(done, done);
        });

        it('Expect login to set _id in localStorage ', (done) => {
            data.login(username, passHash)
                .then(() => {
                    expect(localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)).to.be.equal(response.user.authKey);
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



    describe('LogoutUser tests', () => {
        it('Expect logoutUser to clear username from localStorage ', (done) => {
            data.logoutUser()
                .then(() => {
                    expect(localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY)).to.be.null;
                })  
                .then(done, done);
        });

        it('Expect logoutUser to clear authKey from localStorage ', (done) => {
            data.logoutUser()
                .then(() => {
                    expect(localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)).to.be.null;
                })  
                .then(done, done);
        });

        it('Expect logoutUser to return a Promise ', () => {
            const promise =  data.logoutUser()
          
            expect(promise).to.be.a.instanceof(Promise);
        });
    });



    describe('IsLogged tests', () => {
        it('Expect isLogged to return false when no one is logged in ', () => {
            expect(data.isLogged()).to.be.false;
        });

        it('Expect isLogged to return true when user is logged in ', () => {
            localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, 'pesho');

            expect(data.isLogged()).to.be.true;
        });
    });



    describe('GetPuzzle tests', () => {
        let requesterGetStub;
        let level = 1
        
        beforeEach (() => {
            requesterGetStub = sinon.stub(requester, 'get');
            requesterGetStub.returns(Promise.resolve({puzzle: 'ARRAY'}));
        });
        afterEach(() => {
            requesterGetStub.restore();
        })

        it('Expect getPuzzle to make GET request ', (done) => {
            data.getPuzzle(level)
                .then(() => {
                     expect(requesterGetStub).to.be.calledOnce;
                })
                .then(done, done);
        });

        it('Expect getPuzzle to make GET request to api/puzzles/ + level ', (done) => {
            data.getPuzzle(level)
                .then(() => {
                     expect(requesterGetStub).to.be.calledWith('api/puzzles/' + level);
                })
                .then(done, done);
        });

        it('Expect getPuzzle to return puzzle array ', (done) => {
            data.getPuzzle(level)
                .then((puzzle) => {
                     expect(puzzle).to.equal('ARRAY');
                })
                .then(done, done);
        });

        it('Expect getPuzzle to return a Promise ', () => {
            const promise =  data.getPuzzle(level)
          
            expect(promise).to.be.a.instanceof(Promise);
        });
    });



    describe('GetReachedLevel tests', () => {
        let requesterGetStub;

        beforeEach (() => {
            requesterGetStub = sinon.stub(requester, 'get')
                .returns(Promise.resolve({reachedLevel: 'ARRAY'}));
        });
        afterEach(() => {
            requesterGetStub.restore();
        })

        it('Expect GetReachedLevel to make GET request ', (done) => {
            data.getReachedLevel()
                .then(() => {
                     expect(requesterGetStub).to.be.calledOnce;
                })
                .then(done, done);
        });

        it('Expect GetReachedLevel to make GET request to api/users/reachedLevel ', (done) => {
            data.getReachedLevel()
                .then(() => {
                     expect(requesterGetStub).to.be.calledWith('api/users/reachedLevel');
                })
                .then(done, done);
        });

        it('Expect GetReachedLevel to return reachedLevel ', (done) => {
            data.getReachedLevel()
                .then((puzzle) => {
                     expect(puzzle).to.equal('ARRAY');
                })
                .then(done, done);
        });

        it('Expect GetReachedLevel to return a Promise ', () => {
            const promise =  data.getReachedLevel()
          
            expect(promise).to.be.a.instanceof(Promise);
        });
    });



    describe('UpdateReachedLevel tests', () => {
        let requesterPutStub;
        let reachedLevel = 5;

        beforeEach (() => {
            requesterPutStub = sinon.stub(requester, 'put')
                .returns(Promise.resolve({reachedLevel: 'ARRAY'}));
        });
        afterEach(() => {
            requesterPutStub.restore();
        })

        it('Expect updateReachedLevel to make PUT request ', (done) => {
            data.updateReachedLevel(reachedLevel)
                .then(() => {
                     expect(requesterPutStub).to.be.calledOnce;
                })
                .then(done, done);
        });

        it('Expect updateReachedLevel to make PUT request to api/users/reachedLevel ', (done) => {
            data.updateReachedLevel(reachedLevel)
                .then(() => {
                     expect(requesterPutStub).to.be.calledWith('api/users/reachedLevel');
                })
                .then(done, done);
        });

        it('Expect updateReachedLevel to make PUT request to api/users/reachedLevel with options ', (done) => {
            localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, 'pesho');
            localStorage.setItem(LOCAL_STORAGE_AUTHKEY_KEY, 'SOME_KEY');

            const options = {
                data: { reachedLevel: reachedLevel },
                    headers: {
                        ['x-auth-key']: 'SOME_KEY'
                    }
                };

            data.updateReachedLevel(reachedLevel)
                .then(() => {
                    expect(requesterPutStub.args[0][1]).to.be.deep.equal(options);
                })
                .then(done, done);
        });

        it('Expect updateReachedLevel to return a Promise ', () => {
            const promise =  data.updateReachedLevel(reachedLevel)
          
            expect(promise).to.be.a.instanceof(Promise);
        });
    });


    describe('SaveScore tests', () => {
        let requesterPutStub;
        let points = 50;
        let level = 3;

        beforeEach (() => {
            requesterPutStub = sinon.stub(requester, 'put')
                .returns(Promise.resolve({puzzle: 'ARRAY'}));
        });
        afterEach(() => {
            requesterPutStub.restore();
        })

        it('Expect saveScore to make PUT request ', (done) => {
            data.saveScore(points, level)
                .then(() => {
                     expect(requesterPutStub).to.be.calledOnce;
                })
                .then(done, done);
        });

        it('Expect saveScore to make PUT request to api/puzzles/ + level ', (done) => {
            data.saveScore(points, level)
                .then(() => {
                     expect(requesterPutStub).to.be.calledWith('api/puzzles/' + level);
                })
                .then(done, done);
        });

        it('Expect saveScore to make PUT request to api/puzzles/ + level with options ', (done) => {
            localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, 'pesho');

            const score = {
                username: 'pesho',
                points: points
            }
            const options = {
                data: {
                    score
                },
                headers: {
                }
            };

            data.saveScore(points, level)
                .then(() => {
                    expect(requesterPutStub.args[0][1]).to.be.deep.equal(options);
                })
                .then(done, done);
        });

        it('Expect SaveScore to return a Promise ', () => {
            const promise =  data.saveScore(points, level)
          
            expect(promise).to.be.a.instanceof(Promise);
        });
    });
});

mocha.run();