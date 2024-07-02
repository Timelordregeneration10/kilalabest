可用于b站视频制作

用absolute（仅绑定scrollTop和translateY），就不要逆行，因为只有逆行会有卡卡的感觉，垂直和顺行都很丝滑
???verticalNoReverse不需要pointerEventNone???

+ login形式
    + 竖型=>???sticky不生效???
    sticky本身是沿滑动方向垂直附着，所以如果是下滑且竖型则效果差,除非右滑，
    + 横型=>和sticky完美适配，因为scrollTop不影响垂直位移
    + 斜型=>增加rotate，需修改宽高和topleft
- 计算/py获取图片长宽嵌入组合页面，
- 一张一张浮现出来每一张都在画面内，
- window锁屏界面固定时间换一批期间变大，
- clippath的双重反向/多重区块及块内动画