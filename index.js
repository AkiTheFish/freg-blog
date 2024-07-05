import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const application = express();
const port = 8080;

const posts = [];

application.set("view engine", "ejs");
application.set("views", path.join(__dirname, "views"));

application.use(express.static(__dirname + "/public"));

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
  console.log(post);
  posts.unshift(post);
}

application.get("/", (req, res) => {
  res.render("main.ejs", { posts: posts });
});

application.get("/create", (req, res) => res.render("create.ejs"));

application.get("/about", (req, res) => res.render("about.ejs"));

application.get("/contact", (req, res) => res.render("contact.ejs"));

application.get("/help", (req, res) => res.render("help.ejs"));

application.get("/deleteAll", (req, res) => {
  posts.splice(0, posts.length);
  console.log(`all posts successfuly deleted`);
  res.redirect("/");
});

application.post("/create", (req, res) => {
  newPost(req.body.title, req.body.content);
  res.redirect("/");
});

application.listen(port, () => {
  console.log(`secured connection to port: ${port}`);
});
