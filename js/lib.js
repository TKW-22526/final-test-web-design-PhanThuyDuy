// ===========================
// DỮ LIỆU SẢN PHẨM
// ===========================

const product = [
    {
        id: "1",
        ten: "Sữa tắm dưỡng da",
        gia: "180.000đ",
        mota: "Giúp làn da mềm mịn, hương thơm quyến rũ.",
        mota_dai: `Sữa tắm dưỡng da cao cấp chứa Vitamin E và các tinh chất thiên nhiên.`,
        lienket: "html/chi-tiet.html",
        img: "assets/images/suatam.jpg",
        alt: "Sữa tắm",
        category: "my-pham"
    },

    {
        id: "2",
        ten: "Sữa rửa mặt",
        gia: "69.000đ",
        mota: "Làm sạch sâu, giúp da mềm mịn.",
        mota_dai: `Sữa rửa mặt tạo bọt dịu nhẹ, phù hợp mọi loại da.`,
        lienket: "html/chi-tiet.html",
        img: "assets/images/suarm.jpg",
        alt: "Sữa rửa mặt",
        category: "my-pham"
    },

    {
        id: "3",
        ten: "Nước tẩy trang",
        gia: "200.000đ",
        mota: "Làm sạch bụi bẩn và lớp trang điểm.",
        mota_dai: `Nước tẩy trang Micellar giúp làm sạch hiệu quả mà không gây khô da.`,
        lienket: "html/chi-tiet.html",
        img: "assets/images/nuoctt.jpg",
        alt: "Nước tẩy trang",
        category: "do-trang-diem"
    },

    {
        id: "4",
        ten: "Nước rửa tay",
        gia: "39.000đ",
        mota: "Diệt khuẩn, bảo vệ đôi tay.",
        mota_dai: `Chiết xuất nha đam giúp giữ ẩm và làm sạch hiệu quả.`,
        lienket: "html/chi-tiet.html",
        img: "assets/images/nuocrt.jpg",
        alt: "Nước rửa tay",
        category: "my-pham"
    },

    {
        id: "5",
        ten: "Mặt nạ đất sét Cocoon",
        gia: "150.000đ",
        mota: "Làm sạch sâu, hỗ trợ giảm mụn.",
        mota_dai: `Mặt nạ đất sét Cocoon từ nguyên liệu thuần chay.`,
        lienket: "html/chi-tiet.html",
        img: "assets/images/matnacocoon.jpg",
        alt: "Mặt nạ Cocoon",
        category: "my-pham"
    },

    {
        id: "6",
        ten: "Sữa rửa mặt CeraVe",
        gia: "380.000đ",
        mota: "Làm sạch dịu nhẹ cho mọi loại da.",
        mota_dai: `Sữa rửa mặt CeraVe được các bác sĩ da liễu khuyên dùng.`,
        lienket: "html/chi-tiet.html",
        img: "assets/images/srmcerave.jpg",
        alt: "Sữa rửa mặt CeraVe",
        category: "my-pham"
    },
    {
        id: "7",
        ten: "Nước hoa Avon Cherish the Moment",
        gia: "1.104.000đ",
        mota: "Hương thơm hoa cỏ trái cây ngọt ngào và lôi cuốn.",
        mota_dai: `Nước hoa Avon Cherish the Moment mang đến hương thơm nữ tính, dịu dàng và lưu hương lâu.`,
        lienket: "html/chi-tiet.html",
        img: "assets/images/nuochoa1.jpg",
        alt: "Nước hoa Avon Cherish the Moment",
        category: "nuoc-hoa"
    }
];


// ===========================
// TẠO 1 SẢN PHẨM
// ===========================

function createItem(obj) {

    const list = document.getElementById("list");

    if (!list) return;

    const item = document.createElement("div");
    item.className = "product-card";

    item.innerHTML = `
        <div class="image">
            <img src="${obj.img}" alt="${obj.alt}">
        </div>

        <div class="info">

            <h3>${obj.ten}</h3>

            <p class="price">${obj.gia}</p>

            <p class="desc">${obj.mota}</p>

            <div class="button-group">

                <a href="${obj.lienket}?id=${obj.id}" class="btn-detail">
                    Xem chi tiết
                </a>

                <a href="#" class="btn-buy">
                    Mua ngay
                </a>

            </div>

        </div>
    `;

    list.appendChild(item);
}


// ===========================
// HIỂN THỊ DANH SÁCH
// ===========================

function loadAllProducts(arr) {

    const list = document.getElementById("list");

    if (!list) return;

    list.innerHTML = "";
// Nếu không có sản phẩm nào thỏa mãn, hiển thị thông báo "Không tìm thấy sản phẩm phù hợp."
    if (!arr || arr.length === 0) {
        const emptyState = document.createElement("div");
        emptyState.className = "empty-state";
        emptyState.innerHTML = "<p>Không tìm thấy sản phẩm phù hợp.</p>";
        list.appendChild(emptyState);
        return;
    }

    arr.forEach(function(item) {

        createItem(item);

    });

}

// ==================================================
// LỌC DỰA TRÊN DANH MỤC
// ==================================================

function updateActiveCategoryButton(category) {
    const buttons = document.querySelectorAll(".category-btn");
    buttons.forEach(function(button) {
        button.classList.toggle("active", button.dataset.category === category);
    });
}

function applyCategoryFilter(category) {
    if (category === "all") {
        loadAllProducts(product);
    } else {
        const filtered = product.filter(function(item) {
            return item.category === category;
        });
        loadAllProducts(filtered);
    }
    updateActiveCategoryButton(category);
}

function initCategoryFilter() {
    const buttons = document.querySelectorAll(".category-btn");
    if (!buttons.length) return;

    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            const category = button.dataset.category;
            applyCategoryFilter(category);
        });
    });
}

// ==================================================
// TÌM KIẾM KHI ẤM ENTER HOẶC CLICK ICON KÍNH LÚP
// ==================================================

function initSearch() {
    const searchInput = document.getElementById("search-input"); // Ô input tìm kiếm
    const searchBtn = document.getElementById("search-btn"); // Thẻ chứa icon kính lúp
    
    if (!searchInput) return;

    // 1. Tự động cuộn xuống phần sản phẩm khi người dùng bấm vào ô tìm kiếm
    searchInput.addEventListener("focus", function() {
        const productSection = document.querySelector(".product");
        if (productSection) {
            productSection.scrollIntoView({ 
                behavior: "smooth", 
                block: "start" 
            });
        }
    });

    // Hàm thực hiện xử lý lọc sản phẩm
    function executeSearch() {
        const keyword = searchInput.value.trim().toLowerCase();

        const result = product.filter(function(item){
            return item.ten.toLowerCase().includes(keyword);
        });

        // Chỉ hiển thị các sản phẩm thỏa mãn sau khi nhấn Enter/Click
        loadAllProducts(result);
        updateActiveCategoryButton("all");
    }

    // 2. Lắng nghe sự kiện phím Enter khi đang gõ trong ô input
    searchInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Ngăn chặn hành động tải lại trang mặc định nếu có Form
            executeSearch(); // Chạy hàm tìm kiếm
        }
    });

    // 3. Lắng nghe sự kiện khi người dùng click trực tiếp vào nút kính lúp (nếu có)
    if (searchBtn) {
        searchBtn.addEventListener("click", function() {
            executeSearch();
        });
    }
}

// ===========================
// KHỞI TẠO
// ===========================
document.addEventListener("DOMContentLoaded", function () {
    loadAllProducts(product.slice(0,4));
    initSearch();
    initCategoryFilter();
}); 