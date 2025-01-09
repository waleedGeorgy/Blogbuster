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

let posts = [];
let id = 0;

app.get("/", (req, res) => {
  res.render("index.ejs", {posts: posts});
});

app.post("/", (req, res) => {
  var postDate = date.format('YYYY/MM/DD HH:mm:ss');
  id++;
  posts.push({id: id,
              date: postDate,
              username: req.body.username,
              topic: req.body.topic,
              subject: req.body.subject,
              post: req.body.post});
  console.log(posts);
  res.render("index.ejs",{posts: posts});
});

app.get("/posts.ejs", (req, res) => {
  res.render("posts.ejs",{posts: posts});
});

app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});