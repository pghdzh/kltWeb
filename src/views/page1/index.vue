<template>
  <main class="home">
    <canvas ref="canvasEl" class="rose-canvas"></canvas>
    <!-- 背景轮播放在最底层 -->
    <div class="carousel carousel1">
      <img
        v-for="(src, idx) in randomFive"
        :key="idx"
        :src="src"
        class="carousel-image"
        :class="{ active: idx === currentIndex }"
      />
    </div>
    <div class="carousel carousel2">
      <img
        v-for="(src, idx) in randomFive2"
        :key="idx"
        :src="src"
        class="carousel-image"
        :class="{ active: idx === currentIndex }"
      />
    </div>
    <section class="center" role="main">
      <h1 class="title">生死相随 · 珂莱塔</h1>

      <div class="subtitle" aria-live="polite">
        <span class="typed">{{ typed }}</span
        ><span class="cursor" aria-hidden="true">|</span>
      </div>
    </section>

    <footer class="site-footer" role="contentinfo">
      <div class="foot-inner">
        <div class="left">© 珂莱塔设定集</div>
        <div class="right">设计：霜落天亦 · 2025</div>
      </div>
    </footer>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import violet from "@/assets/violet.png";

const canvasEl = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D;
let animationId: number;
let lastTime = 0;
let elapsed = 0;

interface Rose {
  baseX: number;
  y: number;
  size: number;
  speed: number;
  swayAmp: number;
  swayFreq: number;
  phase: number;
  angle: number;
  angularSpeed: number;
}

const roses: Rose[] = [];
const ROSE_COUNT_DESKTOP = 20;
const ROSE_COUNT_MOBILE = 8;
const ROSE_IMG = new Image();
ROSE_IMG.src = violet;

function initRoses(count: number) {
  roses.length = 0;
  const canvas = canvasEl.value!;
  const w = canvas.width / (window.devicePixelRatio || 1);
  const h = canvas.height / (window.devicePixelRatio || 1);

  for (let i = 0; i < count; i++) {
    const baseX = Math.random() * w;
    roses.push({
      baseX,
      y: Math.random() * -h,
      size: 60 + Math.random() * 40,
      speed: 10 + Math.random() * 40,
      swayAmp: 20 + Math.random() * 20,
      swayFreq: 0.5 + Math.random() * 1,
      phase: Math.random() * Math.PI * 2,
      angle: Math.random() * Math.PI * 2,
      angularSpeed: (Math.random() - 0.5) * 2,
    });
  }
  elapsed = 0;
}

let resizeTimeout: number;
function resizeCanvas() {
  window.clearTimeout(resizeTimeout);
  resizeTimeout = window.setTimeout(() => {
    cancelAnimationFrame(animationId);
    const canvas = canvasEl.value!;
    const parent = canvas.parentElement!;
    const dpr = window.devicePixelRatio || 1;
    const w = parent.clientWidth;
    const h = parent.clientHeight;

    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.width = w * dpr;
    canvas.height = h * dpr;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const isMobile = w < 768;
    initRoses(isMobile ? ROSE_COUNT_MOBILE : ROSE_COUNT_DESKTOP);
    lastTime = 0;
    animationId = requestAnimationFrame(tickCanvas);
  }, 200);
}

function tickCanvas(now: number) {
  if (!lastTime) lastTime = now;
  const dt = (now - lastTime) / 1000;
  lastTime = now;
  elapsed += dt;

  const canvas = canvasEl.value!;
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;

  ctx.clearRect(0, 0, w, h);

  roses.forEach((r) => {
    r.y += r.speed * dt;
    const sway = r.swayAmp * Math.sin(r.phase + elapsed * r.swayFreq);
    const x = r.baseX + sway;
    r.angle += r.angularSpeed * dt;

    if (r.y > h + r.size) {
      r.y = -r.size;
      r.baseX = Math.random() * w;
      r.phase = Math.random() * Math.PI * 2;
    }

    if (x > w + r.size || x < -r.size) return;

    // 计算透明度
    const alpha = 1 - (r.y / h) * 0.5;
    // 限制 alpha 在 [0,1] 之间（可选）
    const clampedAlpha = Math.max(0, Math.min(1, alpha));
    ctx.save();
    ctx.globalAlpha = clampedAlpha;
    ctx.translate(x, r.y);
    ctx.rotate(r.angle);
    ctx.drawImage(ROSE_IMG, -r.size / 2, -r.size / 2, r.size, r.size);
    ctx.restore();
  });

  animationId = requestAnimationFrame(tickCanvas);
}

