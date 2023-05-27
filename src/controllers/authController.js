const router = require('express').Router();
const authService = require('../services/authServices');
const nodemailer = require('nodemailer');

router.post('/register', async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        rePass } = req.body;

    try {
        if (password !== rePass) {
            return res.status(400).json({ message: 'Passwords do not match' });
        } else {
            const result = await authService.registerUser({ firstName, lastName, email, password });

            if (typeof result === 'string') {
                throw result;
            } else {
                const token = await authService.generateToken({ _id: result._id });
                res.json({
                    _id: result._id,
                    email: result.email,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    accessToken: token
                });
            }
        }
    } catch (err) {
        res.json(err);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authService.loginUser({ email, password });

        if (typeof user === 'string') {
            throw user;
        } else {
            const token = await authService.generateToken({ _id: user._id });
            res.json({
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                accessToken: token
            });
        }
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/logout', (req, res) => {
    if (req.headers['x-authorization']) {
        res.json();
    }
});

router.post('/contact', (req, res) => {
    const { firstName, lastName, email, message } = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'marti.sofroniev0408@gmail.com',
          pass: '01234567890Drew'
        }
      });
    console.log(req.body);
});

module.exports = router;