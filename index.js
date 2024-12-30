import express from "express";
import bodyParser from "body-parser";
import moment from 'moment';
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

app.use(express.static(path.join(__dirname + '/public')));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

var date = moment();

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/", (req, res) => {
  var postDate = date.format('YYYY/MM/DD HH:mm:ss');
  res.render("index.ejs",
    { username: req.body.username,
    usertopic: req.body.topic,
    userpost: req.body.post,
    postDate: postDate });
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});