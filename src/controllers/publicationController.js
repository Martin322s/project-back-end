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

module.exports = router;