// 固定要循环的副标题句子（写死）
const lines = [
  "一颗“宝石”的绽放，一场生命的凋零",
  "美或死，璀璨即凋零",
  "寂与亡，衰败亦新生",
  "切步、向前，此为优雅的进行式",
  "以旧雨，为颂赞的苦酒",
  "敬昨夜、今日和彼时彼刻",
  "我依然故我，于终幕之上",
];

const typed = ref("");
let lineIndex = 0;
let charIndex = 0;
let deleting = false;
let timer: number | null = null;

const TYPING = 200; // 打字速度（ms/字符）
const DELETING = 35; // 删除速度
const PAUSE = 1000; // 完成后停留时间

function tick() {
  const cur = lines[lineIndex];
  if (!deleting) {
    typed.value = cur.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex >= cur.length) {
      timer = window.setTimeout(() => {
        deleting = true;
        tick();
      }, PAUSE);
      return;
    }
    timer = window.setTimeout(tick, TYPING);
  } else {
    typed.value = cur.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex <= 0) {
      deleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
      timer = window.setTimeout(tick, 300);
      return;
    }
    timer = window.setTimeout(tick, DELETING);
  }
}

// 1. 全量导入横图，直接映射成 string[]
const modules = import.meta.glob("@/assets/images1/*.{jpg,png,jpeg,webp}", {
  eager: true,
});
const allSrcs: string[] = Object.values(modules).map((mod: any) => mod.default);

// 1. 全量导入竖图，直接映射成 string[]
const modules2 = import.meta.glob("@/assets/images2/*.{jpg,png,jpeg,webp}", {
  eager: true,
});
const allSrcs2: string[] = Object.values(modules2).map(
  (mod: any) => mod.default
);

// 2. 洗牌并取 5 张
function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const randomFive = ref<string[]>(shuffle(allSrcs).slice(0, 5));
const randomFive2 = ref<string[]>(shuffle(allSrcs2).slice(0, 5));

const currentIndex = ref(0);
let Imgtimer: number;

onMounted(() => {
  timer = window.setTimeout(tick, 500);
  Imgtimer = window.setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % 5;
  }, 5000);

  const canvas = canvasEl.value!;
  ctx = canvas.getContext("2d")!;

  ROSE_IMG.onload = () => {
    resizeCanvas();
  };
  window.addEventListener("resize", resizeCanvas);
});

onBeforeUnmount(() => {
  clearInterval(Imgtimer);
  if (timer) window.clearTimeout(timer);

  cancelAnimationFrame(animationId);
  window.removeEventListener("resize", resizeCanvas);
});
</script>

<style lang="scss" scoped>
/* ===== 珂莱塔风格设计系统 ===== */
$color-void: #05060a;
$color-deep-space: #0a0c1a;
$color-nebula: #1a1b3a;
$color-ice-blue: #bff7ff;
$color-neon-pink: #ff66c4;
$color-violet: #7a39ff;
$color-holo-teal: #00ffc3;
$color-executor-red: #ff2a6d;
$color-text-primary: #eef6fb;
$color-text-secondary: #b0c8e0;
$color-text-dim: #6d8ba3;

$glow-blue: 0 0 20px rgba($color-ice-blue, 0.5);
$glow-pink: 0 0 20px rgba($color-neon-pink, 0.4);
$glow-violet: 0 0 25px rgba($color-violet, 0.3);

/* ===== 全局样式重构 ===== */
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: radial-gradient(
      ellipse at 30% 20%,
      rgba($color-nebula, 0.8) 0%,
      transparent 60%
    ),
    radial-gradient(
      circle at 80% 90%,
      rgba($color-violet, 0.15) 0%,
      transparent 40%
    ),
    $color-void;
  color: $color-text-primary;
  font-family: "Inter", "Segoe UI", system-ui, -apple-system, sans-serif;
  position: relative;
  overflow: hidden;

  /* 新增：动态频率网格背景 */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: linear-gradient(
        rgba($color-ice-blue, 0.03) 1px,
        transparent 1px
      ),
      linear-gradient(90deg, rgba($color-ice-blue, 0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    animation: grid-shift 40s linear infinite;
    z-index: 0;
    opacity: 0.4;
  }

  /* 新增：角落辉光 */
  &::after {
    content: "";
    position: absolute;
    top: -200px;
    right: -200px;
    width: 500px;
    height: 500px;
    background: radial-gradient(
      circle,
      rgba($color-neon-pink, 0.08) 0%,
      transparent 60%
    );
    filter: blur(60px);
    z-index: 0;
    pointer-events: none;
  }
}

