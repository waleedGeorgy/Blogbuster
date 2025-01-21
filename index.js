import express from "express";
import bodyParser from "body-parser";
import moment from 'moment';
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import pg from "pg";

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'blogbuster',
  password: '123456',
  port: 5432
});
db.connect();

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname + '/public')));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

var date = moment();

// GET main page and READ posts titles
app.get("/", async(req, res)=>{
  try {
    const result = await db.query("SELECT * FROM posts ORDER BY id ASC");
    res.render("index.ejs", {posts: result.rows});
  } catch (error) {
    console.log(error);
  }
});

// POST to CREATE a new post
app.post("/", async(req, res)=>{
  try {
    var postDate = date.format('YYYY/MM/DD - HH:mm');
    await db.query(
      "INSERT INTO posts (username, subject, topic, post, date) values ($1, $2, $3, $4, $5)",
      [req.body.username, req.body.subject, req.body.topic, req.body.post, postDate]);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

// GET the posts page and READ all posts
app.get("/posts", async(req, res)=>{
  try {
    const result = await db.query("SELECT * FROM posts ORDER BY id ASC");
    res.render("posts.ejs", {posts: result.rows});
  } catch (error) {
    console.log(error);
  }
});

// DELETE a post based on its ID
app.get("/posts/delete/:id", async(req, res)=>{
  try {
    await db.query("DELETE FROM posts WHERE id = $1", [req.params.id]);
    console.log("Delete OK!");
    res.redirect("/posts");
  } catch (error) {
    console.log(error);
  }
});

// GET the edit page for each post based on its ID
app.get("/posts/edit/:id", async(req, res)=>{
  try {
    const result = await db.query("SELECT * FROM posts WHERE id = $1", [req.params.id]);
    res.render("edit.ejs", {post: result.rows[0]});
  } catch (error) {
    console.log(error);
  }
});

// UPDATE the post
app.post("/posts/edit/:id", async(req, res)=>{
  try {
    await db.query(
      "UPDATE posts SET username = $1, subject = $2, topic = $3, post = $4 WHERE id = $5",
      [req.body.username, req.body.subject, req.body.topic, req.body.post, req.params.id]);
    console.log("Update OK!");
    res.redirect("/posts");
  } catch (error) {
    console.log(error);
  }
});

// Connecting the server to the port
app.listen(port, ()=>{
  console.log(`Server running on http://localhost:${port}`);
});