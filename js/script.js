// Biến toàn cục để lưu trữ dữ liệu sản phẩm
let product = [];

function resolveSitePath(path) {
    if (!path || /^(https?:|mailto:|tel:|data:|#|javascript:)/i.test(path)) {
        return path;
    }

    const currentPath = window.location.pathname.replace(/\\/g, "/");
    const isNestedPage = currentPath.includes("/html/");

    if (path.startsWith("./") || path.startsWith("../")) {
        if (path.startsWith("../") && !isNestedPage) {
            return path.replace(/^\.\.\//, "./");
        }
        return path;
    }

    const prefix = isNestedPage ? "../" : "./";
    return prefix + path;
}

async function loadProductsFromJson() {
    try {
        const response = await fetch(resolveSitePath("js/Json.json")); // Đường dẫn đến file JSON chứa dữ liệu sản phẩm
        if (!response.ok) throw new Error("Không thể tải dữ liệu sản phẩm");

        const data = await response.json();// Chuyển đổi dữ liệu JSON thành đối tượng JavaScript
        product = Array.isArray(data) ? data : (data.products || []);// Kiểm tra xem dữ liệu có phải là mảng hay không, nếu không thì lấy thuộc tính "products" nếu có

        if (typeof loadAllProducts === "function") {
            loadAllProducts(product);
        }
        if (typeof initSearch === "function") {
            initSearch();
        }
        if (typeof initCategoryFilter === "function") {
            initCategoryFilter();
        }

        return product;
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
        if (typeof loadAllProducts === "function") {
            loadAllProducts([]);
        }
        return [];
    }
}
// Hàm createItem để tạo một sản phẩm từ đối tượng obj
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
        const filteredProducts = product.filter(function (item) {
            return item.category === category;
        });
        loadAllProducts(filteredProducts);
    }
    updateActiveCategoryButton(category);
}
// Hàm initCategoryFilter để khởi tạo sự kiện cho các nút danh mục
function initCategoryFilter() {
    const buttons = document.querySelectorAll(".category-btn");
    if (!buttons.length) return;

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            applyCategoryFilter(button.dataset.category);
        });
    });
}

// Hàm createItem để tạo một sản phẩm từ đối tượng obj
function createItem(obj) {
    const list = document.getElementById("list"); 
    if (!list) return; // Bảo vệ code không bị lỗi nếu trang không có thẻ #list

    // Tạo phần tử cha chứa sản phẩm bằng cấu trúc lưới của Bootstrap
    const item = document.createElement("div");
    item.setAttribute("class", "col-12 col-sm-6 col-md-3"); 
    
    // Thêm class product-card để ăn theo CSS flexbox làm bằng khung
    item.classList.add("product-card");

    // Sử dụng chuỗi innerHTML sạch, đồng bộ hoàn toàn với stylesanpham.css
    item.innerHTML = `
        <div class="image">
            <img src="${resolveSitePath(obj.img)}" alt="${obj.alt}">
        </div>
        <div class="info">
            <h3>${obj.ten}</h3>
            <p class="price">${obj.gia}</p>
            <p class="desc">${obj.mota}</p>
            <div class="button-group">
                <a href="${resolveSitePath(obj.lienket)}?id=${obj.id}" class="btn-detail">Xem chi tiết</a>
            </div>
        </div>
    `; 

    list.appendChild(item); 
}
        // Hàm loadAllProducts để tạo tất cả các sản phẩm từ mảng objArray
    function showEmptyState(message = "Không tìm thấy sản phẩm phù hợp.") {
    const list = document.getElementById("list");
    if (!list) return;

    const emptyState = document.createElement("div");
    emptyState.className = "col-12 empty-state";
    emptyState.innerHTML = `<p>${message}</p>`;
    list.appendChild(emptyState);
}

function loadAllProducts(objArray) {
        const list = document.getElementById("list");
        if (!list) return;

        list.innerHTML = "";

        if (!objArray || objArray.length === 0) {
            showEmptyState();
            return;
        }

        for(let i = 0; i < objArray.length; i++) {   
            createItem(objArray[i]); 
        }
    }


   // Hàm xử lý tìm kiếm sản phẩm 
    function initSearch() {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const productSection = document.querySelector(".products-section") || document.querySelector(".product");
    // Bảo vệ code không bị lỗi nếu trang không có thẻ #search-input
    if (!searchInput) return;

    searchInput.addEventListener("focus", function () {
        if (productSection) {
            productSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });


    // Hàm thực hiện tìm kiếm sản phẩm dựa trên từ khóa
    function executeSearch() {
        const keyword = searchInput.value.trim().toLowerCase(); // Lấy từ khóa tìm kiếm và chuyển về chữ thường
        if (!keyword) {
            loadAllProducts(product); // Nếu từ khóa rỗng, hiển thị tất cả sản phẩm
            return;
        }
        const activeCategory = document.querySelector(".category-btn.active")?.dataset.category || "all"; // Lấy danh mục đang chọn, mặc định là "all" nếu không có danh mục nào được chọn
        const filteredProducts = product.filter(function (item) { 
            const matchesCategory = activeCategory === "all" || item.category === activeCategory; // Kiểm tra xem sản phẩm có thuộc danh mục đang chọn hay không
            const matchesKeyword = item.ten.toLowerCase().includes(keyword);  // Kiểm tra xem tên sản phẩm có chứa từ khóa tìm kiếm hay không
            return matchesCategory && matchesKeyword; 
        }); 

        loadAllProducts(filteredProducts);
    }


    // Thêm sự kiện khi người dùng nhấn Enter trong ô tìm kiếm
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            executeSearch();
        }
    });

    if (searchBtn) {
        searchBtn.addEventListener("click", function () {
            executeSearch();
        });
    }
}