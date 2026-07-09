

document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const nameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");
    // Lắng nghe sự kiện submit của form
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Ngăn chặn load lại trang
            // Reset tất cả các lỗi trước đó
            resetErrors();
            let isValid = true;
            let firstInvalidInput = null;
            // 1. Kiểm tra Họ và tên
            if (!nameInput.value.trim()) {
                showError(nameInput, "Vui lòng nhập họ và tên của bạn.");
                isValid = false;
                if (!firstInvalidInput) firstInvalidInput = nameInput;
            } else if (nameInput.value.trim().length < 2) {
                showError(nameInput, "Họ và tên phải dài ít nhất 2 ký tự.");
                isValid = false;
                if (!firstInvalidInput) firstInvalidInput = nameInput;
            }
            // 2. Kiểm tra Email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                showError(emailInput, "Vui lòng nhập địa chỉ email.");
                isValid = false;
                if (!firstInvalidInput) firstInvalidInput = emailInput;
            } else if (!emailPattern.test(emailInput.value.trim())) {
                showError(emailInput, "Định dạng email không hợp lệ (ví dụ: name@example.com).");
                isValid = false;
                if (!firstInvalidInput) firstInvalidInput = emailInput;
            }
            // 3. Kiểm tra Số điện thoại
            const phonePattern = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
            if (!phoneInput.value.trim()) {
                showError(phoneInput, "Vui lòng nhập số điện thoại.");
                isValid = false;
                if (!firstInvalidInput) firstInvalidInput = phoneInput;
            } else if (!phonePattern.test(phoneInput.value.trim().replace(/\s/g, ""))) {
                showError(phoneInput, "Số điện thoại không hợp lệ (gồm 10 số, bắt đầu bằng 03, 05, 07, 08 hoặc 09).");
                isValid = false;
                if (!firstInvalidInput) firstInvalidInput = phoneInput;
            }
            // 4. Kiểm tra Lời nhắn
            if (!messageInput.value.trim()) {
                showError(messageInput, "Vui lòng nhập nội dung tin nhắn liên hệ.");
                isValid = false;
                if (!firstInvalidInput) firstInvalidInput = messageInput;
            } else if (messageInput.value.trim().length < 10) {
                showError(messageInput, "Nội dung tin nhắn quá ngắn (ít nhất 10 ký tự).");
                isValid = false;
                if (!firstInvalidInput) firstInvalidInput = messageInput;
            }
            // Nếu có lỗi, tập trung vào ô lỗi đầu tiên và dừng lại
            if (!isValid) {
                if (firstInvalidInput) {
                    firstInvalidInput.focus();
                }
                return;
            }
            // Nếu hợp lệ hoàn toàn -> hiển thị Toast thành công và xóa trắng form
            showToastSuccess(nameInput.value.trim());
            contactForm.reset();
        });
    }
    // Hàm hiển thị lỗi dưới input
    function showError(inputElement, errorMessage) {
        const formGroup = inputElement.closest(".form-group-custom");
        if (formGroup) {
            formGroup.classList.add("has-error");
            const errorElement = formGroup.querySelector(".error-feedback");
            if (errorElement) {
                errorElement.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${errorMessage}`;
            }
        }
    }
    // Hàm reset xóa bỏ trạng thái lỗi
    function resetErrors() {
        const errorGroups = document.querySelectorAll(".form-group-custom.has-error");
        errorGroups.forEach(function (group) {
            group.classList.remove("has-error");
        });
    }
    // Hàm hiển thị Toast thông báo gửi thành công
    function showToastSuccess(senderName) {
        // Tìm hoặc tạo container chứa Toast
        let toastContainer = document.querySelector(".toast-container-custom");
        if (!toastContainer) {
            toastContainer = document.createElement("div");
            toastContainer.className = "toast-container-custom";
            document.body.appendChild(toastContainer);
        }
        // Tạo phần tử Toast mới
        const toast = document.createElement("div");
        toast.className = "toast-custom";
        toast.innerHTML = `
            <div class="toast-icon-custom">
                <i class="fa-solid fa-circle-check"></i>
            </div>
            <div class="toast-body-custom">
                <h5>Gửi liên hệ thành công!</h5>
                <p>Cảm ơn <strong>${senderName}</strong>. Tin nhắn của bạn đã được tiếp nhận thành công. Chúng tôi sẽ liên hệ lại sớm nhất!</p>
            </div>
            <button class="toast-close-custom">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;
        toastContainer.appendChild(toast);
        // Kích hoạt animation hiện ra (thông qua class show)
        setTimeout(() => {
            toast.classList.add("show");
        }, 10);
        // Lắng nghe sự kiện click nút đóng (x)
        const closeBtn = toast.querySelector(".toast-close-custom");
        if (closeBtn) {
            closeBtn.addEventListener("click", function () {
                hideToast(toast);
            });
        }
        // Tự động biến mất sau 5 giây
        const autoHideTimeout = setTimeout(() => {
            hideToast(toast);
        }, 6000);
        function hideToast(toastElement) {
            toastElement.classList.remove("show");
            // Đợi animation chạy xong rồi xóa khỏi DOM
            setTimeout(() => {
                if (toastElement.parentNode) {
                    toastElement.remove();
                }
            }, 400);
            clearTimeout(autoHideTimeout);
        }
    }
    // Thêm hiệu ứng focus mượt mà trên input bằng cách thêm/xóa class
    const inputs = document.querySelectorAll(".form-control-custom");
    inputs.forEach(input => {
        // Khi người dùng bắt đầu sửa lỗi, tự xóa lỗi đỏ của trường đó
        input.addEventListener("input", function() {
            const formGroup = input.closest(".form-group-custom");
            if (formGroup && formGroup.classList.contains("has-error")) {
                formGroup.classList.remove("has-error");
            }
        });
    });
});
