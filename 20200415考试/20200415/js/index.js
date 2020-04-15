let waterfallModule = (function () {
    //获取每一列
    let columns = Array.from(document.querySelectorAll('.column')),
        _data = [];

    //从后台获取数据
    let queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('get', './json/data.json', false);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                _data = JSON.parse(xhr.responseText);
            };
        };
        xhr.send(null);
    };

    //数据绑定+渲染
    let bindHTML = function bindHTML() {
        //给每个数据做宽高适配
        _data = _data.map(item => {
            let h = item.height / (item.width / 230);
            item.width = 230;
            item.height = h;
            return item;
        });
        //循环数据，每三个数据为一组，然后按照高度进行升序排序
        for (let i = 0; i < _data.length; i += 3) {
            let group = _data.slice(i, i + 3);
            group.sort((a, b) => {
                return a.height - b.height;
            });
            //给每一列按照高度进行降序排序
            columns.sort((a, b) => {
                return b.offsetHeight - a.offsetHeight;
            });
            //把group放到每一列中
            group.forEach((item, index) => {
                let { pic, title, link, height } = item;
                let card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `<a href="${link}">
                                    <div class="lazyImageBox" style="height:${height}px">
                                        <img src="" alt="" data-image="${pic}">
                                    </div>
                                    <p>${title}</p>
                                </a>`;
                columns[index].appendChild(card);
            });
        };

    };

    //延迟加载
    let lazyLoad = function lazyLoad() {
        let lazyImageBoxs = document.querySelectorAll('.lazyImageBox');
        let HTML = document.documentElement;
        [].forEach.call(lazyImageBoxs, item => {
            let isLoad = item.getAttribute('isLoad');
            if (isLoad === 'true') return;
            let A = HTML.clientHeight + HTML.scrollTop,
                B = utils.offset(item).top + item.offsetHeight / 2;
            if (A >= B) {
                lazyLoadImg(item);
            };
        });
    };
    let lazyLoadImg = function lazyLoadImg(item) {
        let img = item.querySelector('img'),
            dataImage = img.getAttribute('data-image'),
            tempImage = new Image;
        tempImage.src = dataImage;
        tempImage.onload = function () {
            img.src = dataImage;
            img.style.opacity = 1;
        };
        img.removeAttribute('data-image');
        tempImage = null;
        item.setAttribute('isLoad', 'true');
    };

    //加载更多
    let isLoad;
    let loadMore = function loadMore() {
        let HTML = document.documentElement;
        let A = HTML.clientHeight * 1.5 + HTML.scrollTop,
            B = HTML.scrollHeight;
        if (A >= B) {
            if (isLoad) return;
            isLoad = true;
            queryData();
            bindHTML();
            lazyLoad();
            isLoad = false;
        };
    };

    return {
        init() {
            queryData();
            bindHTML();
            lazyLoad();
            window.onscroll = function () {
                lazyLoad();
                loadMore();
            };
        }
    }
})();
waterfallModule.init();