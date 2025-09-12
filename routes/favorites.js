var express = require("express");
var router = express.Router();
var supabase = require("../db/supabase");
var checkAuth = require("../middleware/authMiddleware");

/* GET home page. */
router.get("/", checkAuth, async (req, res, next) => {
  const userId = req.user.id;

  if (userId) {
    return res.status(400).json({ error: "id field required" });
  }

  try {
    const response = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", userId);

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}); 

/* POST FAVORİTE*/
router.post("/add", checkAuth, async (req, res) => {
  const userId = req.user.id;
  const {
    idMeal,
    strMeal,
    strCategory,
    strArea,
    strInstructions,
    strMealThumb,
    strYoutube,
  } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "id field required" });
  }

  try {
    const newFavorites = {
      user_id: userId,
      meal_id: idMeal,
      meal_name: strMeal,
      meal_thumb: strMealThumb,
      meal_category: strCategory,
      meal_area: strArea,
      instructions: strInstructions,
      youtube_url: strYoutube,
    };

    const { data, error } = await supabase
      .from("favorites")
      .insert(newFavorites)
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ success: true, favorite: data[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*DELETE FAVORİTE*/
// Örn: DELETE /favorites/123
router.delete("/:id", checkAuth, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }

  try {
    // Eğer auth kullanıyorsan, bu örnekte req.user.id'yi filtreye ekle
    // yoksa bu satırı çıkarabilirsin.
    // const userId = req.user?.id; // middleware ile set ediliyorsa
    let { data, error } = await supabase
      .from("favorites")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    // if (userId) {
    //   query = query.eq("user_id", userId);
    // }

    // İstersen 204 No Content da kullanabilirsin; o zaman body göndermeyebilirsin.
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
