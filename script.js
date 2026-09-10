// Ganti nomor WhatsApp UMKM di sini (gunakan format 62)
const NOMOR_WA_UMKM = "6282223346091";
const GATE_KEY = "umkm_gate_seen";
const THEME_KEY = "umkm_theme";

function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';

    const button = document.querySelector('.theme-toggle');
    if (button) {
        button.innerHTML = `<i class="fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}"></i>`;
        button.setAttribute('aria-label', isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap');
    }
}

function toggleTheme() {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, nextTheme);
    applyTheme(nextTheme);
}

function getWebsiteLink() {
    const url = new URL(window.location.href);
    url.hash = '';
    url.search = '';
    url.pathname = url.pathname.replace(/kontak\.html$/, 'index.html');
    return url.toString();
}

function copyWebsiteLink() {
    const status = document.getElementById('copyLinkStatus');
    const link = getWebsiteLink();

    navigator.clipboard.writeText(link).then(() => {
        if (status) status.textContent = 'Link berhasil disalin.';
    }).catch(() => {
        if (status) status.textContent = 'Link: ' + link;
    });
}

function continueToMenu() {
    localStorage.setItem(GATE_KEY, '1');
    const gate = document.getElementById('gateScreen');
    if (gate) gate.classList.add('is-hidden');
    document.body.classList.remove('gate-open');
}

// DATA MENU (hanya 3 item)
const menuItems = [
    {
        id: 1,
        name: "Cappucino Cincau",
        category: "minuman",
        price: 5000,
        shortDesc: "Kopi cappucino dengan rasa cincau yang lezat.",
        desc: "Minuman kopi cappucino yang diberi sentuhan rasa cincau yang khas, cocok untuk menikmati hari-hari yang cerah.",
        ingredients: ["Bubuk Cappucino pilihan", "Cincau", "Gula", "Es batu"],
        highlight: "Rasa manis, segar dan kenyal dari cincau yang membuat perpaduannya istimewa.",
        images: [
            "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=80"
        ]
    },
    {
        id: 2,
        name: "Gyoza Kuah",
        category: "makanan",
        price: 5000,
        shortDesc: "Gyoza dengan kuah sup yang lezat.",
        desc: "Gyoza yang digoreng dan disajikan dengan kuah sup yang lezat, cocok untuk santapan utama.",
        ingredients: ["Daging cincang", "Sayuran", "Bumbu kuah"],
        highlight: "Berserat lezat, cocok untuk makan siang atau malam dengan porsi yang mengenyangkan.",
        images: [
            "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80"
        ]
    },
    {
        id: 3,
        name: "Cilok Lava",
        category: "makanan",
        price: 5000,
        shortDesc: "Es kopi susu gula aren asli gurih renyah.",
        desc: "Minuman kopi susu dengan sentuhan gula aren yang manis, creamy, dan bikin mood makin nikmat untuk menemani hari.",
        ingredients: ["Kopi bubuk pilihan", "Susu cair", "Gula aren", "Es batu"],
        highlight: "Rasa creamy dengan aroma kopi yang lembut, cocok untuk dinikmati kapan saja.",
        images: [
            "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80"
        ]
    },

    {
        id: 4,
        name: "Cilok Clasik",
        category: "makanan",
        price: 5000,
        shortDesc: "Es kopi susu gula aren asli gurih renyah.",
        desc: "Minuman kopi susu dengan sentuhan gula aren yang manis, creamy, dan bikin mood makin nikmat untuk menemani hari.",
        ingredients: ["Kopi bubuk pilihan", "Susu cair", "Gula aren", "Es batu"],
        highlight: "Rasa creamy dengan aroma kopi yang lembut, cocok untuk dinikmati kapan saja.",
        images: [
            "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80"
        ]
    }
];

// Ambil Keranjang dari localStorage agar tidak hilang saat pindah halaman
let cart = JSON.parse(localStorage.getItem('umkm_cart')) || {};

