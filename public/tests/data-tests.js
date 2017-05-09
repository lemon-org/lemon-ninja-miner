import { requester } from 'requester';
import * as data  from 'data';

mocha.setup('bdd');
const { expect } = chai;

describe('Data layer tests', () => {  
    describe('RegisterUser tests', () => {

        let requesterPostStub;
        //let cryptoJSStub;
        
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
           /* cryptoJSStub = sinon.stub(CryptoJS, 'SHA1')
                .returns(passHash);*/
        });
        afterEach(() => {
            requesterPostStub.restore();
            //cryptoJSStub.restore();
        });

        it('Expect registerUser to make a POST request', (done) => {

            requesterPostStub.returns(Promise.resolve(response));

            data.registerUser(username, passHash, email)
                .then(() => {
                    expect(requesterPostStub).to.be.calledOnce;
                })
                .then(done, done);
        });

        it('Expect registerUser to make a POST request to api/users/register ', (done) => {

            requesterPostStub.returns(Promise.resolve(response));

            data.registerUser(username, passHash, email)
                .then(() => {
                    expect(requesterPostStub).to.be.calledWith('api/users/register');
                })
                .then(done, done);
        });

        it('Expect registerUser to make a POST request with username ', (done) => {

            requesterPostStub.returns(Promise.resolve(response));

            data.registerUser(username, passHash, email)
            .then(() => {
                expect(requesterPostStub.args[0][1].data.username).to.be.equal(response.dbUser.username);
            })  
            .then(done, done);
        });

        /*it('Expect registerUser to make a call to CryptoJS.SHA1() ', (done) => {

            requesterPostStub.returns(Promise.resolve(response));

            data.registerUser(username, passHash, email)
            .then(() => {
                expect(cryptoJSStub).to.have.been.calledOnce;
            })  
            .then(done, done);
        });*/

        it('Expect registerUser to make a POST request with passHash ', (done) => {

            requesterPostStub.returns(Promise.resolve(response));

            data.registerUser(username, passHash, email)
            .then(() => {
                expect(requesterPostStub.args[0][1].data.passHash).to.be.equal(response.dbUser.passHash);
            })  
            .then(done, done);
        });

        it('Expect registerUser to set username in localStorage ', (done) => {

            requesterPostStub.returns(Promise.resolve(response));

            data.registerUser(username, passHash, email)
            .then(() => {
                expect(localStorage.getItem('signed-in-user-username')).to.be.equal(response.dbUser.username);
            })  
            .then(done, done);
        });

        it('Expect registerUser to set _id in localStorage ', (done) => {

            requesterPostStub.returns(Promise.resolve(response));

            data.registerUser(username, passHash, email)
            .then(() => {
                expect(localStorage.getItem('signed-in-user-auth-key')).to.be.equal(response.dbUser._id);
            })  
            .then(done, done);
        });

        it('Expect registerUser to return a Promise ', () => {

            requesterPostStub.returns(Promise.resolve(response));

            const promise =  data.registerUser(username, passHash, email)
          
            expect(promise).to.be.a.instanceof(Promise);
        });

        it('Expect registerUser to return a Promise with correct username ', (done) => {

            requesterPostStub.returns(Promise.resolve(response));

            data.registerUser(username, passHash, email)
            .then((value) => {
                expect(value).to.be.deep.equal(response.dbUser);
            })  
            .then(done, done);
        });
    });

    



});

mocha.run();