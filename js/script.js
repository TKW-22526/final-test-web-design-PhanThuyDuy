// Biến toàn cục để lưu trữ dữ liệu sản phẩm
let product = [];

async function loadProductsFromJson() {
    try {
        const response = await fetch("../js/Json.json"); // Đường dẫn đến file JSON chứa dữ liệu sản phẩm
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

        // Tạo phần tử cha chứa sản phẩm
        const item = document.createElement("div");
        item.setAttribute("class","col-12 col-sm-6 col-lg-4"); 
        item.innerHTML = "";
        item.classList.add("product-card");
        // Tạo phần tử chứa hình ảnh
        const container_image = document.createElement("div"); 
        container_image.setAttribute("class", "image text-center mb-3");

        const img = document.createElement("img");
        img.setAttribute("src", obj.img);
        img.setAttribute("alt", obj.alt);
        img.setAttribute("style","width:100%;height:220px;object-fit:contain;");
        img.setAttribute("class", "rounded");

        container_image.appendChild(img);
        
        // Tạo phần tử chứa thông tin sản phẩm
        const container_infor = document.createElement("div");
        container_infor.setAttribute("class", "info text-center");

        const ten = document.createElement("p");
        ten.setAttribute("class", "fw-bold text-success mb-1");
        ten.innerHTML = obj.ten; 

        const gia = document.createElement("p");
        gia.setAttribute("class", "text-danger fw-bold mb-1");
        gia.innerHTML = obj.gia;

        const mota = document.createElement("p");
        mota.setAttribute("class", "text-muted small mb-2");
        mota.innerHTML = obj.mota; 
        
        // Tạo các nút "Xem chi tiết" 
        const lienket = document.createElement("a");
        lienket.innerHTML = "Xem chi tiết";
        lienket.setAttribute("href", obj.lienket + "?id=" + obj.id); 
        lienket.setAttribute("class", "btn btn-primary text-white"); 

    
        // Thêm các phần tử vào container_infor
        container_infor.appendChild(ten);
        container_infor.appendChild(gia);
        container_infor.appendChild(mota);
        container_infor.appendChild(lienket);
        
        item.appendChild(container_image); 
        item.appendChild(container_infor); 

        list.appendChild(item); 
    }

        // Hàm loadAllProducts để tạo tất cả các sản phẩm từ mảng objArray
    function loadAllProducts(objArray) {
        const list = document.getElementById("list");
        if (!list) return;

        list.innerHTML = "";
// Nếu không có sản phẩm nào thỏa mãn, hiển thị thông báo "Không tìm thấy sản phẩm phù hợp."
        if (!objArray || objArray.length === 0) {
            const emptyState = document.createElement("div");
            emptyState.className = "col-12 empty-state";
            emptyState.innerHTML = "<p>Không tìm thấy sản phẩm phù hợp.</p>";
            list.appendChild(emptyState);
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
        const keyword = searchInput.value.trim().toLowerCase();
        const filteredProducts = product.filter(function (item) {
            return item.ten.toLowerCase().includes(keyword);
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