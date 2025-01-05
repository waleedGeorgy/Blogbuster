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
  res.render("index.ejs", {postContent: posts});
});

app.post("/", (req, res) => {
  var postDate = date.format('YYYY/MM/DD HH:mm:ss');
  id++;
  posts.push({id: id, post:[req.body, postDate]});
  res.render("index.ejs",{postContent: posts});
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});