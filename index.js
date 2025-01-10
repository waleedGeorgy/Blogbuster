import express from "express";
import bodyParser from "body-parser";
import moment from 'moment';
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname + '/public')));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

var date = moment();
let id = 1;

// GET main page
app.get("/", (req, res)=>{
  res.render("index.ejs", {posts: posts});
});

// POST a new post
app.post("/", (req, res)=>{
  var postDate = date.format('YYYY/MM/DD HH:mm:ss');
  id++;
  posts.push({id: id,
              date: postDate,
              username: req.body.username,
              topic: req.body.topic,
              subject: req.body.subject,
              post: req.body.post});
  res.redirect("/");
});

// GET the posts page
app.get("/posts", (req, res)=>{
  res.render("posts.ejs",{posts: posts});
});

// DELETE a post based on its ID
app.get("/posts/delete/:id", (req, res)=>{
  posts = posts.filter((post) => post.id !== parseInt(req.params.id));
  console.log("Delete ok! Status 200");
  res.redirect("/posts");
});

app.get("/posts/edit/:id", (req, res)=>{
  var postToUpdate = posts.find((post) => post.id === parseInt(req.params.id));
  res.render("edit.ejs", {post: postToUpdate});
});

app.post("/posts/edit/:id", (req, res)=>{
  var postToUpdate = posts.find((post) => post.id === parseInt(req.params.id));
  if (!postToUpdate) console.log("Update OK!");

  if (req.body.username) postToUpdate.username = req.body.username;
  if (req.body.subject) postToUpdate.subject = req.body.subject;
  if (req.body.topic) postToUpdate.topic = req.body.topic;
  if (req.body.post) postToUpdate.post = req.body.post;
  postToUpdate.date = date.format('YYYY/MM/DD HH:mm:ss');
  res.redirect("/posts");
});

// List of posts
let posts = [
  {
    id: 1,
    username: "Waleed",
    subject: "Lorem Ipsum",
    topic: "Linguistics",
    post: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    date: date.format('YYYY/MM/DD HH:mm:ss')
  }
];

// Connecting the server to the port
app.listen(port, ()=>{
  console.log(`Server listening to port ${port}`);
});