// FUNGSI RENDER MENU (Khusus index.html)
function renderMenu(items) {
    const grid = document.getElementById("menuGrid");
    if (!grid) return;

    grid.innerHTML = "";
    if (items.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color: var(--text-muted); padding: 30px 0;">Menu tidak ditemukan...</p>`;
        return;
    }

    items.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "menu-card";
        card.style.setProperty('--delay', `${index * 120}ms`);
        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${item.images[0]}" alt="${item.name}">
            </div>
            <div class="card-body">
                <h3 class="card-title">${item.name}</h3>
                <p class="card-desc">${item.shortDesc}</p>
                <div class="card-footer">
                    <span class="card-price">Rp ${item.price.toLocaleString('id-ID')}</span>
                    <button class="add-btn" data-id="${item.id}">+ Tambah</button>
                </div>
            </div>
        `;

        card.addEventListener('click', (event) => {
            if (event.target.closest('.add-btn')) {
                event.stopPropagation();
                addToCart(item.id);
                return;
            }
            openProductModal(item.id);
        });

        grid.appendChild(card);
    });
}

// LOGIKA TAMBAH & EDIT KERANJANG
function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1;
    saveAndRefreshCart();
}

function changeQty(id, delta) {
    if (cart[id]) {
        cart[id] += delta;
        if (cart[id] <= 0) delete cart[id];
    }
    saveAndRefreshCart();
}

function saveAndRefreshCart() {
    localStorage.setItem('umkm_cart', JSON.stringify(cart));
    updateCartUI();
}

// MODAL DETAIL MENU
function openProductModal(itemId) {
    const item = menuItems.find(m => m.id === itemId);
    const modal = document.getElementById('productModal');
    if (!item || !modal) return;

    let currentIndex = 0;
    const gallery = item.images;
    const imageCache = gallery.map((src) => {
        const image = new Image();
        image.src = src;
        return image;
    });

    const renderSlides = () => {
        const img = modal.querySelector('.product-main-image');
        const dots = modal.querySelectorAll('.dot');
        const requestedIndex = currentIndex;
        const applyImage = () => {
            if (!img || requestedIndex !== currentIndex) return;
            img.src = gallery[requestedIndex];
        };

        if (img) {
            if (imageCache[requestedIndex].complete && imageCache[requestedIndex].naturalWidth > 0) {
                applyImage();
            } else {
                imageCache[requestedIndex].addEventListener('load', applyImage, { once: true });
            }
        }
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
    };

    modal.querySelector('.product-name').textContent = item.name;
    modal.querySelector('.product-price').textContent = `Rp ${item.price.toLocaleString('id-ID')}`;
    modal.querySelector('.product-desc').textContent = item.desc;
    modal.querySelector('.product-highlight').textContent = item.highlight;

    const list = modal.querySelector('.ingredient-list');
    list.innerHTML = item.ingredients.map(i => `<li>${i}</li>`).join('');

    const prevBtn = modal.querySelector('.gallery-prev');
    const nextBtn = modal.querySelector('.gallery-next');
    prevBtn.onclick = () => {
        currentIndex = (currentIndex - 1 + gallery.length) % gallery.length;
        renderSlides();
    };
    nextBtn.onclick = () => {
        currentIndex = (currentIndex + 1) % gallery.length;
        renderSlides();
    };

    const dotsWrap = modal.querySelector('.gallery-dots');
    dotsWrap.innerHTML = gallery.map((_, idx) => `
        <button class="dot ${idx === 0 ? 'active' : ''}" data-index="${idx}" aria-label="Gambar ${idx + 1}"></button>
    `).join('');

    dotsWrap.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', () => {
            currentIndex = Number(dot.dataset.index);
            renderSlides();
        });
    });

    const addBtn = modal.querySelector('.product-add-btn');
    addBtn.onclick = () => {
        addToCart(item.id);
        closeProductModal();
    };

    renderSlides();
    modal.classList.remove('is-closing');
    modal.classList.add('active');
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (!modal || !modal.classList.contains('active')) return;

    modal.classList.add('is-closing');
    setTimeout(() => {
        modal.classList.remove('active', 'is-closing');
    }, 200);
}

// PERBAHARUI TAMPILAN KERANJANG
// PERBARUAN FUNGSI KERANJANG & ARAHAN PEMESANAN

function toggleCartModal() {
    const modal = document.getElementById("cartModal");
    if (modal) modal.classList.toggle("active");
}

function closeCartModal() {
    const modal = document.getElementById("cartModal");
    if (modal) modal.classList.remove("active");
}

// FUNGSI MENGARAHKAN PENGGUNA KE MENU
function goToMenu() {
    closeCartModal();
    // Cek apakah pengguna berada di luar halaman index.html
    const isIndexPage = window.location.pathname.endsWith("index.html") || 
                        window.location.pathname === "/" || 
                        window.location.pathname === "";

    if (!isIndexPage) {
        window.location.href = "index.html";
    } else {
        const menuSection = document.getElementById("menuGrid");
        if (menuSection) {
            menuSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// UPDATE TAMPILAN KERANJANG
function updateCartUI() {
    let totalQty = 0;
    let totalPrice = 0;

    const cartList = document.getElementById("cartItemsList");
    const formContainer = document.getElementById("cartFormContainer");

    if (cartList) cartList.innerHTML = "";

    const keys = Object.keys(cart);

    if (keys.length === 0) {
        // TAMPILAN JIKA KERANJANG MASIH 0 PESANAN
        if (cartList) {
            cartList.innerHTML = `
                <div style="text-align:center; padding: 25px 10px;">
                    <i class="fa-solid fa-basket-shopping" style="font-size: 50px; color: var(--text-muted); margin-bottom: 12px; opacity: 0.4;"></i>
                    <h4 style="font-size: 16px; font-weight: 700; margin-bottom: 6px;">Keranjang Belanja Kosong</h4>
                    <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 20px;">Kamu belum memilih menu apa pun. Yuk, jelajahi menu lezat kami!</p>
                    <button onclick="goToMenu()" class="add-btn" style="width: 100%; padding: 12px; font-size: 14px; border-radius: 25px;">
                        <i class="fa-solid fa-utensils" style="margin-right: 6px;"></i> Lihat Menu & Pesan Sekarang
                    </button>
                </div>
            `;
        }
        // Sembunyikan form checkout & tombol WA jika keranjang kosong
        if (formContainer) formContainer.style.display = "none";
    } else {
        // TAMPILKAN FORM JIKA ADA ISI KERANJANG
        if (formContainer) formContainer.style.display = "block";

        keys.forEach(id => {
            const item = menuItems.find(m => m.id == id);
            if (!item) return;
            const qty = cart[id];
            const subtotal = item.price * qty;

            totalQty += qty;
            totalPrice += subtotal;

            if (cartList) {
                const row = document.createElement("div");
                row.className = "cart-item";
                row.innerHTML = `
                    <div>
                        <h4 style="font-size:14px;">${item.name}</h4>
                        <span style="font-size:12px; color:var(--text-muted);">Rp ${subtotal.toLocaleString('id-ID')}</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <button class="qty-btn" onclick="changeQty(${id}, -1)">-</button>
                        <span style="font-weight:700; font-size:13px;">${qty}</span>
                        <button class="qty-btn" onclick="changeQty(${id}, 1)">+</button>
                    </div>
                `;
                cartList.appendChild(row);
            }
        });
    }

    // Update Elemen Badge & Floating Bar
    const navBadge = document.getElementById("nav-cart-count");
    if (navBadge) navBadge.innerText = totalQty;

    const qtyPill = document.getElementById("cartQtyPill");
    if (qtyPill) qtyPill.innerText = `${totalQty} Item`;

    const priceText = document.getElementById("cartTotalPrice");
    if (priceText) priceText.innerText = `Rp ${totalPrice.toLocaleString('id-ID')}`;

    const floatingBar = document.getElementById("floatingCart");
    if (floatingBar) {
        if (totalQty > 0) floatingBar.classList.remove("hidden");
        else floatingBar.classList.add("hidden");
    }
}

function toggleCartModal() {
    const modal = document.getElementById("cartModal");
    if (modal && Object.keys(cart).length > 0) modal.classList.toggle("active");
}

function closeCartModal() {
    const modal = document.getElementById("cartModal");
    if (modal) modal.classList.remove("active");
}

function updateOrderTypeFields() {
    const orderType = document.getElementById("orderType");
    const addressGroup = document.getElementById("addressGroup");
    const addressLabel = document.getElementById("addressLabel");
    const custAddress = document.getElementById("custAddress");

    if (!orderType || !addressGroup) return;

    const isDelivery = orderType.value === "Delivery";
    addressGroup.style.display = isDelivery ? "block" : "none";

    if (addressLabel) {
        addressLabel.textContent = "ALAMAT LENGKAP";
    }

    if (custAddress) {
        custAddress.placeholder = isDelivery ? "Isi alamat rumah Anda" : "";
    }
}

// Tampilkan popup inline animasi untuk pesan singkat
function showInlineAlert(message, duration = 3000) {
    // Jika sudah ada alert aktif, reset teks dan timer
    let existing = document.querySelector('.inline-alert');
    if (existing) {
        existing.classList.remove('hide');
        existing.querySelector('span').textContent = message;
        if (existing._hideTimer) clearTimeout(existing._hideTimer);
        existing._hideTimer = setTimeout(() => {
            existing.classList.add('hide');
                existing._removeTimer = setTimeout(() => existing.remove(), 220);
        }, duration);
        return;
    }

    const el = document.createElement('div');
    el.className = 'inline-alert';
        el.innerHTML = `<strong>Nama belum diisi</strong><span>${message}</span>`;
        el.setAttribute('role', 'alertdialog');
        el.setAttribute('aria-label', 'Peringatan nama belum diisi');
        el.addEventListener('click', () => {
            el.classList.add('hide');
            setTimeout(() => el.remove(), 220);
        });
    document.body.appendChild(el);

    el._hideTimer = setTimeout(() => {
        el.classList.add('hide');
        el._removeTimer = setTimeout(() => el.remove(), 300);
    }, duration);
}

// KIRIM KE WHATSAPP
function sendOrderToWhatsApp() {
    const name = document.getElementById("custName").value.trim();
    const type = document.getElementById("orderType").value;
    const addressInput = document.getElementById("custAddress");
    const address = addressInput ? addressInput.value.trim() : "";

    if (!name) {
        showInlineAlert("Harap masukkan nama Anda.");
        return;
    }

    let text = `*PESANAN BARU - Penagisa Food Corner* 🍽️\n\n`;
    text += `*Rincian Pesanan:*\n`;

    let total = 0;
    Object.keys(cart).forEach((id, idx) => {
        const item = menuItems.find(m => m.id == id);
        const qty = cart[id];
        const sub = item.price * qty;
        total += sub;
        text += `${idx + 1}. ${item.name} (${qty}x) = Rp ${sub.toLocaleString('id-ID')}\n`;
    });

    text += `\n*Total:* Rp ${total.toLocaleString('id-ID')}\n`;
    text += `----------------------------------\n`;
    text += `*Nama:* ${name}\n`;
    const typeLabel = type === 'Delivery' ? 'Delivery / Antar ke Rumah' : 'Takeaway / Ambil Sendiri';
    text += `*Opsi Pesanan:* ${typeLabel}\n`;
    if (type === 'Delivery') {
        text += `*Alamat:* ${address ? address : '-'}\n\n`;
    }
    text += `Mohon konfirmasi pesanan ini. Terima kasih!`;

    window.open(`https://wa.me/${NOMOR_WA_UMKM}?text=${encodeURIComponent(text)}`, '_blank');
}

