
# notes
* 展现思路、设计可以问ai
* 网站：awwwards网站获取灵感
* 网站获取：问ds要awwwards这样的设计/得到灵感的网站推荐
* ​ai绘图得到素材
+ ​移动端适配​
* lottiefiles 酷炫灵动GIF，svg

# 结构
- 导航栏分顶部导航栏和侧边导航栏，顶部照常，侧边可收起样式重新想
- music，anime放新的about me里面，剩余都应该有具体页面，且首页只放intro

# /RMT
+ 背景纯白svg分段鼠标悬浮随其摇曳，鼠标不在区域则过一段事件自己摇曳<a href="https://www.bilibili.com/video/BV1ZusYeGEfj/">效果</a> => RemArea&RemShelter
- 很多雷姆no background，不一定视差滚动；边角鼠标雷姆GIFs
- dreamle的tutorial, RMTprogress
- 加入世界锚
- Rem cursor!
- live2d Rem
- 手办页（可链接hopi）

# 优化
- 比如展示做过的项目的列表时，要展示项目预览更好的方法可以是鼠标悬浮时在鼠标位置处显示预览，见https://www.jiejoe.com/home的video部分
- 比如想让用户知道点击可以跳转到某个页面，可以在鼠标悬浮时出现一个跟随鼠标的icon
- 换个加载界面，现在的到后面就太卡了，这个页面的模糊感觉不错<a href="https://www.cnblogs.com/lfri/p/12212878.html">链接</a>
- sticky结束处理，参考showmecode
+ 贝塞尔曲线错误使用（如原神启动那个部分）
+ Rem gallery和Rem sticky key重复bug修复
+ 所有导航栏应有阴影防止看不清
+ 导航栏初始显示问题 => 加载动画？看看低网速下加载动画和骨架谁先出来，看看有没有ducument.ejs那样的加载文件 => SSR
+ RMT循环优化，固定RMT个数，实现无缝循环
+ attemptScene重复key修复
+ framer-motion whileInView属性没加单位导致的Invalid keyframe value for property transform: xxx(12.72287)bug修复
+ 香格里拉进游戏的时候那种旋转隧道（第六集13分钟前）特效实现
  + 框的阴影生成方法=>问ds svg阴影=>效果不如box-shadow，顺带一提text-shadow由于不好控制字大小以及难以居中舍弃了
+ 首屏加载页面可以用frontier特效
  + 提示要可以访问github
  + 如果卡的话设置frontier之外的元素加载完之前的visibility => 还是得设置display => 设置display为none的话字体图片什么的就不会加载了草，两难境地 => 根据是否loading控制动画和视频和three的播放
    + 控制视频播放
    + 控制动画播放
    + 控制js动画播放
    + 控制three播放
  + 不知道为什么坑爹的next好像useEffect里面window.onload或者document.onReadyStateChange设置不管用，dev环境永远无法触发window onload或者document readyState为complete的真实，于是天才般的interval每秒检测是否加载完成横空出世完美解决。
+ 性能优化，现在有点卡
  + 根据scrollTop控制动画和视频和three播放
    + 控制视频播放
    + 控制动画播放
    + 控制js动画播放
    + 控制three播放
+ 全放kilalabest网页加载速度影响
  + 新项目外链or全放kilalabest里 => 全放kilalabest也完全没问题，next.js默认支持基于路由的代码拆分，每个页面（包括子页面）会被打包为独立的 JavaScript 文件，仅在用户访问时按需加载
    + 旧项目如attempt和application-gallery需要迁移到新仓库还是现在这样 => 就现在这样
  + 图片放图床还是kilalabest里 => next自带的Image标签优化更胜一筹

# 学习
- ## GSAP (参见fe-study-glitch)
- ## glitch (参见fe-study-glitch)
- ## three-shader => to be continued (参见fe-study-three-shader)- 学完之后看黑洞代码
- ## live2D Rem (参见fe-study-live2D)
- ## jiejoe svg等

# 3D Rem动作

# github图床见知乎收藏
+ cdn加速：jsDelivr 实现方法：
  + 假设图片存储在 GitHub 仓库 https://github.com/用户名/仓库名/blob/main/images/test.jpg。
  + CDN 加速链接格式为：https://cdn.jsdelivr.net/gh/用户名/仓库名@分支名/images/test.jpg
  + （例如：https://cdn.jsdelivr.net/gh/yourname/your-repo@main/images/test.jpg）。
  + 优势：全球 CDN 节点加速，加载速度比直接访问 GitHub 快 2-3 倍。

# 特效
- 电子羊歌词特效复刻<a href="https://www.bilibili.com/video/BV1Bz411q7p7">链接</a>DNA双螺旋黑色背景粉色发光
- 其他wallpaper engine雷姆复刻
？ 闪电的真实姿态（留光连点）
- BV1cAZnY1ETW 0：52的转场，从某层跳到更高的一层

# 个人网站3.0 ❌ => 2.0根本没做完，目前只有首页而已
- 调研typecho
- 2.0的保存
- 内容决定与板块划分
  - 图片：手机相册蕾姆图片之外的相册 => 如果怕丢失就放图床，想展示的好像也只有蕾姆的部分放在手办part就行了 => 不需要图片
  - 博客：记录学习某些东西的过程 => 写在时光序里或者readme里 => 不需要博客
  - about me
  - 歌单我有网易云音乐，番剧我有anilist

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
  - 一些好用的预设：
  - 0.5s+cubic-bezier(0.25,0.75,0.85,1)缓慢跟随
  - 0.5s+cubic-bezier(0.25,1.25,0.25,1.25)快速跟随且有物理惯性
  - 0.2s+cubic-bezier(0.33,1,0.33,1)快速跟随(第二个0.33其实＜1就行)
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
