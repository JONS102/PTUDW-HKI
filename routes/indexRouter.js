const express = require('express');

const router = express.Router();
const controller = require('../controllers/indexController');


router.get("/", controller.show);
router.post("/", controller.reserve);
module.exports = router;