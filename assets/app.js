const PRODUCTS = [
  {
    id: 1,
    n: 'Aero Wireless Earbuds',
    c: 'Electronics',
    p: 7999,
    s: 14,
    e: '🎧',
    bg: '#dfe6ff',
    d: 'Bluetooth 5.3 earbuds with 28-hour battery life and a pocket charging case.'
  },
  {
    id: 2,
    n: 'Pulse Smart Watch',
    c: 'Electronics',
    p: 12499,
    s: 3,
    e: '⌚',
    bg: '#e3f7ee',
    d: 'AMOLED display, heart-rate tracking and 7-day battery.'
  },
  {
    id: 3,
    n: 'Everyday Cotton Hoodie',
    c: 'Clothes',
    p: 3499,
    s: 30,
    e: '🧥',
    bg: '#fff0d1',
    d: 'Heavyweight 400gsm cotton hoodie in a relaxed fit.'
  },
  {
    id: 4,
    n: 'Street Canvas Sneakers',
    c: 'Clothes',
    p: 5299,
    s: 0,
    e: '👟',
    bg: '#ffe1e8',
    d: 'Lightweight canvas sneakers with a cushioned insole.'
  },
  {
    id: 5,
    n: 'Ceramic Pour-Over Set',
    c: 'Home',
    p: 4150,
    s: 9,
    e: '☕',
    bg: '#efe6ff',
    d: 'Hand-glazed dripper, server and two cups.'
  },
  {
    id: 6,
    n: 'Desk Lamp Halo',
    c: 'Home',
    p: 3899,
    s: 21,
    e: '💡',
    bg: '#fff6c9',
    d: 'Dimmable LED lamp with three colour temperatures.'
  },
  {
    id: 7,
    n: 'Glow Vitamin C Serum',
    c: 'Beauty',
    p: 2299,
    s: 40,
    e: '🧴',
    bg: '#ffe9d6',
    d: '15% vitamin C serum for an even, bright complexion.'
  },
  {
    id: 8,
    n: 'Portable Power Bank 20K',
    c: 'Electronics',
    p: 6499,
    s: 6,
    e: '🔋',
    bg: '#d9f1ff',
    d: '20,000 mAh with 65W fast charging and a digital readout.'
  }
];
const CATS = ['All', 'Electronics', 'Clothes', 'Home', 'Beauty'];
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmt = n => 'Rs. ' + n.toLocaleString('en-PK');
const get = (k, d) => {
  try {
    return JSON.parse(localStorage.getItem(k)) ?? d;
  }
  catch {
    return d;
  }
}, set = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const cart = () => get('sc_cart', {}), byId = id => PRODUCTS.find(p => p.id == id);
const count = () => Object.values(cart()).reduce((a, b) => a + b, 0);
function addCart(id, q = 1) {
  const p = byId(id), c = cart(), n = (c[id] || 0) + q;
  if (p.s < 1)
    return toast('Out of stock: ' + p.n, 'danger');
  if (n > p.s)
    return toast('Only ' + p.s + ' left in stock', 'warning');
  c[id] = n;
  set('sc_cart', c);
  badge();
  toast(p.n + ' added to cart', 'success');
}
function badge() {
  const b = $('#cbadge');
  if (b) {
    b.textContent = count();
    b.classList.toggle('d-none', !count());
  }
}
function toast(msg, type = 'success') {
  let w = $('#toasts');
  if (!w) {
    w = document.createElement('div');
    w.id = 'toasts';
    w.className = 'toast-container position-fixed top-0 end-0 p-3';
    document.body.append(w);
  }
  const t = document.createElement('div');
  t.className = 'toast align-items-center text-bg-' + type + ' border-0';
  t.innerHTML = '<div class="d-flex"><div class="toast-body fw-semibold">' + msg + '</div><button class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>'
    + '</div>';
  w.append(t);
  const x = new bootstrap.Toast(t, { delay: 2500 });
  x.show();
  t.addEventListener('hidden.bs.toast', () => t.remove());
}
function layout() {
  const s = get('sc_seller', null);
  $('#nav').innerHTML = `<nav class="navbar navbar-expand-md sticky-top">
   <div class="container"><a class="brand" href="index.html"><i class="bi bi-lightning-charge-fill"></i> SwiftCart</a>
<button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#m"><span class="navbar-toggler-icon"></span></button>
<div class="collapse navbar-collapse" id="m">
   <ul class="navbar-nav me-auto ms-md-4">
   <li class="nav-item"><a class="nav-link" href="index.html">Shop</a></li>
   </ul>
<div class="d-flex gap-2 align-items-center"><a href="cart.html" class="btn btn-outline-dark position-relative"><i class="bi bi-bag"></i> Cart<span id="cbadge" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger d-none">0</span></a>
${s ? `<a href="dashboard.html" class="btn btn-primary"><i class="bi bi-shop"></i> ${s.store}</a><button class="btn btn-link text-dark" onclick="localStorage.removeItem('sc_seller');location='index.html'">Sign out</button>` : `<a href="signin.html" class="btn btn-link text-dark">Seller sign in</a><a href="signup.html" class="btn btn-primary">Sell on SwiftCart</a>`}</div></div></div></nav>`;
  const f = $('#foot');
  if (f)
    f.innerHTML = '<footer class="container py-5 mt-5 border-top small d-flex flex-wrap justify-content-between gap-2"><span><b class="brand">SwiftCart</b> · Swift, simple shopping for Pakistan</span><span>Software Engineering prototype · UET Lahore</span></footer>';
  badge();
}
function card(p) {
  const st = p.s < 1 ? '<span class="badge text-bg-danger">Out of stock</span>' : p.s < 5 ? '<span class="badge text-bg-warning">Only ' + p.s + ' left</span>' : '<span class="badge text-bg-success-subtle text-success">In stock</span>';
  return `<div class="col-6 col-lg-3">
   <div class="pcard"><a href="product.html?id=${p.id}" class="pimg text-decoration-none" style="background:${p.bg}">${p.e}</a>
   <div class="p-3 d-flex flex-column gap-1 flex-grow-1"><small class="text-secondary">${p.c}</small><a href="product.html?id=${p.id}" class="fw-semibold text-dark text-decoration-none">${p.n}</a>${st}<div class="d-flex justify-content-between align-items-center mt-auto pt-2"><span class="price">${fmt(p.p)}</span><button class="btn btn-sm btn-primary" ${p.s < 1 ? 'disabled' : ''} onclick="addCart(${p.id})"><i class="bi bi-bag-plus"></i></button>
   </div>
   </div>
   </div>
   </div>`;
}
function check(form, extra) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    e.stopPropagation();
    let ok = form.checkValidity();
    if (extra && !extra(form))
      ok = false;
    form.classList.add('was-validated');
    if (ok)
      form.dispatchEvent(new CustomEvent('valid'));
  });
}
document.addEventListener('DOMContentLoaded', layout);
