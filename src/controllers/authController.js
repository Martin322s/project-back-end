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
        host: 'smtp.abv.bg',
        port: 465,
        auth: {
            user: 'marti.sofroniev12@abv.bg',
            pass: '01234567890mero'
        }
    });

    const mailOptions = {
        from: email,
        to: 'marti.sofroniev12@abv.bg',
        subject: `${firstName} ${lastName}`,
        text: message
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error occurred:', error.message)
        } else {
            console.log('Email sent successfully!');
            console.log('Message ID:', info.messageId);
        }
    });
});

module.exports = router;