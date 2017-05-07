const express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    data = require('./temp-db');
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
    data.findByName(username)
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
        return done(null, user.id);
    }
    done(null, false);
})

passport.deserializeUser((id, done) => {
    data.findById(id)
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
    data.saveUser(req.body)
        .then(dbUser => {
            res.json({ siccess: true, dbUser });
        })
        .catch(err => {
            res.json({success: false, err})
        })
})

app.use(router);

app.listen(process.env.PORT || 3333, function () {
    console.log(`Server is running at ${process.env.PORT || 3333}`);
});