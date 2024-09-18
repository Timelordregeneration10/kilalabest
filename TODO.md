# lottiefiles 酷炫灵动GIF

# 首屏开发
## 首屏细节

# /navi开发
## /navi总体设计
- 每个/navi使用崭新主题
  - /RMT 很多雷姆no background，不一定视差滚动；边角鼠标雷姆GIFs
  - /game 苍翼风未来感
  - 双子座星星坠落闪烁动效


# RMT细节
- 文案

# notes
- ​初见transform左右，从下往上，rotateY
- ​边框装饰
​- bilibilitop鼠标进入区域后左右移动改变横向位置
- ​视差滚动和bilibili都可以加入opacity
- ​ai绘图得到素材
- ​移动端适配​
- 角落核心概念式边框交合*2
- 双底角小挂件/边饰
​
# 主页只放入口和炫酷特效
## 可用特效：
+ 背景视频
+ bg-clip-text text-transparent
+ cyberpunkfont
+ 视差滚动
+ three.js-cube=>project
+ three.js-rain=>drawing
- 雷姆圣经标题=>切割：anime番，drawing画，其他：边框，背景填充
- png轮播(装饰边框)=>anime
------> css3d-立方，<a>hover后立方展开，立方图片为游戏，另一侧核心概念边框交合/echarts散点图=>game
- 弹窗=>attempt
- bilibilitop+danmuBG=>application
- css3d-魔法阵=>music
- 传送门(炫彩缤纷？仅fixed动画，出现时opacity=0，接下来的内容不展示，门满屏时show，其他组件offset问题用localstorage)=>anime
- 原神启动
- telev（非intro用）
- lastdinner（非intro用）
- 背景swipper(非intro用，内存consuming)

# notes ✅
+ ​加载更多=>next自带懒加载
+ ​ico图标用户可用性=>deprecated
+ ​更多雷姆=>RMT
+ ​不要电话
+ ​链接anilist
+ ​第一页为Nicholas no 个人网站（内含类似核心技术边框标签，悬浮（点击（或者settimeout））后魔法阵分裂样分散并显示更多）
​+ 关于视差滚动则需要改成近慢远快来增加透视感
+ ​加入图片懒加载=>next
​+ 生日快乐系列=>application
+ ​clip-path应用（自定义对抗线，传送门预制path，水花，鼠标位置反色圈，clip-path轮播图，所有的出现消失动效都可以clip-path）
+ ​js合并，压缩（打包）=>next
+ ​背景图片等比缩放（比如缩小后手机看到正中央）
+ ​喵斯新图片

# metadata useclient分离 ✅

# navi，navi宽度适配 ✅

# kilalayout彻底完成 ✅
+ 向下滑动丝滑隐藏navi部分 => useState & style & transition
+ 不同宽度隐藏部分的navi高度不同 => useWindow钩子动态获取innerwidth & useEffect & useCallback
+ layout向page传参 => 上下文失败，暂时使用 requestAnimationFrame & localstorage＝＞上下文成功

# 新素材寻找 ✅
+ 每部分bg
+ 仿mihyho首屏video

# new 首屏框架 ✅
+ 光敏癫痫警告
+ 调整视频大小，1024px以下object-cover, 1024px以上object-fill
+ 首屏文案

# RMT ✅
+ 素材添加
+ 动起来

# 新navi ✅
+ 首屏不在navi
+ RMT
+ 项目
+ 测试
+ 应用（生日快乐等非项目）
+ 音乐
+ 番
+ 游戏
+ 画画

# 点按钮tween划到对应scrolltop不在navi ✅

# 视差滚动节流 ✅

# 音乐part ✅