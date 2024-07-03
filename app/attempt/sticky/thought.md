可用于b站视频制作

sticky：取消translateY不丝滑问题,既能滑动，又可以点击

用absolute（仅绑定scrollTop和translateY），就不要逆行，因为只有逆行会有卡卡的感觉，垂直和顺行都很丝滑
<!-- verticalNoReverse不需要pointerEventNone?=>因为absolute外层是relative -->
sticky不生效=>两个坑：sticky元素高度和滚动元素高度相同，h-auto自动填满高度，需要使用h-fit(height: fit-content)

+ login形式的sticky实现
    + 竖型=>实现更复杂，需要改变scrollRef的height，不然根本sticky不起来，结束时会露底，改变麻烦
    + 横型=>实现简单，不需要改变scrollRef的height，但是结束时上面的仍然sticky影响观感
    + 斜型=>增加rotate,需要计算top，挑选合适的height
- 计算/py获取图片长宽嵌入组合页面，
- 一张一张浮现出来每一张都在画面内，
- window锁屏界面固定时间换一批期间变大，
- clippath的双重反向/多重区块及块内动画