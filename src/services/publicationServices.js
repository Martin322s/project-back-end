const Publication = require('../models/Publication');

exports.createPublication = async (data) => {
    const publication = await Publication.create(data);
    return publication;
}