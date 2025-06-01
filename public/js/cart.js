function formatCurrency(num) {
  return Number(num).toLocaleString("vi-VN") + " đ";
}

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-container");

  if (cart.length === 0) {
    container.innerHTML = `<p>Giỏ hàng của bạn đang trống.</p>`;
    return;
  }

  let total = 0;
  const rows = cart.map((item) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    return `
      <tr>
        <td><img src="${item.image}" alt="${item.name}" /></td>
        <td>${item.name}</td>
        <td>${formatCurrency(item.price)}</td>
        <td>
          <input type="number" value="${item.quantity}" data-id="${
      item.id
    }" class="form-control quantity-input  p-3 fs-4" min="1" style="width: 100px;" />
        </td>
        <td class="fw-bold">${formatCurrency(subtotal)}</td>
        <td>
          <button class="btn btn-sm btn-danger btn-remove fs-3" data-id="${
            item.id
          }">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });

  container.innerHTML = `
    <table class="table cart-table table-bordered align-middle">
      <thead>
        <tr>
          <th>Ảnh</th>
          <th>Sản phẩm</th>
          <th>Giá</th>
          <th>Số lượng</th>
          <th>Thành tiền</th>
          <th>Xoá</th>
        </tr>
      </thead>
      <tbody>${rows.join("")}</tbody>
    </table>
    <div class="text-end fs-4 fw-bold">Tổng cộng: <span class="text-danger fs-3">${formatCurrency(
      total
    )} </span></div>

    <div class="d-flex justify-content-between align-items-center mt-4">
      <a href="/products" class="text-decoration-none fs-3 p-3 text-dark"><-- Tiếp tục mua sắm</a>
    <button type="button" class="btn btn-success fs-4 p-3 fw-bold">Thanh Toán
    </button>
    </div>
  `;

  attachCartEvents();
}

function attachCartEvents() {
  // Thay đổi số lượng
  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", (e) => {
      const id = Number(e.target.dataset.id);
      const newQty = Math.max(1, parseInt(e.target.value));
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const item = cart.find((i) => i.id === id);
      if (item) {
        item.quantity = newQty;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        updateCartCount();
      }
    });
  });

  // Xóa sản phẩm
  document.querySelectorAll(".btn-remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart = cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      updateCartCount();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});
