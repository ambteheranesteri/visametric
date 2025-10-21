/* ======================================================= */
/* === SCRIPT.JS: Logic for Barcode and Button Toggling === */
/* ======================================================= */

document.addEventListener('DOMContentLoaded', () => {
    // 1. شبیه سازی داده‌های نظرسنجی شده (از data.json)
    const MOCK_DATA = {
        // اینها بارکدهای صحیح و مورد تأیید هستند
        valid_barcodes: [
            "12345678",
            "87654321",
            "99887766",
            "74273411" 
        ],
        // لینک هدایت در صورت موفقیت
        redirect_link: "https://visametric-iran.com/application-status/details"
    };

    // 2. انتخاب المان‌های مورد نیاز با استفاده از ID
    const trackingForm = document.getElementById('tracking-form');
    const barcodeInput = document.getElementById('barcode');
    // const captchaInput = document.getElementById('captcha-input'); // دیگر نیازی به این نیست
    const searchButton = document.getElementById('search-button');
    // const captchaCodeElement = document.getElementById('captcha-code'); // دیگر نیازی به این نیست
    const barcodeError = document.getElementById('barcode-error');

    // 3. تابع اصلی برای به‌روزرسانی وضعیت دکمه جستجو
    const updateSearchButtonState = () => {
        const barcodeValue = barcodeInput.value.trim();
        
        const isBarcodeValidFormat = barcodeValue.length === 8;
        const isBarcodeInDatabase = MOCK_DATA.valid_barcodes.includes(barcodeValue);
        
        // منطق نمایش پیام خطا
        if (isBarcodeValidFormat && !isBarcodeInDatabase) {
            barcodeError.style.display = 'block'; // بارکد ۸ رقمی است اما معتبر نیست
        } else {
            barcodeError.style.display = 'none';
        }

        // فعال‌سازی دکمه
        // دکمه فقط در صورتی فعال می‌شود که: بارکد مطابقت داشته باشد. (بررسی کپچا حذف شد)
        if (isBarcodeInDatabase) {
            searchButton.disabled = false;
            searchButton.style.backgroundColor = '#5f9087'; 
        } else {
            searchButton.disabled = true;
            searchButton.style.backgroundColor = '#6c7a89'; 
        }
    };

    // 4. گوش دادن به تغییرات فیلد بارکد (فقط بارکد نیاز به نظارت دارد)
    barcodeInput.addEventListener('input', updateSearchButtonState);
    // captchaInput.addEventListener('input', updateSearchButtonState); // حذف شد

    // 5. مدیریت ارسال فرم برای هدایت به لینک مورد نظر
    trackingForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        if (!searchButton.disabled) {
            window.location.href = MOCK_DATA.redirect_link;
        }
    });

    // اطمینان از غیرفعال بودن دکمه هنگام بارگذاری اولیه صفحه
    updateSearchButtonState();
});
