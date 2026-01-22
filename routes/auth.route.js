const { Router } = require("express");

const { signin } = require("../controllers/auth.controller");
const { signinValidator } = require("../util/validators/auth.validator");

const router = Router();

router.post("/signin", signinValidator, signin);

module.exports = router;