// BUKA PETUNJUK ARAH DI GOOGLE MAPS DARI LOKASI PENGGUNA
function openDirectionsTo(destLat, destLng) {
    if (!destLat || !destLng) return;

    // Jika browser tidak mendukung Geolocation, buka saja tujuan
    if (!navigator.geolocation) {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${destLat},${destLng}&travelmode=driving`;
        window.open(url, '_blank');
        return;
    }

    navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const url = `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${destLat},${destLng}&travelmode=driving`;
        window.open(url, '_blank');
    }, (err) => {
        // Jika gagal mengambil lokasi, buka petunjuk arah ke tujuan saja
        const url = `https://www.google.com/maps/dir/?api=1&destination=${destLat},${destLng}&travelmode=driving`;
        alert('Tidak dapat mengambil lokasi Anda. Membuka petunjuk arah di Google Maps.');
        window.open(url, '_blank');
    }, { enableHighAccuracy: true, timeout: 10000 });
}

// BUKA PETUNJUK ARAH MENGGUNAKAN ALAMAT YANG DIINPUT PENGGUNA ATAU GEOLOCATION
function openDirectionsFromInput(destLat, destLng) {
    const input = document.getElementById('originAddressInput');
    const originAddr = input ? input.value.trim() : '';

    if (originAddr) {
        const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(originAddr)}&destination=${destLat},${destLng}&travelmode=driving`;
        window.open(url, '_blank');
        return;
    }

    // Jika tidak ada alamat input, coba gunakan geolocation (fallback ke tujuan saja jika gagal)
    openDirectionsTo(destLat, destLng);
}

// RUN SAAT LOKASI KATEGORI/SEARCH
function filterCategory(cat, btn) {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (cat === 'semua') renderMenu(menuItems);
    else renderMenu(menuItems.filter(i => i.category === cat));
}

// INIT
document.addEventListener("DOMContentLoaded", () => {
    applyTheme(localStorage.getItem(THEME_KEY) || 'light');

    const websiteQr = document.getElementById('websiteQr');
    if (websiteQr && typeof QRCode !== 'undefined') {
        new QRCode(websiteQr, {
            text: getWebsiteLink(),
            width: 144,
            height: 144,
            colorDark: '#1e272e',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.M
        });
    }

    const activeLink = document.querySelector('.nav-link.active');
    const navIndicator = document.querySelector('.nav-indicator');
    if (activeLink && navIndicator) {
        const navLinks = [...document.querySelectorAll('.nav-link')];
        const previousHref = sessionStorage.getItem('umkm_previous_nav');
        const previousLink = navLinks.find(link => link.getAttribute('href') === previousHref);

        navIndicator.classList.add('prepare');
        navIndicator.style.left = `${activeLink.offsetLeft}px`;
        navIndicator.style.width = `${activeLink.offsetWidth}px`;
        if (previousLink && previousLink !== activeLink) {
            navIndicator.style.left = `${previousLink.offsetLeft}px`;
        }
        void navIndicator.offsetWidth;
        navIndicator.classList.remove('prepare');
        navIndicator.classList.add('is-ready');

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                sessionStorage.setItem('umkm_previous_nav', activeLink.getAttribute('href'));
            });
        });

        if (previousLink && previousLink !== activeLink) {
            requestAnimationFrame(() => {
                navIndicator.style.left = `${activeLink.offsetLeft}px`;
            });
        }
    }

    const gate = document.getElementById('gateScreen');
    const hasSeenGate = localStorage.getItem(GATE_KEY) === '1';

    if (gate) {
        if (hasSeenGate) {
            gate.classList.add('is-hidden');
            document.body.classList.remove('gate-open');
        } else {
            gate.classList.remove('is-hidden');
            document.body.classList.add('gate-open');
        }
    }

    const orderType = document.getElementById('orderType');
    if (orderType) {
        orderType.addEventListener('change', updateOrderTypeFields);
        updateOrderTypeFields();
    }

    renderMenu(menuItems);
    updateCartUI();
    // Setup orderType visibility handling (show address only for Delivery)
    const orderSelect = document.getElementById('orderType');
    const addressGroup = document.getElementById('addressGroup');
    const addressLabel = document.getElementById('addressLabel');
    function updateAddressVisibility() {
        if (!orderSelect || !addressGroup) return;
        if (orderSelect.value === 'Delivery') {
            addressGroup.style.display = '';
            if (addressLabel) addressLabel.textContent = 'ALAMAT LENGKAP';
        } else {
            addressGroup.style.display = 'none';
        }
    }
    if (orderSelect) {
        orderSelect.addEventListener('change', updateAddressVisibility);
        updateAddressVisibility();
    }
});