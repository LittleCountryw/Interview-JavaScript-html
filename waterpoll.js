<script>
    {/* 
        图片宽度一定的瀑布流
        1.根据屏幕宽度和图片宽度计算列数
        2.初始化高度数组 len为列数 值全为0
        3.遍历imgs 找到数组中最小值的索引和值
        4.对img绝对定位 依据数组信息计算top和left
        5.更新数组
    */}
    $(function () {
        // 获取图片的宽度(200px)
        let imgWidth = $('img').outerWidth(); // 200

        waterfallHandler();

        // 瀑布流处理
        function waterfallHandler() {
            // 获取图片的列数
            let column = parseInt($(window).width() / imgWidth);

            // 高度数组
            let heightArr = [];
            for(let i=0; i<column; i++) {
                heightArr[i] = 0;
            }

            // 遍历所有图片进行定位处理
            $.each($('img'), function (index, item) {
                // 当前元素的高度
                let itemHeight = $(item).outerHeight();
                // 高度数组最小的高度
                let minHeight = Math.min(...heightArr);
                // 高度数组最小的高度的索引
                let minIndex = heightArr.indexOf(minHeight);

                $(item).css({
                    position:'absolute',
                    top: minHeight + 'px',
                    left: minIndex * imgWidth + 'px'
                });

                heightArr[minIndex] += itemHeight;
            });
        }

        // 窗口大小改变
        $(window).resize(function () {
            waterfallHandler();
        });
    });
</script>
//瀑布流的实现 每个item等宽不等高
//维护一个heightArr len为列数 初始化均为0
//遍历图片数组 找到高度数组的最小高度以及最小高度对应的索引 对图片进行绝对定位 top为最小高度 left为索引值*图片宽度 更新高度数组