/* ===== Canvas玫瑰粒子优化 ===== */
.rose-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;

  /* 新增：Canvas辉光叠加 */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 50% 50%,
      transparent 30%,
      rgba($color-void, 0.7) 70%
    );
    pointer-events: none;
  }
}

/* ===== 背景轮播重构 ===== */
.carousel {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;

  /* 替换原遮罩层 */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba($color-void, 0.15) 0%,
      rgba($color-void, 0.24) 50%,
      rgba($color-void, 0.35) 100%
    );
    z-index: 2;
    pointer-events: none;
  }

  .carousel-image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    filter: blur(1.5px) contrast(1.1) saturate(1.2);
    transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
    transform: scale(1.02);

    /* 新增：图片边框辉光 */
    &::after {
      content: "";
      position: absolute;
      inset: -1px;
      border: 1px solid rgba($color-ice-blue, 0.1);
      border-radius: 0.5px;
      pointer-events: none;
    }

    &.active {
      opacity: 1;
      /* 激活时的增强效果 */
      &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
          45deg,
          rgba($color-ice-blue, 0.05) 0%,
          rgba($color-neon-pink, 0.03) 50%,
          rgba($color-violet, 0.04) 100%
        );
        z-index: 1;
      }
    }
  }
}
.carousel2 {
  display: none;
}

/* 响应式显示控制 */
@media (max-width: 720px) {
  .home .carousel1 {
    display: none;
  }

  .home .carousel2 {
    display: block;
  }
}

/* ===== 主内容区重构 ===== */
.center {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 24px 60px;
  gap: 28px;
  position: relative;
  z-index: 4;

  /* 新增：内容区装饰光晕 */
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: min(800px, 90vw);
    height: 400px;
    background: radial-gradient(
      ellipse at center,
      rgba($color-violet, 0.05) 0%,
      rgba($color-ice-blue, 0.03) 30%,
      transparent 70%
    );
    filter: blur(40px);
    z-index: -1;
    pointer-events: none;
  }
}

/* 主标题重构 */
.title {
  font-size: 4.2rem;
  margin: 0;
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.5px;
  position: relative;
  z-index: 9;
  /* 增强渐变效果 */
  background: linear-gradient(
    135deg,
    $color-ice-blue 0%,
    $color-neon-pink 100%,
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;


  /* 新增：标题装饰线 */
  &::after {
    content: "";
    display: block;
    width: 120px;
    height: 3px;
    margin: 20px auto 0;
    background: linear-gradient(
      90deg,
      transparent,
      $color-ice-blue,
      $color-neon-pink,
      transparent
    );
    border-radius: 2px;
    opacity: 0.6;
  }

  /* 新增：故障艺术效果 */
  &::before {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, $color-executor-red, $color-holo-teal);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    z-index: -1;
    opacity: 0;
    animation: glitch 10s infinite;
    pointer-events: none;
  }
}

/* 副标题区域重构 */
.subtitle {
  font-size: 2.8rem;
  min-height: 1.8em;
  color: rgba($color-text-primary, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  position: relative;
  z-index: 9;
  padding: 20px 40px;
  border-radius: 16px;
  backdrop-filter: blur(10px);

  /* 新增：终端风格背景 */
  background: rgba($color-deep-space, 0.5);
  border: 1px solid rgba($color-ice-blue, 0.15);
  box-shadow: inset 0 0 30px rgba($color-ice-blue, 0.05),
    0 10px 40px rgba(0, 0, 0, 0.3);

  /* 新增：边框装饰 */
  &::before {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: 17px;
    background: linear-gradient(
      135deg,
      rgba($color-ice-blue, 0.2),
      rgba($color-neon-pink, 0.1),
      rgba($color-violet, 0.2)
    );
    z-index: -1;
    opacity: 0.3;
  }

  .typed {
    display: inline-block;
    white-space: pre-wrap;
    letter-spacing: 0.8px;
    font-weight: 600;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);

    /* 新增：打字完成时的脉冲效果 */
    &:full {
      animation: text-pulse 2s infinite;
    }
  }

  .cursor {
    display: inline-block;
    width: 4px;
    height: 1.2em;
    margin-left: 6px;
    background: linear-gradient(180deg, $color-ice-blue, $color-holo-teal);
    border-radius: 1px;
    animation: blink 1s steps(2, start) infinite,
      cursor-glow 2s ease-in-out infinite;

    /* 新增：光标辉光 */
    box-shadow: 0 0 8px $color-ice-blue, 0 0 16px rgba($color-ice-blue, 0.3);
  }
}

