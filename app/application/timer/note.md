1. 能否把started和running状态合成一个 => ✅
2. 移动端单击开始暂停双击重置，PC端单击跟随，移动到重置区域则单击重置，本质是mousemove区域判断click事件 => ✅
3. 时间鼠标移动重影特效 => ✅
4. 每过10s时光流逝饭菜依旧美味特效 => ✅
    - 时序：front出现，逐渐变色为behind，front消失
    - 暂停时，设置animation play state
5. 空格暂停/开始 ✅
6. 不加载字体 ✅
7. start/stop和clear铺满各半边，鼠标移动时揭露部分 => 太卡了，遂罢