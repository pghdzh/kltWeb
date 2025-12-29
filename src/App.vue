<template>
  <div id="app">
    <!-- 开屏页过渡 -->
    <transition name="ritual-exit">
      <div
        class="kleta-splash-screen"
        v-if="showIntro"
        :class="{ 'skip-ready': canSkip }"
      >
        <!-- === 新增：视频背景层 === -->
        <video
          class="video-background"
          :src="videoSrc"
          autoplay
          muted
          loop
          playsinline
          @loadeddata="onVideoLoaded"
          @error="onVideoError"
        ></video>

        <!-- 动态效果叠加层 -->
        <div class="splash-overlay">
          <div class="energy-flow"></div>
          <div class="data-grid"></div>
          <!-- 轻量粒子效果 -->
          <div class="particles" aria-hidden="true">
            <span class="particle p1"></span>
            <span class="particle p2"></span>
            <span class="particle p3"></span>
          </div>
        </div>

        <!-- 主内容容器 -->
        <div class="splash-core">
          <!-- 标题区域 -->
          <div class="title-sequence">
            <h1 class="main-title glitch-text" data-text="CARLOTTA">
              CARLOTTA
            </h1>
            <h2 class="sub-title">珂莱塔 · 共振领域</h2>
            <p class="tag-line">正在初始化感知协议...</p>
          </div>

          <!-- 加载与跳过区域 -->
          <div class="splash-footer">
            <!-- 加载进度条 -->
            <div class="load-progress">
              <div
                class="progress-inner"
                :style="{ width: loadProgress + '%' }"
              ></div>
              <div class="progress-glow"></div>
            </div>
            <!-- 跳过按钮 -->
            <transition name="fade-up">
              <button
                v-if="canSkip"
                class="skip-ritual"
                @click.stop="skipIntro"
                aria-label="跳过开场动画"
              >
                <span class="skip-text">跳过 · {{ countdown }}s</span>
                <span class="skip-icon">↗</span>
              </button>
            </transition>
          </div>
        </div>
      </div>
    </transition>

    <!-- 主应用界面 -->
    <div v-if="!showIntro" class="app-main">
      <navbar />
      <main class="main-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { RouterView } from "vue-router";
import navbar from "./components/navbar.vue";

const showIntro = ref(true);
// ===== 保留你原有的视频逻辑 =====
const videoSrc = ref("");
const videoLoaded = ref(false);
// ================================
const loadProgress = ref(0);
const countdown = ref(4);
const canSkip = ref(false);

let progressInterval: number;
let countdownInterval: number;

// ===== 保留你原有的视频初始化逻辑 =====
onMounted(() => {
  initVideoSource();
  simulateProgress();

  // 视频加载后开始倒计时
  setTimeout(() => {
    if (videoLoaded.value) {
      startCountdown();
    } else {
      // 如果视频加载慢，等1秒后强制开始
      setTimeout(startCountdown, 1000);
    }
  }, 600);

  // 4秒后自动跳转（无论视频是否加载完成）
  setTimeout(() => {
    if (showIntro.value) skipIntro();
  }, 4000);
});

// 初始化视频源（完全保留你的原有逻辑）
const initVideoSource = () => {
  const isMobile = window.innerWidth <= 768;
  const folder = isMobile ? "/mp2" : "/mp1";
  const index = Math.floor(Math.random() * 3) + 1; // 随机 1、2 或 3
  videoSrc.value = `${folder}/1 (${index}).mp4`;
};

// 视频加载成功
const onVideoLoaded = () => {
  videoLoaded.value = true;
};

// 视频加载失败
const onVideoError = (e) => {
  console.warn("开屏视频加载失败，使用备用背景:", e);
  videoLoaded.value = true;
  // 可以在这里设置一个纯色或渐变背景
};

// ===== 模拟加载进度 =====
const simulateProgress = () => {
  progressInterval = window.setInterval(() => {
    // 非线性增长，更自然
    if (loadProgress.value < 90) {
      loadProgress.value += (95 - loadProgress.value) * 0.1;
    } else if (loadProgress.value < 100) {
      loadProgress.value += 0.5;
    } else {
      clearInterval(progressInterval);
    }
  }, 80);
};

// 开始倒计时
const startCountdown = () => {
  canSkip.value = true;
  countdownInterval = window.setInterval(() => {
    countdown.value -= 1;
    if (countdown.value <= 0) {
      clearInterval(countdownInterval);
      skipIntro();
    }
  }, 1000);
};

