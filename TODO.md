
# notes 📌
* lottiefiles 酷炫灵动GIF，svg

# 学习 📌
* 可借助AI理解
+ ## GSAP (参见fe-study-GSAP)
  + https://github.com/Timelordregeneration10/GSAP
<!-- - ## glitch (参见fe-study-glitch) -->
- ## three-shader => to be continued (参见fe-study-three-shader)
  - https://github.com/Timelordregeneration10/three
  - shader可以作为一个长期投入的反向，每天掌握一种特效甚至公式之类的
+ ## live2D Rem (参见fe-study-live2D)
  + https://github.com/Timelordregeneration10/live2d
- ## jiejoe svg等
- 网站
  * 网站：awwwards网站获取灵感
    * <a href="https://gsap.com/demos/">gsap demo</a>
    * <a href="https://gsap.com/showcase/">gsap showcase</a>
  * 网站获取：问ds要awwwards这样的设计/得到灵感的网站推荐

# 待实现复刻/特效 📌
- 其他wallpaper engine雷姆复刻
- 闪电的真实姿态（留光连点）<a href="https://www.bilibili.com/video/BV15SC2YMEMW">效果</a>
  - 可能需要three
- 看了 https://wodniack.dev/ 的启发
    - 滚动效果做好了试试无限滚动作为背景，以鼠标滚动作为触发
    - 图片太卡了，文字还可以，参考 https://timelord.cn/RemHB!/2026/test
    - 试试融入swayleaf？
- 阴阳回天op里的同心圆image-clip鲜明border，可以搭配滚动时同心圆异速转动，某一瞬间重合
- BV1w5FKzMEH8 滚动驱动的某位置大图片移动
- 二十面体每个面都是漩涡中间射出激光直击二十面体核心/向外
- 其他pattern里记录的实现
- 3维的旋涡，配合粒子效果？

# 暂时的一个目标: 完成可以分享给jiejoe的网站
- 整体思路
  + 先梳理应该包含哪些部分
  + 将发现的问题转化为TODO
  - 完成TODO
+ 先梳理一下我现在作为一名正式的前端工程师，个人网站需要包含什么
  + 总结之前看到的其他个人网站都有什么
    - Daniel——梦开始的电视机：视差滚动首屏、作品列表、自我介绍、获得奖项、介绍自己接活儿的工作流程、FAQ、contact me
    - 保罗的小窝，……+2：博客类
    - xiaoyangst：纯简约……
    - jiejoe：blur首屏、自我介绍（比较短）、爱好/技能、理念（视觉至上）、作品列表（视频）（点击后跳转到视频 路由）、作品列表（图片）（点击后跳转到图片 路由）、contact me
      - 有一个菜单栏，里面是路由列表，一个路由对应一个详情页，包含了主页、图片、视频、contact me
  + 回顾我当前个人网站都有什么
    - home页：首屏、RMT、项目、application、attempt、歌、番、游戏、画、contact me
  + 确定我的个人网站应该有什么
    - 有详情路由基准
      - 那部分本身内容多，首页仅展示代表性的几个，要看全部就得去详情路由
      - 且有不方便放在主页的特别契合的展示页面（如jiejoe图片里的无限画布）
    - 叙事逻辑
      - 首屏 => about me简单自我介绍 => 最先介绍喜欢蕾蕾 => 喜欢做一些特效 => 爱好相关 => contact me
    - 缺的部分
      - about me
      - 详情路由有无待定
