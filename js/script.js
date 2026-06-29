    const product = [
    {
        id: "1",
        ten: "Sữa tắm dưỡng da",
        gia: "180k/1chai",
        mota: "Giúp làn da mềm mịn, hương thơm quyến rũ",
        mota_dai: `Sữa tắm dưỡng da cao cấp chứa các tinh chất từ thiên nhiên và bổ sung Vitamin E. 
        Sản phẩm mang lại những công dụng vượt trội:
        - Giúp làn da mịn màng, cung cấp độ ẩm sâu suốt 24 giờ.
        - Hương thớm quyến rũ, nhẹ nhàng lưu lại trên da sau khi tắm.
        - Phù hợp với mọi loại da, hoàn toàn không gây kích ứng.`,
        lienket: "../html/chi-tiet.html",
        img: "../assets/images/suatam.jpg",
        alt: "Sữa tắm"
    },

    {
        id: "2",
        ten: "Sữa rửa mặt",
        gia: "69k/1chai",
        mota: "Sạch sâu da mặt của bạn mền mịn hơn  ",
        mota_dai: `Sữa rửa mặt tạo bọt dịu nhẹ giúp loại bỏ bụi bẩn, dầu thừa và lớp trang điểm nhẹ:
        - Làm sạch sâu bên trong lỗ chân lông mà không gây cảm giác khô căng.
        - Giúp cân bằng độ pH tự nhiên, nuôi dưỡng cấu trúc da từ sâu bên trong.
        - Sử dụng đều đặn mỗi ngày 2 lần vào buổi sáng và buổi tối để có làn da sáng khỏe.`,
        lienket: "../html/chi-tiet.html",
        img: "../assets/images/suarm.jpg",
        alt: "sữa rửa mặt"
    },
    
    {
        id: "3",
        ten: "Nước tẩy trang",
        gia: "200k/1chai",
        mota: "Tẩy sạch bụi bẩn trên da mặt ",
        mota_dai: `Nước tẩy trang công nghệ Micellar tiên tiến giúp hút sạch cặn trang điểm và bụi mịn PM2.5:
        - Không chứa cồn, không chứa hương liệu nhân tạo, cực kỳ an toàn cho vùng mắt và môi.
        - Giúp lỗ chân lông thông thoáng, ngăn ngừa nguy cơ hình thành mụn ẩn.
        - Mang lại cảm giác tươi mát, ẩm mượt ngay sau khi lau sạch bằng bông tẩy trang.`,
        lienket: "../html/chi-tiet.html",
        img: "../assets/images/nuoctt.jpg",
        alt: "Nước tẩy trang"
    },
    
    {
        id: "4",
        ten: "Nước rửa tay",
        gia: "39k/1chai",
        mota: "Sạch vi khuẩn bám trên tay bạn ",
        mota_dai: `Nước rửa tay diệt khuẩn chuyên dụng giúp bảo vệ sức khỏe cho cả gia đình bạn:
        - Tiêu diệt đến 99.9% vi khuẩn gây hại bám trên bề mặt da tay khi tiếp xúc với môi trường.
        - Chiết xuất nha đam và trà xanh giúp giữ ẩm tốt, không làm bong tróc hay khô ráp da tay.
        - Hương thơm tươi mát giúp khử mùi thức ăn, mùi tanh hải sản vô cùng hiệu quả.`,
        lienket: "../html/chi-tiet.html",
        img: "../assets/images/nuocrt.jpg",
        alt: "Nước rửa tay"
    },
    
    {
        id: "5",
        ten: "Mặt nạ đất sét cocoon ",
        gia: "150k/1 hũ",
        mota: `Giúp da mặt bạn sạch sâu, mịn màng hơn`, 
        mota_dai: `Mặt nạ đất sét Cocoon từ nguồn nguyên liệu thuần chay 100% Việt Nam:
        - Thành phần đất sét trắng giúp hấp thụ dầu thừa, làm sạch các sợi bã nhờn cứng đầu ở vùng mũi.
        - Kết hợp chiết xuất bí đao giúp làm dịu các nốt mụn sưng viêm, hỗ trợ gom cồi mụn nhanh chóng.
        - Cải thiện tình trạng bề mặt da sần sùi, mang lại làn da sáng mịn và đều màu hơn chỉ sau 2 tuần sử dụng.`,
        lienket: "../html/chi-tiet.html",
        img: "../assets/images/matnacocoon.jpg",
        alt: "Mặt nạ đất sét cocoon"
    }
];

        // Hàm createItem để tạo một sản phẩm từ đối tượng obj
        function createItem(obj) {
        const list = document.getElementById("list"); 
        if (!list) return; // Bảo vệ code không bị lỗi nếu trang không có thẻ #list

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
        
        // Tạo các nút "Xem chi tiết" và "Mua ngay"
        const lienket = document.createElement("a");
        lienket.innerHTML = "Xem chi tiết";
        lienket.setAttribute("href", obj.lienket + "?id=" + obj.id); 
        lienket.setAttribute("class", "btn btn-primary text-white"); 

        const mua = document.createElement("a");
        mua.innerHTML = "Mua ngay";
        mua.href="#";
        mua.className="btn btn-success ms-2";
        // Thêm các phần tử vào container_infor
        container_infor.appendChild(ten);
        container_infor.appendChild(gia);
        container_infor.appendChild(mota);
        container_infor.appendChild(lienket);
        container_infor.appendChild(mua);

        item.appendChild(container_image); 
        item.appendChild(container_infor); 

        list.appendChild(item); 
    }

        // Hàm loadAllProducts để tạo tất cả các sản phẩm từ mảng objArray
    function loadAllProducts(objArray) {
        for(let i = 0; i < objArray.length; i++) {   
            createItem(objArray[i]); 
        }
    }