// 跳过开屏
const skipIntro = () => {
  if (!showIntro.value) return;
  showIntro.value = false;
  clearInterval(progressInterval);
  clearInterval(countdownInterval);
};

onBeforeUnmount(() => {
  clearInterval(progressInterval);
  clearInterval(countdownInterval);
});
</script>

<style scoped lang="scss">
/* ========== 配色方案 (与导航栏一致) ========== */
$color-void: #0a0c1a;
$color-deep-space: #1a1b3a;
$color-core-blue: #00d4ff;
$color-neon-pink: #ff2a6d;
$color-holo-teal: #00ffc3;
$color-light: #e2f3ff;

/* ========== 开屏页容器 ========== */
.kleta-splash-screen {
  position: fixed;
  inset: 0;
  background: $color-void; // 视频加载前的背景色
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &.skip-ready {
    cursor: pointer;
  }
}

/* ===== 视频背景层（保留你的原有样式并优化） ===== */
.video-background {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7; // 降低不透明度，让叠加效果更明显
  z-index: 1;
  pointer-events: none;
}

/* ===== 动态效果叠加层 ===== */
.splash-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;

  /* 深色渐变叠加，让文字更清晰 */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba($color-void, 0.6) 0%,
      rgba($color-void, 0.4) 50%,
      rgba($color-void, 0.6) 100%
    );
    z-index: 1;
  }

  /* 能量流光 */
  .energy-flow {
    position: absolute;
    top: 0;
    left: -50%;
    width: 200%;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      $color-core-blue,
      $color-holo-teal,
      $color-neon-pink,
      transparent
    );
    filter: blur(1px);
    opacity: 0.5;
    animation: scanline 8s linear infinite;
    z-index: 2;
  }

  /* 数据网格 */
  .data-grid {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(
        rgba($color-core-blue, 0.03) 1px,
        transparent 1px
      ),
      linear-gradient(90deg, rgba($color-core-blue, 0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    animation: grid-shift 40s linear infinite;
    z-index: 1;
    opacity: 0.4;
  }

  /* 轻量粒子 */
  .particles {
    position: absolute;
    inset: 0;
    z-index: 3;
    pointer-events: none;

    .particle {
      position: absolute;
      border-radius: 50%;
      background: $color-core-blue;
      filter: blur(3px);
      opacity: 0;

      &.p1 {
        width: 6px;
        height: 6px;
        top: 25%;
        left: 20%;
        animation: float 7s infinite ease-in-out;
      }
      &.p2 {
        width: 4px;
        height: 4px;
        top: 60%;
        left: 75%;
        background: $color-neon-pink;
        animation: float 9s infinite 1s ease-in-out;
      }
      &.p3 {
        width: 8px;
        height: 8px;
        top: 70%;
        left: 40%;
        background: $color-holo-teal;
        animation: float 11s infinite 0.5s ease-in-out;
      }
    }
  }
}

/* ========== 核心内容区 ========== */
.splash-core {
  position: relative;
  z-index: 10; // 确保在视频和叠加层之上
  text-align: center;
  width: 90%;
  max-width: 800px;
}

/* 标题序列 */
.title-sequence {
  margin-bottom: 4rem;

  .main-title {
    font-size: 5rem;
    font-weight: 900;
    letter-spacing: 4px;
    margin: 0 0 1rem;
    background: linear-gradient(
      90deg,
      $color-core-blue,
      $color-holo-teal 30%,
      $color-neon-pink
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: 0 0 30px rgba($color-core-blue, 0.5),
      0 0 60px rgba($color-core-blue, 0.2);
    opacity: 0;
    animation: titleReveal 1.2s 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    position: relative;
  }

  .glitch-text {
    position: relative;

    &::before,
    &::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.8;
      background: inherit;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    &::before {
      animation: glitch-1 5s infinite;
      z-index: -1;
      clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
    }

    &::after {
      animation: glitch-2 7s infinite;
      z-index: -2;
      clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
    }
  }

  .sub-title {
    font-size: 1.8rem;
    font-weight: 300;
    color: rgba($color-light, 0.95);
    margin: 0 0 0.5rem;
    letter-spacing: 6px;
    opacity: 0;
    animation: fadeUp 0.8s 1s ease-out forwards;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }

  .tag-line {
    font-size: 0.9rem;
    color: rgba($color-core-blue, 0.8);
    letter-spacing: 3px;
    margin: 0;
    opacity: 0;
    animation: fadeUp 0.8s 1.4s ease-out forwards;
    text-shadow: 0 0 10px rgba($color-core-blue, 0.3);
  }
}

/* ========== 底部加载与跳过 ========== */
.splash-footer {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  /* 加载进度条 */
  .load-progress {
    height: 3px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    margin-bottom: 1.5rem;
    backdrop-filter: blur(5px);

    .progress-inner {
      height: 100%;
      background: linear-gradient(90deg, $color-core-blue, $color-holo-teal);
      border-radius: 3px;
      transition: width 0.3s ease;
      position: relative;
      z-index: 2;
    }

    .progress-glow {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: linear-gradient(
        90deg,
        rgba($color-core-blue, 0.4),
        rgba($color-holo-teal, 0.4)
      );
      filter: blur(8px);
      z-index: 1;
      opacity: 0.6;
    }
  }

  /* 跳过按钮 */
  .skip-ritual {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba($color-core-blue, 0.3);
    border-radius: 20px;
    color: rgba($color-light, 0.9);
    padding: 10px 22px;
    font-size: 0.9rem;
    letter-spacing: 1px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);

    &:hover {
      background: rgba($color-core-blue, 0.15);
      border-color: rgba($color-core-blue, 0.5);
      color: $color-light;
      transform: translateY(-2px);
      box-shadow: 0 5px 20px rgba($color-core-blue, 0.3);

      .skip-icon {
        transform: translateX(3px) translateY(-3px);
      }
    }

    &:active {
      transform: translateY(0);
    }

    .skip-text {
      font-weight: 500;
    }

    .skip-icon {
      font-size: 1.1rem;
      transition: transform 0.3s ease;
    }
  }
}

/* ========== 动画定义 ========== */
@keyframes scanline {
  0% {
    transform: translateX(-50%) rotate(0deg);
  }
  100% {
    transform: translateX(50%) rotate(0deg);
  }
}

@keyframes grid-shift {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 80px 80px;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  10%,
  60% {
    opacity: 0.7;
  }
  50% {
    transform: translateY(-40px) scale(1.05);
  }
}

@keyframes titleReveal {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes glitch-1 {
  0%,
  100% {
    transform: translate(0);
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
  }
  20% {
    transform: translate(-2px, 1px);
    clip-path: polygon(0 15%, 100% 15%, 100% 60%, 0 60%);
  }
  40% {
    transform: translate(-1px, -1px);
    clip-path: polygon(0 5%, 100% 5%, 100% 50%, 0 50%);
  }
  60% {
    transform: translate(2px, 1px);
    clip-path: polygon(0 25%, 100% 25%, 100% 70%, 0 70%);
  }
  80% {
    transform: translate(1px, -2px);
    clip-path: polygon(0 10%, 100% 10%, 100% 55%, 0 55%);
  }
}

@keyframes glitch-2 {
  0%,
  100% {
    transform: translate(0);
    clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
  }
  10% {
    transform: translate(2px, -1px);
    clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
  }
  30% {
    transform: translate(-2px, 2px);
    clip-path: polygon(0 45%, 100% 45%, 100% 90%, 0 90%);
  }
  50% {
    transform: translate(1px, 1px);
    clip-path: polygon(0 50%, 100% 50%, 100% 95%, 0 95%);
  }
  70% {
    transform: translate(-1px, -2px);
    clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
  }
  90% {
    transform: translate(2px, -2px);
    clip-path: polygon(0 40%, 100% 40%, 100% 85%, 0 85%);
  }
}

.fade-up-enter-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

/* ========== 开屏退出过渡 ========== */
.ritual-exit-leave-active {
  transition: all 0.8s cubic-bezier(0.7, 0, 0.3, 1);
  .splash-core {
    transition: transform 0.8s cubic-bezier(0.7, 0, 0.3, 1);
  }
}
.ritual-exit-leave-to {
  opacity: 0;
  .splash-core {
    transform: scale(0.95);
  }
}

/* ========== 响应式调整 ========== */
@media (max-width: 768px) {
  .title-sequence {
    margin-bottom: 3rem;

    .main-title {
      font-size: 3.2rem;
      letter-spacing: 2px;
    }
    .sub-title {
      font-size: 1.4rem;
      letter-spacing: 4px;
    }
    .tag-line {
      font-size: 0.8rem;
    }
  }

  .video-background {
    opacity: 0.8; // 移动端视频可以更清晰一些
  }

  .splash-overlay::before {
    background: linear-gradient(
      to bottom,
      rgba($color-void, 0.7) 0%,
      rgba($color-void, 0.5) 50%,
      rgba($color-void, 0.7) 100%
    );
  }

  .skip-ritual {
    padding: 8px 18px;
    font-size: 0.85rem;
  }
}
</style>