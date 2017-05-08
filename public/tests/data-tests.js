describe('Data layer tests', () => {  
    describe('RegisterUser tests', () => { 


        it('Test test', () =>{
            expect(2 + 2).to.equal(4);
        });


        it('Expect register to make POST', (done) => {

            const username = 'testuser';
            const passHash = '12341234';
            const email = 'test@email.com';

            const response = {
                result: {
                    username: username,
                    authKey: ''
                }
            }

            const requesterStub = sinon.stub(requester, 'post')
                .returns(Promise.resolve(response));

            //sinon.stub(localStorage, 'setItem');

            data.registerUser(username, passHash, email)
                .then(() => {
                    console.log(requesterStub.callCount);
                    expect(requesterStub).to.be.calledOnce;
                })
                .then(done, done);

            requesterStub.restore();
            //localStorage.setItem.restore();
        });   
    });
});