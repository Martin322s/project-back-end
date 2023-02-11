const mongoose = require('mongoose');
const router = require('express').Router();
const publicationService = require('../services/publicationServices');

router.post('/create', async (req, res) => {
    const { title, category, content, _ownerId } = req.body;

    try {
        if (title == "" || category == "" || content == "") {
            throw "All fields are required!"
        } else {
            const publication = await publicationService.createPublication({
                title,
                category,
                content,
                _ownerId
            });
            res.json(publication);
        }
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/all', async (req, res) => {
    const publications = await publicationService.getAll();
    res.json(publications);
});

router.get('/profile/:ownerId', async (req, res) => {
    const _ownerId = mongoose.Types.ObjectId(req.params.ownerId);
    const publications = await publicationService.getAll();
    const owned = publications.filter(publication => publication._ownerId.toString() === _ownerId.toString());
    res.json(owned);
});

module.exports = router;