var express = require("express");
var router = express.Router();
var supabase = require("../db/supabase");

/* GET home page. */
router.get("/", async (req, res, next) => {
  const { body } = req;
  if (!body.user_id) {
    return res.status(400).json({ error: "id field required" });
  }

  try {
    const response = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", body.user_id);

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* POST FAVORİTE*/
router.post("/add", async (req, res) => {
  const {
    user_id,
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
      user_id,
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
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }

  try {
    // Eğer auth kullanıyorsan, bu örnekte req.user.id'yi filtreye ekle
    // yoksa bu satırı çıkarabilirsin.
    // const userId = req.user?.id; // middleware ile set ediliyorsa
    let query = await supabase.from("favorites").delete().eq("id", id);

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
