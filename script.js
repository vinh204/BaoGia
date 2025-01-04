const products = {
    Facebook: [
        { name: 'Tăng like, cảm xúc', price: 25, minQuantity: 50 },
        { name: 'Tăng bình luận bài viết', price: 100, minQuantity: 10 },
        { name: 'Tăng chia sẻ bài viết', price: 50, minQuantity: 100 },
        { name: 'Tăng like cho bình luận', price: 45, minQuantity: 50 },
        { name: 'Tăng theo dõi trang cá nhân', price: 50, minQuantity: 100 },
        { name: 'Tăng like, theo dõi Fanpage', price: 55, minQuantity: 100 },
        { name: 'Tăng thành viên nhóm', price: 30, minQuantity: 500 },
        { name: 'Tăng lượt xem video', price: 25, minQuantity: 500 },
        { name: 'Tăng lượt xem story', price: 20, minQuantity: 500 },
        { name: 'Tăng mắt xem livestream', price: 6, minQuantity: 50 },
        { name: 'VipLike tháng', price: 50, minQuantity: 50, days: [7, 15, 30, 60] },
    ],
    Intagram: [
        { name: 'Tăng tim bài viết', price: 20, minQuantity: 50 },
        { name: 'Tăng bình luận bài viết', price: 150, minQuantity: 10 },
        { name: 'Tăng theo dõi Intagram', price: 55, minQuantity: 100 },
        { name: 'Tăng lượt xem story', price: 12, minQuantity: 500 },
        { name: 'Tăng lượt xem video', price: 3, minQuantity: 500 },
        { name: 'Tăng mắt xem livestream', price: 5, minQuantity: 50 }
    ],
    TikTok: [
        { name: 'Tăng tim video', price: 30, minQuantity: 100 },
        { name: 'Tăng theo dõi TikTok', price: 60, minQuantity: 50 },
        { name: 'Tăng lượt xem video', price: 3, minQuantity: 1000 },
        { name: 'Tăng bình luận video', price: 250, minQuantity: 10 },
        { name: 'Tăng chia sẻ video', price: 30, minQuantity: 100 },
        { name: 'Tăng lưu video', price: 30, minQuantity: 50 },
        { name: 'Tăng mắt xem livestream', price: 7, minQuantity: 50 }
    ],
    Youtube: [
        { name: 'Tăng like video', price: 70, minQuantity: 100 },
        { name: 'Tăng lượt đăng kí kênh', price: 275, minQuantity: 500 },
        { name: 'Tăng lượt xem', price: 95, minQuantity: 500 },
        { name: 'Tăng bình luận video', price: 450, minQuantity: 5 },
        { name: 'Tăng chia sẻ video', price: 55, minQuantity: 100 },
        { name: 'Tăng mắt xem livestream', price: 6, minQuantity: 50 }
    ],
    Shopee: [
        { name: 'Tăng tim', price: 80, minQuantity: 100 },
        { name: 'Tăng theo dõi', price: 130, minQuantity: 100 },
        { name: 'Tăng mắt xem livestream', price: 9, minQuantity: 50 }
    ]
};

const discountThresholds = [
    { threshold: 200000, rate: 10 },
    { threshold: 500000, rate: 15 },
    { threshold: 1000000, rate: 20 },
];

function updateProducts() {
    const category = document.getElementById('category').value;
    const productSelect = document.getElementById('product');
    productSelect.innerHTML = '<option value="" disabled selected>Chọn dịch vụ</option>';

    products[category].forEach(product => {
        const option = document.createElement('option');
        option.value = product.name;
        option.dataset.price = product.price;
        option.dataset.minQuantity = product.minQuantity;
        option.dataset.days = product.days ? product.days.join(',') : '';
        option.textContent = `${product.name}`;
        productSelect.appendChild(option);
    });

    document.getElementById('price').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('days').style.display = 'none';
    document.getElementById('daysLabel').style.display = 'none';
}

