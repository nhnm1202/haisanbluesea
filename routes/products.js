const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// ✅ Khai báo đường dẫn đến file sản phẩm
const productFilePath = path.join(__dirname, "..", "data", "products.json");

//////////////////////////
// Trang tất cả sản phẩm
//////////////////////////
router.get("/all-products", (req, res) => {
  fs.readFile(productFilePath, "utf-8", (err, data) => {
    if (err) return res.status(500).send("Lỗi server");

    const products = JSON.parse(data);
    res.render("all-products", { products }); // ✅ Truyền biến products vào view
  });
});

//////////////////////////
// Trang theo loại (ca, tom, cua, muc, ...)
//////////////////////////
router.get("/products/:type", (req, res) => {
  const { type } = req.params;

  fs.readFile(productFilePath, "utf-8", (err, data) => {
    if (err) return res.status(500).send("Lỗi server");

    const allProducts = JSON.parse(data);
    const filtered = allProducts.filter((p) => p.hh === type);

    res.render("all-products", { products: filtered });
  });
});
//////////////////////////
// Trang chi tiết
//////////////////////////
router.get("/product-detail/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const detailPath = path.join(__dirname, "..", "data", "products-detail.json");

  fs.readFile(detailPath, "utf-8", (err, data) => {
    if (err) return res.status(500).send("Lỗi đọc dữ liệu");

    const productList = JSON.parse(data);
    const product = productList.find((p) => p.id === id);

    if (!product) return res.status(404).send("Không tìm thấy sản phẩm");

    res.render("product-detail", { product });
  });
});

module.exports = router;

//////////
//search//
//////////
router.get("/search", (req, res) => {
  const keyword = (req.query.q || "").toLowerCase().trim();

  fs.readFile(productFilePath, "utf-8", (err, data) => {
    if (err) return res.status(500).send("Lỗi server khi tìm kiếm");

    const allProducts = JSON.parse(data);
    const results = allProducts.filter((p) =>
      p.name.toLowerCase().includes(keyword)
    );

    res.render("search-results", {
      products: results,
      keyword,
      isHome: false,
    });
  });
});
//////////////
// route cart/
///////////
router.get("/cart", (req, res) => {
  res.render("cart");
});
