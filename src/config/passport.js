const passport = require('passport');
const LocalStrategy = require('passport-Local').Strategy;

const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'

}, async(email, password, done) => {
    //match email's user
    const user = await User.findOne({ email })
    if (!user) {
        return done(null, false, { message: 'El usuario no ha sido encontrado' });
    }  else{
        //Match password user
        const match= await user.matchPassword(password);
        if(match){
            return done(null, user);
        }else{
            return done(null, false, {message:'La contraseña no es correcta'});
        }
    }
}
));

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        done(err, user);
    })
});
