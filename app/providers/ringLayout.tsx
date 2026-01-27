
interface RingConfig {
  edge: number;
  isRotateX: boolean;
  rotateXorYDeg: number;
  translateZpx: number;
  durationSec: number;
  addStyleId: string;
  size: number;
}

interface GalaxyConfig {
  rotateX: number;
  rotateY: number;
}

interface FlatRingConfig {
  size: number;
  isRotateX: boolean;
  stableRotateXorYDeg: number;
  changingRotateXorYDeg: number;
  translateZpx: number;
  durationSec: number;
  addStyleId: string;
}

interface Pattern {
  ringConfigs: RingConfig[];
  galaxyConfig?: GalaxyConfig;
  stableSize?: number;
}

export function RingLayout({ children }: { children: React.ReactNode }) {

  const patternX: Pattern = {
    ringConfigs: [],
    galaxyConfig: {
      rotateX: 80,
      rotateY: 80,
    },
    stableSize: 150,
  };

  function makeRingConfig() {
    // 创建多层螺旋效果
    const share = 4;
    for (let i = 0; i < share - 1; i++) {
      patternX.ringConfigs.push({
        edge: i % 2 === 1 ? 16 + i * 4 : 30 + i * 4,
        isRotateX: false,
        rotateXorYDeg: (90 / share) * (i + 1),
        translateZpx: 100 + i * 30,
        durationSec: i % 2 === 1 ? 0 + i * 20 : 120 + i * 20,
        addStyleId: `ring-final-${i}`,
        size: 6 + i * 4,
      });
      patternX.ringConfigs.push({
        edge: i % 2 === 1 ? 16 + i * 4 : 30 + i * 4,
        isRotateX: false,
        rotateXorYDeg: (90 / share) * (share * 2 - 1 - i),
        translateZpx: 100 + i * 30,
        durationSec: i % 2 === 1 ? 0 + i * 20 : 60 + i * 20,
        addStyleId: `ring-final-2-${i}`,
        size: 6 + i * 4,
      });
    }
    patternX.ringConfigs.push({
      edge: 16,
      isRotateX: false,
      rotateXorYDeg: (90 / share) * (share * 2 - 1 - 3),
      translateZpx: 100 + 3 * 30,
      durationSec: 40,
      addStyleId: `ring-final-3-${3}`,
      size: 6 + 3 * 4,
    });
    patternX.ringConfigs.push({
      edge: 16,
      isRotateX: false,
      rotateXorYDeg: (90 / share) * (share * 2),
      translateZpx: 100 + 3 * 30,
      durationSec: 40,
      addStyleId: `ring-final-4-${3}`,
      size: 6 + 3 * 4,
    });
    const share2 = 5;
    for (let i = 0; i < share2; i++) {
      patternX.ringConfigs.push({
        edge: 60,
        isRotateX: false,
        rotateXorYDeg: (180 / share2) * i,
        translateZpx: 400,
        durationSec: 500,
        addStyleId: `ring-final-5-${i}`,
        size: 2,
      });
    }
  }
  makeRingConfig();

  const flatRingConfigs: FlatRingConfig[] = patternX.ringConfigs.reduce((acc: FlatRingConfig[], config) => {
    const { edge, isRotateX, rotateXorYDeg, translateZpx, durationSec, addStyleId, size } = config;
    const current: FlatRingConfig[] = [];
    for (let i = 0; i < edge; i++) {
      current.push({
        size,
        isRotateX,
        stableRotateXorYDeg: rotateXorYDeg,
        changingRotateXorYDeg: (360 / edge) * i,
        translateZpx,
        durationSec,
        addStyleId: addStyleId + "-" + i,
      })
    }
    return acc.concat(current);
  }, []);

  const flatStyleConfigs: string = patternX.ringConfigs.reduce((acc: string, config) => {
    const { edge, isRotateX, rotateXorYDeg, translateZpx, addStyleId } = config;
    let current = ``;
    if (isRotateX) {
      for (let i = 0; i < edge; i++) {
        current += `
          @keyframes star-ring-fragment-rotate-${addStyleId}-${i} {
            0% {
              transform: rotateY(${rotateXorYDeg}deg) rotateX(${(360 / edge) * i}deg) translateZ(${translateZpx}px);
            }
            100% {
              transform: rotateY(${rotateXorYDeg}deg) rotateX(${(360 / edge) * i + 360}deg) translateZ(${translateZpx}px);
            }
          }
        `;
      }
    } else {
      for (let i = 0; i < edge; i++) {
        current += `
          @keyframes star-ring-fragment-rotate-${addStyleId}-${i} {
            0% {
              transform: rotateX(${rotateXorYDeg}deg) rotateY(${(360 / edge) * i}deg) translateZ(${translateZpx}px);
            }
            100% {
              transform: rotateX(${rotateXorYDeg}deg) rotateY(${(360 / edge) * i + 360}deg) translateZ(${translateZpx}px);
            }
          }
        `;
      }
    }
    return acc.concat(current);
  }, ``);

  return (
    <>
      <style>{flatStyleConfigs}</style>
      <div className="fixed z-[1000] top-0 left-0 w-screen h-screen bg-black div-loading-content">
        <div className="absolute z-10 top-[8vh] left-0 w-full text-center text-white text-[3.5vmax] font-bold">
          loading...
        </div>
        <div className="absolute bottom-0 right-0 text-[#ffc6ff] text-xs p-4">
          ⚠本网站部署于Github，确保您的网络环境可以正常访问Github⚠
        </div>
        <div
          className="relative w-screen h-screen transform-style-3d"
          style={{
            transform: `rotateY(${patternX.galaxyConfig?.rotateY || 80}deg) rotateX(${patternX.galaxyConfig?.rotateX || 80}deg)`,
            animationPlayState: "paused",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: `calc(50vh - ${(patternX?.stableSize || 300) / 2}px)`,
              left: `calc(50vw - ${(patternX?.stableSize || 300) / 2}px)`,
              width: `${patternX?.stableSize || 300}px`,
              height: `${patternX?.stableSize || 300}px`,
              transformStyle: "preserve-3d",
              backgroundColor: "#ffffff",
              borderRadius: "50%",
              boxShadow: "0px 0px 40px #91bef0",
              transform: `rotateX(-${patternX.galaxyConfig?.rotateX || 80}deg) rotateY(-${patternX.galaxyConfig?.rotateY || 80}deg)`,
            }}
          >
          </div>
          {flatRingConfigs.map((config) => {
            const { isRotateX, stableRotateXorYDeg, changingRotateXorYDeg, translateZpx, durationSec, addStyleId, size } = config;
            return (
              <div
                key={addStyleId}
                className="absolute bg-white [box-shadow:_0px_0px_2px_#91bef0] transform-style-3d will-change-transform"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `calc(50vh - ${size / 2}px)`,
                  left: `calc(50vw - ${size / 2}px)`,
                  transform: isRotateX ? `rotateY(${stableRotateXorYDeg}deg) rotateX(${changingRotateXorYDeg}deg) translateZ(${translateZpx}px)` : `rotateX(${stableRotateXorYDeg}deg) rotateY(${changingRotateXorYDeg}deg) translateZ(${translateZpx}px)`,
                  animation: `star-ring-fragment-rotate-${addStyleId} ${durationSec}s linear infinite`,
                }}
              ></div>
            );
          })}
        </div>
      </div>
      <div className="fixed z-[1001] top-0 left-0 w-screen h-screen div-heyboxInspired">
        <div className="w-0 h-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-0 border-solid border-white rounded-full animate-heyboxInspired" style={{ animationPlayState: "paused" }}></div>
      </div>
      {children}
    </>
  );
}

