import { requester } from 'requester';

describe('Data layer tests', () => {   
    describe('RegisterUser tests', (done) => {
            const username = 'testuser';
            const passHash = CryptoJS.SHA1(username + '12341234').toString();
            const email = 'test@email.com'

            sinon.stub(requester, 'post')
                .returns(new Promise());

            data.registerUser(username, passHash, email)
                .then(() => {
                    expect(requester.post).to.be.calledOnce();
                });

            requester.post.restore();
    });
});