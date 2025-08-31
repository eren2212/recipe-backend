const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const DATABASE_URL = process.env.EXPRESS_SUPABASE_DATABASE_URL;
const SERVICE_ROLE_KEY = process.env.EXPRESS_SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(DATABASE_URL, SERVICE_ROLE_KEY);

module.exports = supabase;
