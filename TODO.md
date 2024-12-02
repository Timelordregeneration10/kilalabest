# notes
* ​ai绘图得到素材
+ ​移动端适配​
* lottiefiles 酷炫灵动GIF

# three-shader => to be continued (参见fe-study-three-shader)

# 优化
- sticky结束处理，参考showmecode

# 特效
- 其他wallpaper engine雷姆复刻
？ 闪电的真实姿态（留光连点）

# 首屏
- suspense, loading, 随加载渐进显示

# /RMT
+ 背景纯白svg分段鼠标悬浮随其摇曳，鼠标不在区域则过一段事件自己摇曳<a href="https://www.bilibili.com/video/BV1ZusYeGEfj/">效果</a> => RemArea&RemShelter
- 很多雷姆no background，不一定视差滚动；边角鼠标雷姆GIFs
- dreamle的tutorial, RMTprogress
- 加入世界锚
- Rem cursor!

# github图床见知乎收藏

## 鼠标移动过快连锁闪电特效，停留点点星光<a href="https://www.bilibili.com/video/BV15SC2YMEMW">效果</a> ✅
+ canvas简单绘制线条，图形
+ canvas透明顶层展示
+ 鼠标移动过快时绘制图形变大
+ 鼠标慢慢移动时点点星光绘制
+ 连锁闪电绘制 => 类骨龙炮（其实完全不是）
+ 美化与性能调优

## 代码雨复刻 ✅
+ 单数字falling
+ 一串数字越上透明度越低
+ 字符瞬变
+ 性能优化
+ 👑代码雨的真实姿态（本身不动）

## 水波雷姆复刻-Ripple ✅
+ css: 原理：多个div叠在一起，background-fixed，让背景有大有小配合动画慢慢变大延迟依次出现
  + 单纯css实现
  + 加入js点击事件
  + 放入原文：<a href="https://segmentfault.com/a/1190000019132065">链接</a>

## 控制爱心和繁花和导航栏和leaveWeb显示 ✅
## 繁花跟随 ✅
+ mousemove繁花跟随
+ 花随机颜色，大小，(轻微translateXY => 太乱abandoned)
+ 花动画：rotate？
+ 到时间自动消失
+ 节流

## 基于swayleaf的蕾姆保护小游戏-RemShelter ✅
+ leaf类随时间消失
+ 隔一段时间增加leaf类数目
+ leaf类有自己的捕捉触发回调函数，得分或失分
+ 失分类出现预警
+ 不同类hoverareascale不同，backgroundColor也不同
+ 倒计时
+ 分数面板
+ vanish之后array里删除
+ 难度调整
+ UI调整
+ 页面美化 => 系列index方向?
+ 防作弊：禁止缩放，但大屏仍有优势
+ 移动端适配以及提示前往PC端
+ 注意事项
+ 玩法介绍
+ 更多大罪司教
+ 雷姆分数应当与size和scale成反比
+ 更多难度
+ 背景图可能会加载慢，记得压缩
+ 后端/数据库部署了解一下？=> 不了解
+ SEO

## swayleaf ✅
+ useMemo导致的水合失败 => useEffect
+ canvas实现 => 没有transition也没有animation => abandon

# SEO ✅
+ 查看nextjs部署文档，看看何故favicon不显示 => 有说是需要等待，然后google搜索结果是已经有favicon了

# scrollTop新获取路径 ✅
+ useScroll: <a href="https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useScroll/index.ts">vue hook</a>
+ 简而言之：
  + document.scrollingElement.scrollTop（其实大部分情况scrollingElement还是根元素html，也就是下面的documentElement）
  + document.documentElement.scrollTop

# 动画丝滑问题 ✅
+ cubic-bezier完胜，之前有问题不采用认为是dev环境特有的卡顿或者贝塞尔曲线用的不对
+ 研究useSpring => 大部分丝滑动画不需要弹簧物理效果
+ 好用的tiny spring库：<a href="https://github.com/skevy/wobble/blob/develop/demos/1-chat-heads/index.tsx">wobble</a>

# /navi开发 ✅
+ 思考：每个/navi使用崭新主题 => anime，music，game使用iframe失败于是直接外链，RMT压轴蓝毒窝最高杰作，drawing蓝毒窝弃用版，app，att，proj直接外链

# 首屏开发 ✅
+ intro里proj加上链接
+ intro里app加上链接
  + =>系列可以在timelord/kilalabest放个index.html/page.tsx
+ intro里att加上链接
  + =>系列可以在timelord/kilalabest放个index.html/page.tsx
+ game右侧游戏点了没反应=>timelord.cn?to=game
+ drawing右侧链接点了没反应=>timelord.cn?to=maze,drawing
+ 链接对应的页面调成可用）测试数据
+ =>细节待优化如提示是测试环境，如请求失败，如提示账号密码，自己过一遍

## /Drawing ✅
+ sticky

# kilalalayout导航栏改为点击滚动到对应位置 ✅

# 服务端获取文件目录 ❌
- py获取aiyiRems中的图片修改.env实现自动化/middlewire.ts获取json＝＞服务端获取文件目录 => 部署后都打包webp，部署不需要，本地不压缩nextjs自己给你压缩，评价为不如手机相册和电脑壁纸

## 首屏细节 ✅
+ 副标题文案与初见特效↓
+ ​初见transform左右，从下往上，rotateY
+ 文案
​
# 主页只放入口和炫酷特效 ✅
## 可用特效：
+ 背景视频
+ bg-clip-text text-transparent
+ cyberpunkfont
+ 视差滚动
+ three.js-cube=>project
+ three.js-rain=>drawing
+ css3d-立方，<a>hover后立方展开，立方图片为游戏图片
+ css3d-8角16片=>application
+ danmuBG=>attempt
+ 聚焦=>music
+ sticky但是一个有一个空这样就能看见背景了=>anime
+ 雷姆圣经标题=>切割：anime番，drawing画，其他：边框，背景填充
+ 原神启动
- 传送门(炫彩缤纷？仅fixed动画，出现时opacity=0，接下来的内容不展示，门满屏时show，其他组件offset问题用localstorage)(仅炫彩缤纷适合但突兀故非intro用)
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