- 具体改动TODO
  - 首页
    + 确定内容（每一块具体的东西）（关注叙事逻辑）
      - 首屏：雷绮罗姆
      - about me：
        - 内容
          ```
          Hi，我是雷绮罗姆，一名爱折腾动效的前端工程师。
          精通 CSS 与 JavaScript，也熟练掌握现代前端工程化框架（如 React/Vue）。我的灵感来源五花八门——从番剧的 OP/ED、优秀网站的交互设计，到生活中的光影与自然律动。
          我相信网页不该只是静态信息的堆砌，所以我总在尝试用代码让界面“活”起来：无论是细腻的视差滚动、流畅的交互动画，还是基于 Three.js 的着色器实验。
          如果你也痴迷于丝滑过渡与令人眼前一亮的视觉体验，那我们一定聊得来！

          Hi, I’m Nicholas Burkhardt , a front-end engineer with a passion for web animations.

          I wield CSS and JavaScript with precision, and I’m equally adept with modern front-end frameworks like React and Vue. My inspiration springs from a kaleidoscope of sources: the opening and ending sequences of anime, the elegant interactions of exceptional websites, and even the subtle dance of light and rhythm found in everyday life.

          To me, a webpage should never be a static pile of information. That’s why I constantly strive to animate interfaces into living experiences—be it through delicate parallax scrolling, fluid interactive animations, or experimental shaders powered by Three.js.

          If you, too, are enchanted by buttery-smooth transitions and visuals that spark delight, we’re bound to hit it off!
          ```
      - RMT：above all，Rem是我唯一的信仰。
        - 后面的具体展开的文字（指已有的）和日记中的蕾蕾定义都视情况配合特效展示
        - RMT部分可以解释什么是RMT， 或许可以参考 https://kprverse.com/about 的效果
      - 作品集部分：先把当前所有的列出来（直接补充特效库）再选取前几个
        - 区分application和attempt的基准：完成度、是否能称为产品
        - application和attempt部分记得加上最近的作品，最近指目前首页还没有的特效
          - application
            - /RMT/RemShelter
            - birthday
            - /application/gallery/Rem
            - ring
            - json-editor
            - 静静的蓝毒窝
            - /attempt/ripple
            - /application/timer
            - /attempt/codeRain/2
            - honeyLemonSoda
            - =============首页展示分界线==============
            - bouncingRem
            - 原神启动
            - sakamoto
            - /application/electronicSheep
            - scoreboard
          - attempt
            - /attempt/sticky
            - frontier
            - /attempt/swayleaf
            - css3d
            - [待完成]GSAP index聚合
            - heyboxLike
            - bilibilitop
            - fontSeries
            - tunnel
            - [待完成]繁花跟随
            - =============首页展示分界线==============
            - threeRem
            - myHappyEngagement
            - mix-blend-mode
            - /attempt/canvas
            - wyyyyAR2025
      - 爱好相关：
        - 番，歌，游戏：链接肯定要放，展示的信息根据特效来
        - 其中歌的话我理解似乎不用太把详细列表展示，而是搞个特效诱导观者点网易云音乐的链接就行，因为要知道我听什么歌直接看个人主页是最快的
        - 然后游戏的话内容方面额外要有b站链接，游戏截图的话根据特效可放可不放
        - 画：选取代表作展示，同时构建详情页（详情页的完成度取决于是否有其他详情页）
      - contact me：内容就是邮箱，QQ，微信，b站id，网易云音乐id
    - 确定特效
      - 4.1: 在学习shader过程中发现还有太多东西没有学到，学习过程中又发现了很多新东西，所以确定特效还是需要等能学的东西全部学了再说，或者是一个边学边确定的过程
      - 当前还需要的特效
        - 首页
          - 方法：先主体效果实现，再局部细节增强
            - 细节比如 首页可以搞点粒子效果、辉光什么的
          - 首屏
            - 背景：KPR的开头那块放大一处，随着滚动慢慢缩小，最后成为页面静态。
              - 略暗
            - 标题：shader模拟background-clip: text，然后再加上古柳12的波动错位效果，然后加shader的涟漪效果
                - 可行性 https://www.qianwen.com/chat/49a9d1534c874796a68cf311022f60fa
                - 涟漪效果看一下 之前提到的 https://moshpro.app/lite/ 这个网站的melt 和 插件分析这个网站的shader https://homunculus.jp/
          - about me
            - 背景：上面最终成为静态的图片，现在开启 鼠标移动强度/滚动速度 决定错位圆周特效的波动强度和错位程度
            - 正文见上
            - 转场去见到application的背景：水、湖中女神背景
          - RMT除了视差滚动还需要的
            - 3D视差滚动
            - RMT部分可以解释什么是RMT
              - 可以参考 https://kprverse.com/about 的效果
              - https://terminal-industries.com/ 这个首字母的特效也不错
          - 作品集列表展示需要的特效，application和attempt各10
            - application: 可以复刻一下seedance2.0制作的湖中女神特效，随着滚动辉光效果在水面出现，然后一张卡牌从湖中出现，再滚动就显示介绍同时卡牌不动（但是可以根据鼠标移动3D缓动），再滚动卡片顶点转为粒子效果消失，滚动过程中前进，滚完进入水中
            - attempt: 水下脊柱螺旋，随滚动旋转，转完之后到水底，清一下尘土，发现平面镶嵌
          - 游戏
            - 内容要有游戏截图、b站链接
            - 加steam库存链接
              - https://steamcommunity.com/profiles/76561199218897932/games/?tab=all
              - 记得说开UU加速器
            - https://247artists.com/ 的正方体紧密排列随着滚动部分飞出的效果很适合展示大量元素
              - 可以创新，比如不是长方体，或者是六边形、三角形、或者任何满足平面镶嵌的东西
            - 飞完发现一个传送门
            - 传送门终点辉光亮度拉满转场下一个场景
          - 番
            - 古柳星系
            - 每个粒子特效对应一部番，评分与大小亮度挂钩
            - 滚动时绕星系一圈
            - 绕完一圈接个转场
          - 歌
            - 简单列一下听歌数据，听了多少时长多少歌之类的，背景放个特效
            - 实在没合适的就这块不要了
          - 画
            - [待定，没找到更好的话]滚动驱动卷轴展开
            - 每幅画也有卷轴效果（进入视野自动）
              - 顺便看一下横向滚动的那个网站他难道是每个画都一个three的scene吗 => 不是，他是img透明了，canvas在下层
            - 且每幅画随鼠标移动3D微动
          - contact me
            - 随便放点特效，比如这种 https://dailycssdesign.com/384/ （再搞个倒影？）
        - section之间的转场
          - 学一下KPR和activetheory
        - 鼠标移动特效
          - 学一下activetheory的光弹
          - 或者dailycss里的有一个鼠标的特效好像
        - 可能会做的详情路由
      + 列出当前好用的特效库
        - 已有的
          - swayleaf
          - 视差滚动
          - 原神启动
          - css3d
          - sticky横向滚动、阻尼滚动
          - 还有一些浅薄的three
        - 记得threeTODO里的
          - 传送门特效
            - 换个配色，前进终点白光应该会好看
          - 瞬光的涟漪
          - 黑洞
            - 可以滚动时让黑洞沿对角线移动、内容部分放在远离黑洞位置
          - 古柳的星系
          - 古柳的球
          - 古柳的圆周错位图片
          - 图片的部分消失
        - 仿一下
          - 完全复刻太难，就学其中简单实用的
          - https://activetheory.net/
            - 鼠标移动光效
            - section之间滚动时的转换特效
            - 列表的螺旋楼梯3D特效
              - 点一下穿越式丝滑进入，进入后滚一下丝滑回来（空间sin波）
              - 列表每一项的文字重叠，边缘时错位
          - https://kprverse.com/
            - 开头那块放大一处，随着滚动慢慢缩小，最后成为页面静态。
            - 鼠标移动3D微动
            - 随着滚动翻转换面
            - 他居然整个都是canvas
              - 视差滚动或许可以换成3D的
      - 一些idea
        - 比如展示做过的项目的列表时，要展示项目预览更好的方法可以是鼠标悬浮时在鼠标位置处显示预览，见https://www.jiejoe.com/home的video部分
        - 比如想让用户知道点击可以跳转到某个页面，可以在鼠标悬浮时出现一个跟随鼠标的icon
    - 实现ing
    - 其他
      - 记得把备案许可证下了
      - 元素启动如果作为application的话需要把背景换成原神启动画面
      - drawing部分不能直接跳到timelord
      - 字体体积太大了，考虑使用不用下载的字体，部分必须使用字体的情况使用工具进行‌提取常用字符‌：通过工具（如font-spider、FontTools）提取页面实际使用的字符集，生成更小的字体文件
      - birthday系列缺了mengqi和刘浩
    - 细节：主要部分完成后多关注细节
      - 一些初见动画，如果上来就是静态界面可能没那么有意思
      - 交互增强，有时候观者不知道可以点击/拖动/滚动
      - 移动端适配
      - 性能问题
    - 最终有无详情页还得看特效够不够，是否适合
  - kilalaLayout
    - 繁花跟随的效果就不要了，单独放在一个页面吧
    - 导航栏的存在感需要更低，观者在使用其他页面时希望看见当前内容，而不是footer或者导航栏？
      - 导航栏可以参考 https://kprverse.com/ 之后用three效果的画全屏肯定更爽，现在一直可以看见的话有些冗余
      - 最后的footer结尾部分可以不是当前这样的纯文字，可以是比如 https://247artists.com/ 的最后的一个3d空间前进动画
    - 离开屏幕页面还可以再优化，现在的感觉有点单调
    - loading页面还可以再优化交互
  - /RMT
    + 背景纯白svg分段鼠标悬浮随其摇曳，鼠标不在区域则过一段事件自己摇曳<a href="https://www.bilibili.com/video/BV1ZusYeGEfj/">效果</a> => RemArea&RemShelter
    - 记得把待施工页删了
    - layout
      - live2d Rem
        + 放置完成
        - 加个开关显示与否
      - Rem cursor!
    - new page
      - 放照片墙式的雷姆图片？无限滚动，虚拟列表，先上传github图床
      - 很多雷姆no background，不一定视差滚动；边角鼠标雷姆GIFs
      - 加入世界锚
      - 手办页（可链接hopi）


