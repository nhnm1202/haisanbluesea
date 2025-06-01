const express = require("express");
const path = require("path");
const app = express();

// ✅ Cấu hình view engine là EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ✅ Cho phép truy cập file tĩnh như CSS, ảnh
app.use(express.static("public"));

// app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));

app.get("/contact", (req, res) => res.render("contact"));
app.get("/cart", (req, res) => res.render("cart"));
app.get("/login", (req, res) => res.render("login"));
app.get("/register", (req, res) => res.render("register"));
//goi product.js
const productRoutes = require("./routes/products");
app.use("/", productRoutes);

app.listen(1202, () => {
  console.log("http://localhost:1202");
});
