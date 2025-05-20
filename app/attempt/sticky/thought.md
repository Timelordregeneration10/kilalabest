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

# sticky的局限
依赖scroll容器，如果整个页面只有scroll容器，此时横向滚动所向披靡，但如果滚动容器同级或者上级上下有元素，那么从上滚到下时滚轮不停的话无法进入scroll容器内部，也就无法触发sticky
比如kilalabest.cn的attempt的sticky中，由于滚动容器是w-screen h-screen的那个元素，而footer在滚动容器外，所以滚轮必须停下来且在滚动容器内才能滚动内部的东西
但是反过来说只要整个页面像timelord.cn一样都在box-all这个滚动容器内，那么sticky将非常丝滑地横向滚动，而attempt的sticky没有这么做是因为保持页面的纯净，不应该让全局的footer进入局部的sticky页面
还有关于sticky的一些补充：首先sticky的触发条件是有一个滚动容器，容器内容超出容器高度，然后sticky元素则会在轮到自己的时候黏住，直到极限要超出父元素范围了才走，如果父元素是滚动容器本身，那么轮到sticky之后除非滚完了，都会一直黏住，如果父元素是滚动容器中的一个元素，那么sticky元素抵达这个父元素的边界了就不粘了和父元素一起走了
sticky还有一点局限就是sticky元素要等抵达父元素边界了之后会恢复static，所以attempt里的sticky的horizontal的滚动结束的那里才那么奇怪像是收成了一绺

# body神力
如果一个元素长宽铺满了屏幕，且有fixed属性，那么zindex更小的任何元素都无法滚动，除了body/document.documentElement
那么此时如果把要横向滚动的元素放在fixed的元素里，横向滚动的元素就将可以交互，也就实现了又可以滚又可以交互
但是sticky的情况并不承认body是滚动元素

# fixed于是成神