var express = require("express");
var router = express.Router();
var supabase = require("../db/supabase");

/* GET home page. */
router.get("/", async (req, res, next) => {
  const { body } = req;
  console.log(body);
  try {
    if (!body.user_id) {
      throw new Error("id field required");
    }
    const response = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", body.user_id);

    res.json({ succes: true });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
