function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = total;
}
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  document.addEventListener("click", (e) => {
    let btn = e.target;
    while (btn && !btn.classList.contains("btn-add-to-cart")) {
      btn = btn.parentElement;
    }
    if (!btn) return;

    e.preventDefault();

    const id = Number(btn.dataset.id);
    const name = btn.dataset.name;
    const raw = btn.dataset.price;
    const price = parseInt(raw.replace(/\D/g, ""), 10);
    const image = btn.dataset.image;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exist = cart.find((item) => item.id === id);
    if (exist) {
      exist.quantity++;
    } else {
      cart.push({ id, name, price, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    // Hiển thị toast
    const toastEl = document.getElementById("toast-cart-success");
    if (toastEl) {
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    }

    // Điều hướng nếu có href
    const href = btn.getAttribute("href");
    if (href) window.location.href = href;
  });
});