# 电子羊歌词特效复刻 ✅
+ <a href="https://www.bilibili.com/video/BV1Bz411q7p7">链接</a>DNA双螺旋黑色背景粉色发光

# 优化 ✅
+ 换个加载界面，现在的到后面就太卡了，这个页面的模糊感觉不错<a href="https://www.cnblogs.com/lfri/p/12212878.html">链接</a>
  + ring解决了
  + loading，以及文字
  + 动画可以用之前小黑盒的那种，变大然后从中间消失
+ sticky结束处理，参考showmecode
  + body神力让fixed成神了，sticky基本推出历史舞台 => 才怪，sticky在版本支持情况下是fixed实现横向滚动的上位存在好吧，详见app\attempt\sticky\thought.md
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


# github图床见知乎收藏 ✅
+ cdn加速：jsDelivr 实现方法：
  + 假设图片存储在 GitHub 仓库 https://github.com/用户名/仓库名/blob/main/images/test.jpg。
  + CDN 加速链接格式为：https://cdn.jsdelivr.net/gh/用户名/仓库名@分支名/images/test.jpg
  + （例如：https://cdn.jsdelivr.net/gh/yourname/your-repo@main/images/test.jpg）。
  + 优势：全球 CDN 节点加速，加载速度比直接访问 GitHub 快 2-3 倍。

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
  - 1s+cubic-bezier(0.33,1,0.33,1)阻尼滚动用过的都说好
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
