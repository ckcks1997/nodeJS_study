const express = require('express');
const {User, Comment} = require('../models');

const router = express.Router();
router.post('/', async (req, res, next) => {
    try {
        const comment = await Comment.create({
            commenter: req.body.id,
            comment: req.body.comment
        });
        console.log(comment);
        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        next(error)
    }
});

