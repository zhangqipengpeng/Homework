let shopModule = (function () {
    //获取元素
    let navList = document.querySelectorAll('.navbar-nav .nav-item'),
        productBox = document.querySelector('.productBox'),
        cardList = null,
        data = null;

    //获取数据
    let queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('get', './json/product.json', false);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
            };
        };
        xhr.send(null);
    };

    //数据绑定+渲染
    let bindHTML = function bindHTML() {
        let str = ``;
        data.forEach(item => {
            let { title, price, time, hot, img } = item;
            str += `<div class="card" data-price='${price}' data-time='${time}' data-hot='${hot}'>
            <img src="${img}"
                class="card-img-top" alt="">
            <a class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">价格：￥${price.toFixed(2)}</p>
                <p class="card-text">销量：${hot}</p>
                <p class="card-text">时间：${time}</p>
            </a>
        </div>`;
        });
        productBox.innerHTML = str;
        cardList = productBox.querySelectorAll('.card');
        cardList = [...cardList]
    };

    //给盒子根据数据排序
    let sortCard = function sortCard(i) {
        let char = 'data-price';
        i === 1 ? char = 'data-time' : null;
        i === 2 ? char = 'data-hot' : null;
        cardList.sort((a, b) => {
            a = a.getAttribute(char);
            b = b.getAttribute(char);
            if (char === 'data-time') {
                a = a.replace(/-/g, '');
                b = b.replace(/-/g, '');
            };
            return (a - b) * this.flag;
        });
        for (let j = 0; j < cardList.length; j++) {
            let item = cardList[j];
            productBox.appendChild(item);
        }
    };

    //每点击一次按钮，其它按钮恢复默认值
    let clear = function clear() {
        [].forEach.call(navList, item => {
            if (item !== this) {
                item.flag = -1;
            };
        });
    };

    //点击事件绑定
    let click = function click() {
        [].forEach.call(navList, (item, index) => {
            item.flag = -1;
            item.onclick = function () {
                clear.call(this);
                this.flag *= -1;
                sortCard.call(this, index)
            };
        });
    };















    return {
        init() {
            queryData();
            bindHTML();
            click();
        }
    }
})();
shopModule.init();