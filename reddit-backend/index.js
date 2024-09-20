require("dotenv").config();
let express = require("express");
let bodyParser = require("body-parser");
const cors = require("cors");
const Pool = require("pg").Pool;
const jwt = require("jsonwebtoken");
// const validateToken = require("./middleware/authmiddleware");
let app = express();

const pool = new Pool({
  user: "chauncey",
  host: "localhost",
  database: "reddit",
  password: "password",
  port: 5432,
});

const corsOptions = {
  origins: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  pool.query("SELECT * FROM reddit_posts", function (error, results) {
    if (error) {
      throw error;
    }
    res.send(results.rows);
  });
});

app.post("/create-post", function (req, res) {
  let { post_image, title, author, subreddit, upvotes } = req.body;
  console.log(post_image, title, author, subreddit, upvotes);
  pool.query(
    "INSERT INTO reddit_posts (post_image, title, author, subreddit, upvotes) VALUES ($1, $2, $3, $4, $5)",
    [post_image, title, author, subreddit, upvotes],
    function (error, results) {
      if (error) {
        throw error;
      }
      res.json("");
    }
  );
});

app.put("/:id", function (req, res) {
  let { upvotes } = req.body;
  let { id } = req.params;
  console.log(id, upvotes);
  pool.query(
    "UPDATE reddit_posts SET upvotes = $1 WHERE post_id = $2",
    [upvotes, id],
    function (error, results) {
      if (error) {
        throw error;
      }
      res.json("Upvotes updated");
    }
  );
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
