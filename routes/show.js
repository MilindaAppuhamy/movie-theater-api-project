const express = require("express");
const { User, Show } = require("../models/index");
const { check, validationResult } = require("express-validator");

const router = express.Router();

router.use(express.json());

router.get("/", async (req, res) => {
  const shows = await Show.findAll();
  res.send(shows);
});

router.get("/:id", async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  res.send(show);
});

router.get("/genres/:genre", async (req, res) => {
  const shows = await Show.findAll({
    where: {
      genre: req.params.genre,
    },
  });

  res.send(shows);
});

router.put(
  "/:id/watched",
  [check("rating").not().isEmpty().trim()],
  async (req, res) => {
    const show = await Show.findByPk(req.params.id);
    await show.update({
      rating: req.body.rating,
    });

    res.send(show);
  }
);

router.put(
  "/:id/updates",
  [
    check("status").not().isEmpty().trim(),
    check("status").isLength({ min: 5, max: 25 }),
  ],
  async (req, res) => {
    const show = await Show.findByPk(req.params.id);
    await show.update({
      status: req.body.status,
    });

    res.send(show);
  }
);

router.delete("/:id", async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  await show.destroy();
  res.send(show);
});

module.exports = router;
