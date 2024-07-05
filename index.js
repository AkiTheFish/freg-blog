import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const application = express();
const port = 8080;

const posts = [];

application.set("view engine", "ejs");
application.set("views", path.join(__dirname, "views"));

application.use(express.static(__dirname + "/public/"));

application.use(express.json());
application.use(express.urlencoded({ extended: true }));

class Post {
  constructor(title, content, date) {
    this.title = title;
    this.content = content;
    this.date = new Date().toLocaleString();
  }
}

function newPost(title, content, date) {
  let post = new Post(title, content, date);
  posts.push(post);
}

application.get("/", (req, res) => {
  res.render("main.ejs", { posts: posts });
  console.log(posts.length);
});

application.get("/create", (req, res) => {
  res.render("create.ejs");
});

application.post("/create", (req, res) => {
  newPost(req.body.title, req.body.content);
  res.redirect("/");
});

application.listen(port, () => {
  console.log(`secured connection to port: ${port}`);
});
