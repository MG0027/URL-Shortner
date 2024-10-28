const express = require("express");
const URL = require("../models/url");
const { restrictToLoggedinUserOnly } = require("../middlewares/auth");

const router = express.Router();
router.get("/admin/urls", restrictToLoggedinUserOnly(["ADMIN"]), async (req, res) => {
  // if (!req.user) return res.redirect("/login");
   const allurls = await URL.find({});
   return res.render("home", {
     urls: allurls,
   });
 });
router.get("/", restrictToLoggedinUserOnly(["NORMAL","ADMIN"]), async (req, res) => {
 // if (!req.user) return res.redirect("/login");
  const allurls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allurls,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;