function updateProductDetails() {
    const productSelect = document.getElementById('product');
    const selectedOption = productSelect.options[productSelect.selectedIndex];
    const price = selectedOption.dataset.price;
    const minQuantity = selectedOption.dataset.minQuantity;
    const days = selectedOption.dataset.days;

    document.getElementById('price').value = price;

    const quantityInput = document.getElementById('quantity');
    quantityInput.setAttribute('min', minQuantity);
    quantityInput.setAttribute('placeholder', `Tối thiểu: ${minQuantity}`);

    if (productSelect.value === 'Tăng mắt xem livestream') {
        document.getElementById('minutesLabel').style.display = 'block';
        document.getElementById('minutes').style.display = 'inline';
    } else {
        document.getElementById('minutesLabel').style.display = 'none';
        document.getElementById('minutes').style.display = 'none';
    }

    if (productSelect.value === 'VipLike tháng') {
        document.getElementById('days').style.display = 'inline';
        document.getElementById('daysLabel').style.display = 'block';
        document.getElementById('days').innerHTML = '<option value="" disabled selected>Chọn số ngày</option>';
        const daysArray = [7, 15, 30, 60];
        daysArray.forEach(day => {
            const option = document.createElement('option');
            option.value = day;
            option.textContent = `${day} ngày`;
            document.getElementById('days').appendChild(option);
        });
    } else {
        document.getElementById('days').style.display = 'none';
        document.getElementById('daysLabel').style.display = 'none';
    }
}

function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function calculateTotal() {
    const category = document.getElementById('category').value;
    const product = document.getElementById('product').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
    const days = document.getElementById('days').value;
    const minutes = document.getElementById('minutes').value;


    if (product && quantity && price) {
        const minQuantity = Number(document.getElementById('product').selectedOptions[0].dataset.minQuantity);
         
        if (quantity < minQuantity) {
            document.getElementById('result').innerText = `Số lượng tối thiểu ${product} là ${minQuantity}`;
            return;
        }

        if (product === 'VipLike tháng' && quantity % 50 !== 0) {
            document.getElementById('result').innerText = `Số lượng ${product} phải là bội số của 50: 50, 100, 150...`;
            return;
        }

        document.getElementById('spinner').style.display = 'block';
        document.getElementById('result').innerHTML = '';

        setTimeout(() => {
            let total;
            if (product === 'VipLike tháng') {
                if (!days) {
                    document.getElementById('result').innerText = 'Vui lòng chọn số ngày';
                    document.getElementById('spinner').style.display = 'none';
                    return;
                }
                total = quantity * days * price;
            } else if (product === 'Tăng mắt xem livestream') {
                if (!minutes || minutes % 30 !== 0) {
                    document.getElementById('result').innerText = `Số phút phải là bội số của 30: 30, 60, 90...`;
                    document.getElementById('spinner').style.display = 'none';
                    return;
                }
                total = quantity * minutes * price;
            } else {
                total = quantity * price;
            }

            let discountRate = 0;
            for (const { threshold, rate } of discountThresholds) {
                if (total > threshold) {
                    discountRate = rate;
                }
            }

            const discountAmount = total * (discountRate / 100);
            const finalTotal = total - discountAmount;

            document.getElementById('result').innerHTML = `
                <h2>Kết Quả Báo Giá</h2>
                <p>Nền tảng tăng tương tác: ${category}</p>
                <p>Sản phẩm/Dịch vụ: ${product}</p>
                <p>Số lượng: ${quantity}</p>
                ${product === 'VipLike tháng' ? `<p>Số ngày: ${days}</p>` : ''}
                ${product === 'Tăng mắt xem livestream' ? `<p>Số phút live: ${minutes}</p>` : ''}
                <p>Đơn giá: ${formatNumber(price)} VND</p>
                <p>Giảm giá: ${discountRate > 0 ? discountRate + '%' : 'Chỉ áp dụng đơn hàng có giá trị trên 200.000 VND'}</p>
                ${discountRate > 0 ? `<p><strong>Tiết kiệm được: ${formatNumber(discountAmount)} VND</strong></p>` : ''}
                <p><strong>Tổng giá trị: ${formatNumber(finalTotal)} VND</strong></p>
                <a href="https://zalo.me/0362611907" class="contact-button" target="_blank">Mua dịch vụ</a>
            `;

            document.getElementById('spinner').style.display = 'none';
        }, 1500);
    } else {
        document.getElementById('result').innerText = 'Vui lòng điền đầy đủ thông tin.';
    }
}
