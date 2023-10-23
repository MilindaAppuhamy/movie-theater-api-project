const express = require("express");
const { User, Show } = require("../models/index");

const router = express.Router();

router.use(express.json());

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.send(user);
});

router.get("/:id/shows", async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: Show,
  });
  res.send(user.shows);
});

router.put("/:userId/shows/:showId", async (req, res) => {
  const user = await User.findByPk(req.params.userId, {
    include: Show,
  });
  const show = await Show.findByPk(req.params.showId);
  await user.addShow(show);
  res.send(`${show.title} added to ${user.username}.`);
});

module.exports = router;
