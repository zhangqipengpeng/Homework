let bannerModule = (function () {
    let $container = $('.container'),
        $wrapper = $container.find('.wrapper'),
        $changeLeft = $container.find('.changeLeft'),
        $changeRight = $container.find('.changeRight'),
        $pagenition = $container.find('.pagenition'),
        $pagenitionList = $pagenition.find('li');
    let step = 0,
        autoTimer = null,
        interval = 1000;
    //自动轮播
    function autoMove() {
        step++;
        if (step >= 5) {
            $wrapper.css('left', 0);
            step = 1;
        }
        $wrapper.stop().animate({
            left: -step * 1200
        }, 300)
        //自动焦点对齐
        autoFocus();
    };
    //自动对焦
    function autoFocus() {
        let temp = step;
        temp === 4 ? temp = 0 : null;
        $pagenitionList.each((index, item) => {
            let $item = $(item);
            if (index === temp) {
                $item.addClass('active');
                return;
            };
            $item.removeClass('active');
        });
    };

    function handlePagenition() {
        $pagenitionList.click(function () {
            let index = $(this).index();
            step = index;
            $wrapper.stop().animate({
                left: -step * 1200
            }, 300);
            autoFocus();
        });
    };

    function handleArrow() {
        //右按钮
        $changeRight.click(autoMove);
        //左按钮
        $changeLeft.click(function () {
            step--;
            if (step < 0) {
                $wrapper.css('left', -4 * 1200);
                step = 3;
            };
            $wrapper.stop().animate({
                left: -step * 1200
            }, 300)
            //自动焦点对齐
            autoFocus();
        })
    };

    return {
        init() {
            autoTimer = setInterval(autoMove, interval);
            //控制自动轮播的暂停和开始
            $container.on('mouseenter', () => clearInterval(autoTimer))
                .on('mouseleave', () => autoTimer = setInterval(autoMove, interval));
            //焦点点击
            handlePagenition();
            //按钮点击
            handleArrow();

        }
    }
})();
bannerModule.init();























/* let $container = $('.container'),
    $wrapper = $container.children('.wrapper');
let timer = null,
    step = 0;
function autoMove() {
    step++;
    if (step >= 5) {
        $wrapper.css('left', 0);
        step = 1;
    }
    $wrapper.stop().animate({
        left: -step * 1200
    }, 300);
};
timer = setInterval(autoMove, 1000); */