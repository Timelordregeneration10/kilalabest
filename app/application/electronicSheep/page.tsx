/** genAI_main_start */
'use client';

import useScroll from '@/app/hooks/useScroll';
import useWindow from '@/app/hooks/useWindow';

// 示例歌词数据
const lyrics = [
  "是否能梦到电子羊ay",
  "When I can catch that bio sheep",
  "漂浮在霓虹的海洋ay",
  "When I can let that sheep grab ay",
  "街边的鸣笛像在开派对",
  "电流在我脑中作祟",
  "掀起被子和天气配对",
  "天气很差心情节节败退",
  "这城市没有白天",
  "黑夜中升起工业的白烟",
  "萦绕在光怪的城市给那破败的程序带来寂寞又升起狼烟",
  "人们从不正眼看我",
  "他们沉浸在这低端生活",
  "我的任务是帮他们排解寂寞",
  "但谁又能来铺平我的颠簸",
  "I have no mouth but I still wanna scream",
  "无声狂啸众人却皆是醉",
  "I am like a mouse though I dont wanna get into cats stomach casually ay",
  "呼吸 我来到这片街道",
  "雾气 是工业的毒药",
  "I ain't got drunk",
  "钢筋散发的香薰进入我的肺",
  "My feelings got fake",
  "温暖肌肤没有知觉",
  "数字充斥着我的视觉",
  "却期望在梦里面",
  "和那梦不到的 电子羊相见",
  "是否能梦到电子羊ay",
  "When I can catch that bio sheep",
  "漂浮在霓虹的海洋ay",
  "When I can let that sheep grab ay",
  "是否能梦到电子羊ay",
  "When I can catch that bio sheep",
  "漂浮在霓虹的海洋ay",
  "When I can let that sheep grab ay",
  "从未听到过人们说过再见",
  "唯能爱恋身上缠绕着的电线",
  "就算摔倒我也不能流出血",
  "只能低头看着洒落的营养液",
  "会呼吸的街道人流涌动",
  "无法呼吸的我想要伸手触碰",
  "眼前浮窗却提醒我请勿触碰",
  "身体像是八百吨的负重 error",
  "I GOT RICHES IN MY MIND",
  "I GOT NOTHING IN MY MIND",
  "I GOT PLEASURE SORROW ANGER JOYS PASSIONS IN MY MIND",
  "Nobody cares",
  "停留 都是无谓的挣扎",
  "爆发着将那爱恋着的拔下",
  "街道很冰感觉像是回了家",
  "希望电子羊不会嫌弃我的邋遢",
  "是否能梦到电子羊ay",
  "When I can catch that bio sheep",
  "漂浮在霓虹的海洋ay",
  "When I can let that sheep grab ay",
  "是否能梦到电子羊ay",
  "When I can catch that bio sheep",
  "漂浮在霓虹的海洋ay",
  "When I can let that sheep grab ay",
  "漂浮在霓虹的海洋ay",
  "When I can let that sheep grab ay",
];

// 每行歌词的高度(vh单位)
const LINE_HEIGHT_VH = 12;

export default function ElectronicSheepPage() {
  const { scrollTop } = useScroll();
  const { height: windowHeight } = useWindow();

  // 计算容器总高度: 上padding(100vh) + 歌词总高度 + 下padding(100vh)
  const totalHeightVH = 100 + lyrics.length * LINE_HEIGHT_VH + 100;

  // 计算每行歌词的状态
  const getLyricState = (index: number) => {
    if (windowHeight === 0) return { rotateY: 0, translateZ: 0, brightness: 0 };

    // 计算该行歌词在容器中的理论位置(vh单位)
    const lyricPositionVH = 100 + index * LINE_HEIGHT_VH + LINE_HEIGHT_VH / 2;

    // 将vh转换为px
    const lyricPositionPx = (lyricPositionVH / 100) * windowHeight;

    // 计算该行歌词当前在视口中的位置
    const currentPositionInViewport = lyricPositionPx - scrollTop;

    // 视口中心位置(px)
    const viewportCenterPx = windowHeight / 2;

    // 计算距离视口中心的距离
    const distanceFromCenter = currentPositionInViewport - viewportCenterPx;

    // 最大距离(用于归一化)
    const maxDistance = windowHeight / 2;

    // 归一化距离 (-1 到 1)
    const normalizedDistance = Math.max(-1, Math.min(1, distanceFromCenter / maxDistance));

    // 计算rotateY: 越靠近中心越接近0度,远离中心最多旋转45度
    const rotateY = normalizedDistance * 90;

    // 计算translateZ: 越靠近中心越突出
    const translateZ = (1 - Math.abs(normalizedDistance)) * 100;

    // 计算亮度: 越靠近中心越亮 (0-1)
    const brightness = Math.max(0, 1 - Math.abs(normalizedDistance));

    return { rotateY, translateZ, brightness };
  };

  return (
    <div
      className="relative overflow-x-hidden"
      style={{
        height: `${totalHeightVH}vh`,
        background: 'linear-gradient(to bottom, #000000, #0a0a1a, #000000)',
      }}
    >
      <div
        className="flex flex-col"
        style={{
          paddingTop: '100vh',
          paddingBottom: '100vh',
        }}
      >
        {lyrics.map((line, index) => {
          const state = getLyricState(index);
          const shadowBlur = state.brightness * 3;

          return (
            <div
              key={index}
              className="text-[2.5rem] md:text-[1.8rem] sm:text-[1.4rem] font-semibold text-white text-center px-4 md:px-4 sm:px-3 mx-auto max-w-[800px] transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.33,1)] tracking-wide leading-relaxed antialiased"
              style={{
                height: `${LINE_HEIGHT_VH}vh`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `rotateY(${state.rotateY}deg) translateZ(${state.translateZ}px)`,
                textShadow: `0 0 ${shadowBlur}px rgba(0, 255, 255, ${state.brightness})`,
                opacity: 0.3 + state.brightness * 0.7,
                willChange: 'transform, opacity',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
              }}
            >
              {line || '\u00A0'}
            </div>
          );
        })}
      </div>

      {/* 中心指示线 */}
      <div
        className="fixed top-1/2 left-0 right-0 h-[2px] pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(0, 255, 255, 0.3) 20%, rgba(0, 255, 255, 0.6) 50%, rgba(0, 255, 255, 0.3) 80%, transparent)',
        }}
      />
      
      {/* 网易云音乐播放器 */}
      <iframe
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20"
        style={{
          border: 'none',
          width: '330px',
          height: '86px',
        }}
        src="//music.163.com/outchain/player?type=2&id=1448284210&auto=1&loop=1&height=66"
        title="网易云音乐播放器"
        allow="autoplay"
      />
    </div>
  );
}
/** genAI_main_end */

