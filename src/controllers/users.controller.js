const usersCtrl = {};
const User = require('../models/User');
const passport= require('passport');


usersCtrl.renderSignupForm = (req, res) => {
    res.render('users/signup');

}

usersCtrl.signUp = async (req, res) => {
        const errors = [];
        const { name, email, password, confirm_password } = req.body;
        if (password != confirm_password) {
            errors.push({ text: 'Password does not match' });
        }
        if (password.length < 4) {
            errors.push({ text: 'password tiene menos de 4 caracteres' });
        }
        if (errors.length > 0) {
            res.render('users/signup', {
                errors,
                name,
                email,
                password,
                confirm_password
            });
        } else {
            const emailUser = await User.findOne({ email: email });
            if (emailUser) {
                req.flash('error_msg', 'El correo ya existe');
                res.redirect('/users/signup');
            }
            else {
                const newUser = new User({ name, email, password });
                newUser.password=await newUser.encrypPassword(password)
                await newUser.save();
                req.flash('success_msg', 'El usuario ha sido agregado');
                res.redirect('/users/signin');
            }


        }
    

    };


    usersCtrl.renderSignInForm = (req, res) => {
        res.render('users/signin')
    }

    usersCtrl.signIn = passport.authenticate('local', {
        failureRedirect: '/users/signin',
        successRedirect: '/notes',
        failureFlash: true
    });
    

    usersCtrl.logOut = (req, res) => {
        req.logout();
        req.flash('success_msg', 'Sesion Cerrada')
        res.redirect('/users/signin');
    }


    module.exports = usersCtrl;