const lodash = require("lodash");
const axios = require("axios");

let allposts = [];
exports.bloghome = async (req, res) => {
  if (allposts.length <= 0) {
    try {
      const resData = await axios.get("https://dummyapi.online/api/blogposts");
      allposts = resData.data;
    } catch {
      console.log(err);
    }
  }

  res.render("home", { pagetitle: "My Blog", allposts });
};

exports.blogabout = (req, res) => {
  res.render("about", { pagetitle: "About" });
};

exports.blogcontact = (req, res) => {
  res.render("contact", { pagetitle: "Contact" });
};

exports.blogcompose = (req, res) => {
  res.render("compose", { pagetitle: "Compose" });
};

exports.blogcomposePOST = (req, res) => {
  let title = req.body.posttitle;
  let content = req.body.posttext;
  let today = new Date();
  let args = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  let date_published = today.toLocaleDateString("en-IN", args);

  allposts.unshift({ title, date_published, content });
  res.render("home", { pagetitle: "Home", allposts });
};

exports.blogpost = (req, res) => {
  const { q } = req.query;
  let flag = 0;

  for (let post of allposts) {
    if (lodash.lowerCase(q) === lodash.lowerCase(post.title)) {
      res.render("post", { pagetitle: "blog", post });
      flag = 1;
      break;
    }
  }

  if (!flag) {
    res.render("404", { pagetitle: "404", q });
  }
};
