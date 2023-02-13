const mongoose = require('mongoose');
const { getAuthor } = require('../services/authServices');
const router = require('express').Router();
const publicationService = require('../services/publicationServices');
const { getOne } = require('../services/publicationServices');

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

router.get('/:id', async (req, res) => {
    const publicId = req.params.id;
    const publication = await getOne(publicId);
    res.json(publication);
});

router.get('/profile/:ownerId', async (req, res) => {
    const _ownerId = mongoose.Types.ObjectId(req.params.ownerId);
    const publications = await publicationService.getAll();
    const owned = publications.filter(publication => publication._ownerId.toString() === _ownerId.toString());
    res.json(owned);
});

router.post('/donations/:id', async (req, res) => {
    const publicId = req.params.id;
    const publication = await publicationService.getOne(publicId);
    publication.donators.push(req.body.userId);
    publication.donations += 100;
    await publicationService.donate(publicId, { donations: publication.donations, donators: publication.donators });
    const donated = await publicationService.getOne(publicId);
    res.json(donated);
});

router.get('/author/:id', async (req, res) => {
    const userId = req.params.id;
    const author = await getAuthor(userId);
    res.json(author);
});
module.exports = router;