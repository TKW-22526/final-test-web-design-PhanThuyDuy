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
        alt: "Sữa tắm"
    },

    {
        id: "2",
        ten: "Sữa rửa mặt",
        gia: "69.000đ",
        mota: "Làm sạch sâu, giúp da mềm mịn.",
        mota_dai: `Sữa rửa mặt tạo bọt dịu nhẹ, phù hợp mọi loại da.`,
        lienket: "html/chi-tiet.html",
        img: "assets/images/suarm.jpg",
        alt: "Sữa rửa mặt"
    },

    {
        id: "3",
        ten: "Nước tẩy trang",
        gia: "200.000đ",
        mota: "Làm sạch bụi bẩn và lớp trang điểm.",
        mota_dai: `Nước tẩy trang Micellar giúp làm sạch hiệu quả mà không gây khô da.`,
        lienket: "html/chi-tiet.html",
        img: "assets/images/nuoctt.jpg",
        alt: "Nước tẩy trang"
    },

    {
        id: "4",
        ten: "Nước rửa tay",
        gia: "39.000đ",
        mota: "Diệt khuẩn, bảo vệ đôi tay.",
        mota_dai: `Chiết xuất nha đam giúp giữ ẩm và làm sạch hiệu quả.`,
        lienket: "html/chi-tiet.html",
        img: "assets/images/nuocrt.jpg",
        alt: "Nước rửa tay"
    },

    {
        id: "5",
        ten: "Mặt nạ đất sét Cocoon",
        gia: "150.000đ",
        mota: "Làm sạch sâu, hỗ trợ giảm mụn.",
        mota_dai: `Mặt nạ đất sét Cocoon từ nguyên liệu thuần chay.`,
        lienket: "html/chi-tiet.html",
        img: "assets/images/matnacocoon.jpg",
        alt: "Mặt nạ Cocoon"
    },

    {
        id: "6",
        ten: "Sữa rửa mặt CeraVe",
        gia: "380.000đ",
        mota: "Làm sạch dịu nhẹ cho mọi loại da.",
        mota_dai: `Sữa rửa mặt CeraVe được các bác sĩ da liễu khuyên dùng.`,
        lienket: "html/chi-tiet.html",
        img: "assets/images/srmcerave.jpg",
        alt: "Sữa rửa mặt CeraVe"
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

    arr.forEach(function(item) {

        createItem(item);

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
// Khi DOM được tải xong, hiển thị 4 sản phẩm đầu tiên và khởi tạo chức năng tìm kiếm
document.addEventListener("DOMContentLoaded", function () {
    loadAllProducts(product.slice(0,4));
    initSearch();
}); 