/* ===== 页脚重构 ===== */
.site-footer {
  flex-shrink: 0;
  border-top: 1px solid rgba($color-ice-blue, 0.08);
  background: linear-gradient(
    180deg,
    rgba($color-deep-space, 0.7),
    rgba($color-nebula, 0.9)
  );
  padding: 20px 24px;
  position: relative;
  z-index: 9;
  backdrop-filter: blur(10px);

  /* 新增：页脚顶部装饰 */
  &::before {
    content: "";
    position: absolute;
    top: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 3px;
    background: linear-gradient(
      90deg,
      transparent,
      $color-ice-blue,
      $color-neon-pink,
      transparent
    );
    filter: blur(1px);
    opacity: 0.5;
  }

  /* 新增：频率波形装饰 */
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      90deg,
      $color-ice-blue 0%,
      $color-neon-pink 25%,
      $color-violet 50%,
      $color-neon-pink 75%,
      $color-ice-blue 100%
    );
    opacity: 0.1;
    filter: blur(0.5px);
  }
}

.foot-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  font-size: 0.95rem;
  letter-spacing: 0.3px;

  .left {
    font-weight: 800;
    color: $color-ice-blue;
    position: relative;
    padding-left: 24px;

    /* 新增：装饰图标 */
    &::before {
      content: "❖";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      color: $color-holo-teal;
      font-size: 1.1rem;
      animation: spin 20s linear infinite;
    }
  }

  .right {
    color: $color-text-dim;
    font-weight: 500;

    /* 新增：设计师名字高亮 */
    span {
      color: $color-text-secondary;
      font-weight: 600;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 1px;
        background: linear-gradient(90deg, $color-neon-pink, transparent);
        opacity: 0.5;
      }
    }
  }
}

/* ===== 新增动画定义 ===== */
@keyframes grid-shift {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 80px 80px;
  }
}

@keyframes scanline {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100vh);
  }
}

@keyframes glitch {
  0%,
  95% {
    opacity: 0;
    transform: translate(0);
  }
  96% {
    opacity: 0.4;
    transform: translate(-3px, 2px);
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
  }
  97% {
    opacity: 0.2;
    transform: translate(3px, -2px);
    clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
  }
  98% {
    opacity: 0.5;
    transform: translate(-1px, -1px);
  }
  99% {
    opacity: 0;
    transform: translate(0);
  }
}

@keyframes text-pulse {
  0%,
  100% {
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  }
  50% {
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4),
      0 0 20px rgba($color-ice-blue, 0.2);
  }
}

@keyframes cursor-glow {
  0%,
  100% {
    box-shadow: 0 0 8px $color-ice-blue, 0 0 16px rgba($color-ice-blue, 0.3);
  }
  50% {
    box-shadow: 0 0 12px $color-holo-teal, 0 0 24px rgba($color-holo-teal, 0.4);
  }
}

@keyframes spin {
  0% {
    transform: translateY(-50%) rotate(0deg);
  }
  100% {
    transform: translateY(-50%) rotate(360deg);
  }
}

/* 保留原闪烁动画 */
@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

/* ===== 响应式优化 ===== */
@media (max-width: 720px) {
  .center {
    padding: 30px 16px 40px;
    gap: 20px;

    .title {
      font-size: 2.8rem;
      letter-spacing: -0.3px;

      &::after {
        width: 80px;
        margin-top: 12px;
      }
    }

    .subtitle {
      font-size: 1.8rem;
      padding: 16px 24px;
      min-height: 1.6em;
      gap: 8px;

      .cursor {
        width: 3px;
        margin-left: 4px;
      }
    }
  }

  .site-footer {
    padding: 16px;

    &::before {
      width: 120px;
    }
  }

  .foot-inner {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 8px;

    .left {
      padding-left: 0;

      &::before {
        position: relative;
        display: inline-block;
        transform: none;
        margin-right: 8px;
        top: 2px;
      }
    }
  }
}

@media (min-width: 1600px) {
  .center {
    .title {
      font-size: 5rem;
    }

    .subtitle {
      font-size: 3.2rem;
    }
  }
}
</style>
