// ===========================
// DỮ LIỆU SẢN PHẨM
// ===========================

function resolveSitePath(path) {
    if (!path || /^(https?:|mailto:|tel:|data:|#|javascript:)/i.test(path)) {
        return path;
    } // Kiểm tra nếu đường dẫn là URL tuyệt đối hoặc các loại đường dẫn đặc biệt, trả về nguyên bản

    const currentPath = window.location.pathname.replace(/\\/g, "/");
    const isNestedPage = currentPath.includes("/html/");

    if (path.startsWith("./") || path.startsWith("../")) {
        if (path.startsWith("../") && !isNestedPage) {
            return path.replace(/^\.\.\//, "./");
        }
        return path;
    } // Nếu đường dẫn bắt đầu bằng "./" hoặc "../", trả về nguyên bản (hoặc thay đổi nếu cần thiết)

    const prefix = isNestedPage ? "../" : "./";
    return prefix + path;
} // Hàm resolveSitePath để xác định đường dẫn đúng dựa trên vị trí hiện tại của trang web, giúp đảm bảo rằng các liên kết và tài nguyên được tải chính xác.

const product = [
    {
        id: "20", // Giữ nguyên ID gốc của SK-II trong database
        ten: "Nước thần tinh chất dưỡng da SK-II Facial Treatment Essence",
        gia: "1.950.000đ",
        mota: "Nước thần tái tạo tế bào, dưỡng da căng mướt và chống lão hóa đỉnh cao.",
        mota_dai: `Nước thần cao cấp SK-II Facial Treatment Essence chứa tinh chất huyền thoại Pitera...`,
        lienket: "html/chi-tiet.html",
        img: "assets/images/skii.jpg",
        alt: "Nước thần tinh chất dưỡng da SK-II Facial Treatment Essence",
        category: "my-pham"
    },
    {
        id: "28", // Giữ nguyên ID gốc của Armaf
        ten: "Nước hoa Unisex Armaf Club De Nuit Untold",
        gia: "1.350.000đ",
        mota: "Hương thơm đẳng cấp, sang trọng đầy lôi cuốn phù hợp cho cả nam và nữ.",
        mota_dai: `Nước hoa Unisex Armaf Club De Nuit Untold Eau de Parfum...`,
        lienket: "html/chi-tiet.html",
        img: "assets/images/nh.jpg",
        alt: "Nước hoa Unisex Armaf Club De Nuit Untold",
        category: "nuoc-hoa"
    },
    {
        id: "14", // Giữ nguyên ID gốc của Nars
        ten: "Kem nền Nars Natural Radiant Longwear Foundation",
        gia: "1.150.000đ",
        mota: "Kem nền che khuyết điểm cao, mỏng nhẹ và bền màu suốt 16 giờ.",
        mota_dai: `Kem nền cao cấp Nars Natural Radiant Longwear Foundation đột phá...`,
        lienket: "html/chi-tiet.html",
        img: "assets/images/nar.jpg",
        alt: "Kem nền Nars Natural Radiant Longwear Foundation",
        category: "do-trang-diem"
    },
    {
        id: "26", // Giữ nguyên ID gốc của Flamant Rose
        ten: "Nước hoa nữ The Merchant of Venice Flamant Rose",
        gia: "3.500.000đ",
        mota: "Hương thơm quý phái, lãng mạn lấy cảm hứng từ loài chim hồng hạc.",
        mota_dai: `Nước hoa niche xa xỉ The Merchant of Venice Flamant Rose Eau de Parfum...`,
        lienket: "html/chi-tiet.html",
        img: "assets/images/the.jpg",
        alt: "Nước hoa nữ The Merchant of Venice Flamant Rose",
        category: "nuoc-hoa"
    },
    {
        id: "22", // Giữ nguyên ID gốc của CeraVe
        ten: "Sữa rửa mặt dạng gel CeraVe Foaming Cleanser",
        gia: "395.000đ",
        mota: "Sữa rửa mặt tạo bọt dịu nhẹ cho da thường đến da dầu giúp sạch sâu không khô căng.",
        mota_dai: `Sữa rửa mặt cao cấp CeraVe Foaming Cleanser (Dung tích 473ml)...`,
        lienket: "html/chi-tiet.html",
        img: "assets/images/srmcerave.jpg",
        alt: "Sữa rửa mặt dạng gel CeraVe Foaming Cleanser",
        category: "my-pham"
    },
    {
        id: "21", // Giữ nguyên ID gốc của Skin Aqua
        ten: "Kem chống nắng nâng tông Sunplay Skin Aqua Tone Up UV Essence",
        gia: "185.000đ",
        mota: "Chống nắng phổ rộng SPF50+ PA++++ bảo vệ da toàn diện và nâng tông tự nhiên.",
        mota_dai: `Kem chống nắng Sunplay Skin Aqua Tone Up UV Essence SPF50+ PA++++...`,
        lienket: "html/chi-tiet.html",
        img: "assets/images/skinaqua.jpg",
        alt: "Kem chống nắng nâng tông Sunplay Skin Aqua Tone Up UV Essence",
        category: "my-pham"
    },
    {
        id: "18", // Giữ nguyên ID gốc của L'Oreal
        ten: "Nước tẩy trang L'Oreal Paris Micellar Water 3-in-1 Refreshing",
        gia: "175.000đ",
        mota: "L'Oreal Paris Micellar Water 3-in-1 Refreshing",
        mota_dai: `Nước tẩy trang tươi mát L'Oreal Paris Micellar Water 3-in-1 Refreshing...`,
        lienket: "html/chi-tiet.html",
        img: "assets/images/nuoctt.jpg",
        alt: "Nước tẩy trang L'Oreal Paris Micellar Water 3-in-1 Refreshing",
        category: "my-pham"
    },
    {
        id: "24", // Giữ nguyên ID gốc của Lifebuoy
        ten: "Sữa tắm sạch khuẩn Lifebuoy Vitamin+ Bảo Vệ Vượt Trội 10",
        gia: "185.000đ",
        mota: "Sữa tắm hỗ trợ đề kháng da tự nhiên, bảo vệ khỏi 99,9% vi khuẩn.",
        mota_dai: `Sữa tắm Lifebuoy Vitamin+ Bảo Vệ Vượt Trội 10...`,
        lienket: "html/chi-tiet.html",
        img: "assets/images/suatam.jpg",
        alt: "Sữa tắm sạch khuẩn Lifebuoy Vitamin+ Bảo Vệ Vượt Trội 10",
        category: "my-pham"
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
            <img src="${resolveSitePath(obj.img)}" alt="${obj.alt}">
        </div>

        <div class="info">

            <h3>${obj.ten}</h3>

            <p class="price">${obj.gia}</p>

            <p class="desc">${obj.mota}</p>

            <div class="button-group">

                <a href="${resolveSitePath(obj.lienket)}?id=${obj.id}" class="btn-detail">
                    Xem chi tiết
                </a>

                

            </div>

        </div>
    `;

    list.appendChild(item);
}


// ===========================
// HIỂN THỊ DANH SÁCH
// ===========================

function showEmptyState(message = "Không tìm thấy sản phẩm phù hợp.") {
    const list = document.getElementById("list");
    if (!list) return;

    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.innerHTML = `<p>${message}</p>`;
    list.appendChild(emptyState);
}

function loadAllProducts(arr) {

    const list = document.getElementById("list");

    if (!list) return;

    list.innerHTML = "";

    if (!arr || arr.length === 0) {
        showEmptyState();
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
// Hàm applyCategoryFilter để lọc sản phẩm dựa trên danh mục
function applyCategoryFilter(category) {
    if (category === "all") {
        loadAllProducts(product);
    } else {
        const filtered = product.filter(function(item) {
            return item.category === category; 
        });
        loadAllProducts(filtered);
    }
    updateActiveCategoryButton(category); // Cập nhật trạng thái nút danh mục được chọn
}

function initCategoryFilter() { 
    const buttons = document.querySelectorAll(".category-btn"); // Lấy tất cả các nút danh mục
    if (!buttons.length) return; // Bảo vệ code không bị lỗi nếu trang không có thẻ .category-btn

    buttons.forEach(function(button) { // Lặp qua từng nút danh mục
        button.addEventListener("click", function() { // Lắng nghe sự kiện click trên từng nút danh mục
            const category = button.dataset.category;  // Lấy giá trị danh mục từ thuộc tính data-category của nút được click
            applyCategoryFilter(category); // Gọi hàm lọc sản phẩm dựa trên danh mục được chọn
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
        const keyword = searchInput.value.trim().toLowerCase(); // Lấy từ khóa tìm kiếm và chuyển về chữ thường

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