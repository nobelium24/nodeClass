const { schema } = require("../models/ProductSchema");

const validate = (schema) => async(req, res, next) => {
    const body = req.body;
    try {
        await schema.validate(body);
        next();
    } catch (error) {
        return res.status(401).send({message: error.message})
    }
}

module.exports = {validate};
