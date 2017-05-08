const express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    data = require('./data/index')();
const app = express();

//session setup
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({ secret: 'lemon ninja miner' }));

//static middleware
app.use(express.static('./public'));
app.use(express.static('./node_modules'))

//passport strategy setup
// @ts-ignore
const localStrategy = new LocalStrategy((username, password, done) => {
    data.findUserByName(username)
        .then(user => {
            if (user) {
                if (user.password === password) {
                    return done(null, user);
                }
            }
            
            done(null, false);
        })
        .catch(err => done(err, false));
});

//passport setup
passport.use(localStrategy);

passport.serializeUser((user, done) => {
    if (user) {
        return done(null, user._id);
    }
    done(null, false);
})

passport.deserializeUser((id, done) => {
    data.findUserById(id)
        .then(user => {
            if (user) {
                return done(null, user);
            }

            done(null, false);
        })
        .catch(err => done(err, false));
})
app.use(passport.initialize());
app.use(passport.session());

//routes middleware
let router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res, next) => {
    res.status(200).json({ succes: true, user: req.user });
});

router.post('/register', (req, res) => {
    let user = {
        username: req.body.username,
        password: req.body.password,
        eMail: req.body.email
    }

    data.createUser(user)
        .then(dbUser => {
            res.json({ success: true, dbUser });
        })
        .catch(err => {
            let msg;

            if(err.code === 11000){
                msg = 'username allready exist';
            }
            
            res.json({success: false, err: msg})
        })
})

app.use('/api/users', router);

app.listen(process.env.PORT || 3333, function () {
    console.log(`Server is running at ${process.env.PORT || 3333}`);
});