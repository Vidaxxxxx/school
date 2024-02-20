const express = require("express");
const router = express.Router();
const Channel = require("../models/Channel");

router.get("/All", (req, res) => {
    Channel.find()
        .then((data) => {
            try {
                res.status(200).send(data);
            } catch (error) {
                res.status(500).send(error.message);
            }
        })
        .catch((error) => {
            res.status(500).send(error.message);
        });
});

router.post("/create", (req, res) => {
    const channel = new Channel({
        title: req.body.title,
        users: req.body.users,
    });
    channel
        .save()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((error) => {
            res.status(500).send(error.message);
        });
})

module.exports = router;
