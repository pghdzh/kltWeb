<template>
  <nav ref="navbarRef" class="navbar" :class="{ 'is-scrolled': isScrolled }" role="navigation" aria-label="主导航">
    <!-- 装饰层：流光 + 粒子（纯 CSS） -->
    <div class="nav-decor" aria-hidden="true">
      <span class="flow"></span>
      <span class="particles">
        <i class="particle p1"></i>
        <i class="particle p2"></i>
        <i class="particle p3"></i>
        <i class="particle p4"></i>
        <i class="particle p5"></i>
      </span>
    </div>

    <div class="navbar__container">
      <div class="navbar__logo" @click="() => { }" role="button" tabindex="0">
        <span class="logo-icon">❄️</span>
        <span class="brand-text">珂莱塔设定集</span>
      </div>

      <div class="online-count" v-if="onlineCount !== null" aria-live="polite">
        在线：<span class="count">{{ onlineCount }} 人</span>
      </div>

      <button class="navbar__toggle" :class="{ active: open }" @click="toggleMenu" aria-label="切换菜单"
        :aria-expanded="String(open)">
        <span class="line line--1"></span>
        <span class="line line--2"></span>
        <span class="line line--3"></span>
      </button>

      <ul class="navbar__links" :class="{ 'is-open': open }" id="primary-navigation">
        <li v-for="item in links" :key="item.name" @click="onLinkClick">
          <router-link :to="item.path" class="link" active-class="router-link-active">
            <span class="link-inner">
              <span class="link-text">{{ item.name }}</span>
              <span class="link-glow" aria-hidden="true"></span>
            </span>
          </router-link>
        </li>

        <li>
          <a href="http://slty.site/#/redirector" target="_blank" rel="noopener" class="link">
            <span class="link-inner">
              <span class="link-text">总站</span>
              <span class="link-glow" aria-hidden="true"></span>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, onUnmounted } from "vue";
import { io } from "socket.io-client";

const siteId = "hui";
const onlineCount = ref<number | null>(null);
const socket = io("http://1.94.189.79:3000", { query: { siteId } });

const open = ref(false);
const isScrolled = ref(false);
const navbarRef = ref<HTMLElement | null>(null);

const links = [
  { name: "首页", path: "/" },
  { name: "设定笔记", path: "/timeLine" },
  { name: "寄语心声", path: "/message" },
  { name: "水晶画廊", path: "/gallery" },
  { name: "i珂TV", path: "/resources" },
];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};
const toggleMenu = () => { open.value = !open.value; };
const onLinkClick = () => { open.value = false; };

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  socket.on("onlineCount", (count: number) => { onlineCount.value = count; });
});
onBeforeUnmount(() => { socket.disconnect(); });
onUnmounted(() => { window.removeEventListener("scroll", handleScroll); });
</script>

<style lang="scss" scoped>
/* 固定配色（写死） */
$ice-blue: #bff7ff;
/* 流光主蓝 */
$neon-pink: #ff66c4;
/* 霓虹洋红 */
$violet: #7a39ff;
/* 紫罗兰 */
$gold: #ffd580;
/* 点缀金 */
$bg-frost: #05060a;
/* 导航底色（深） */
$text-soft: #f6f8fb;

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1200;
  height: 72px;
  padding: 12px 0;
  display: block;
  /* 深背景 + 轻微玻璃 */
  background: linear-gradient(180deg, rgba(5, 6, 10, 0.56), rgba(4, 6, 10, 0.8));
  backdrop-filter: blur(8px) saturate(1.05);
  -webkit-backdrop-filter: blur(8px);
  transition: height 0.28s ease, box-shadow 0.28s ease, padding 0.28s ease;

  &.is-scrolled {
    height: 60px;
    box-shadow: 0 8px 30px rgba(2, 4, 8, 0.7);
  }

  /* 装饰层：流光和粒子（位于背景） */
  .nav-decor {
    pointer-events: none;
    position: absolute;
    inset: 0;
    overflow: hidden;
    z-index: 0;

    /* 流光条（水平移动的渐变条） */
    .flow {
      position: absolute;
      left: -30%;
      top: 30%;
      width: 160%;
      height: 2.6rem;
      transform: rotate(-6deg);
      background: linear-gradient(90deg, rgba($ice-blue, 0.06), rgba($neon-pink, 0.16), rgba($violet, 0.12));
      filter: blur(18px) saturate(1.1);
      opacity: 0.9;
      animation: flowMove 8s linear infinite;
      mix-blend-mode: screen;
    }

    /* 漂浮粒子（少量元素以保证性能） */
    .particles {
      position: absolute;
      inset: 0;

      .particle {
        position: absolute;
        display: block;
        border-radius: 50%;
        background: radial-gradient(circle at 30% 30%, rgba($ice-blue, 0.95), rgba($ice-blue, 0.18) 40%, rgba(255, 255, 255, 0));
        filter: blur(6px);
        opacity: 0.7;
        transform: translate3d(0, 0, 0);
        will-change: transform, opacity;
      }

      .p1 {
        width: 10px;
        height: 10px;
        left: 8%;
        top: 20%;
        animation: floatUp 9s linear infinite;
      }

      .p2 {
        width: 14px;
        height: 14px;
        left: 22%;
        top: 70%;
        animation: floatUp 12s linear infinite 1.2s;
        background: radial-gradient(circle at 30% 30%, rgba($neon-pink, 0.95), rgba($neon-pink, 0.18) 40%, transparent);
      }

      .p3 {
        width: 8px;
        height: 8px;
        left: 45%;
        top: 30%;
        animation: floatUp 7s linear infinite 0.6s;
        background: radial-gradient(circle at 30% 30%, rgba($violet, 0.95), rgba($violet, 0.12) 40%, transparent);
        filter: blur(4px);
      }

      .p4 {
        width: 12px;
        height: 12px;
        left: 68%;
        top: 60%;
        animation: floatUp 11s linear infinite 0.3s;
        background: radial-gradient(circle at 30% 30%, rgba($ice-blue, 0.9), rgba($ice-blue, 0.14) 40%, transparent);
      }

      .p5 {
        width: 18px;
        height: 18px;
        left: 86%;
        top: 18%;
        animation: floatUp 13s linear infinite 0.9s;
        background: radial-gradient(circle at 30% 30%, rgba($neon-pink, 0.9), rgba($neon-pink, 0.12) 40%, transparent);
      }
    }
  }

  /* 容器 */
  &__container {
    position: relative;
    /* 使装饰层定位正确 */
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    height: 100%;
  }

  /* Logo */
  &__logo {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    .logo-icon {
      font-size: 1.4rem;
      filter: drop-shadow(0 6px 18px rgba($ice-blue, 0.18));
      transform: translateY(0);
      transition: transform 0.28s ease;
    }

    .brand-text {
      color: $text-soft;
      font-weight: 700;
      font-size: 1.05rem;
      letter-spacing: 0.6px;
      text-shadow:
        0 6px 30px rgba($ice-blue, 0.06),
        0 2px 10px rgba($neon-pink, 0.03);
      background: linear-gradient(90deg, $ice-blue, $neon-pink);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      -webkit-text-fill-color: transparent;
    }

    &:hover {
      .logo-icon {
        transform: translateY(-3px) rotate(-6deg);
      }
    }
  }

  /* 在线数（发光） */
  .online-count {
    color: rgba(255, 255, 255, 0.9);
    font-weight: 600;

    .count {
      color: $ice-blue;
      text-shadow: 0 2px 12px rgba($ice-blue, 0.24), 0 0 8px rgba($neon-pink, 0.06);
      font-weight: 800;
      margin-left: 6px;
    }
  }

  /* 汉堡（霓虹线） */
  &__toggle {
    display: none;
    position: relative;
    width: 44px;
    height: 36px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.02);
    align-items: center;
    justify-content: center;
   
    cursor: pointer;
    transition: background 0.18s;

    .line {
      display: block;
      height: 2px;
      width: 22px;
      margin: 4px 0;
      border-radius: 2px;
      background: linear-gradient(90deg, $ice-blue, $neon-pink);
      box-shadow: 0 6px 18px rgba($ice-blue, 0.12), 0 0 10px rgba($neon-pink, 0.06);
      transition: transform 0.28s cubic-bezier(.2, .8, .2, 1), opacity 0.2s;
      transform-origin: center;
    }

    &.active {
      background: linear-gradient(180deg, rgba($violet, 0.06), rgba($neon-pink, 0.04));

      .line--1 {
        transform: translateY(6px) rotate(45deg);
      }

      .line--2 {
        opacity: 0;
        transform: scaleX(0.6);
      }

      .line--3 {
        transform: translateY(-6px) rotate(-45deg);
      }
    }
  }

  /* 链接列表 */
  &__links {
    display: flex;
    align-items: center;
    gap: 18px;
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
    z-index: 3;

    li {
      margin: 0;

      .link {
        color: rgba(255, 255, 255, 0.9);
        text-decoration: none;
        display: inline-block;
        padding: 8px 6px;
        border-radius: 8px;
        transition: transform 0.18s, color 0.18s;
        position: relative;
        overflow: visible;

        .link-inner {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .link-text {
          font-weight: 600;
          letter-spacing: 0.3px;
        }

        .link-glow {
          position: absolute;
          left: 0;
          right: 0;
          bottom: -8px;
          height: 3px;
          border-radius: 6px;
          background: linear-gradient(90deg, $ice-blue 0%, $neon-pink 40%, rgba($violet, 0.95) 100%);
          opacity: 0;
          transform: translateY(6px) scaleX(0.98);
          filter: blur(8px);
          pointer-events: none;
          transition: opacity 0.28s, transform 0.28s;
        }

        &:hover {
          transform: translateY(-3px);
          color: $ice-blue;

          .link-glow {
            opacity: 0.95;
            transform: translateY(0) scaleX(1);
          }
        }

        /* router 的激活类（写死发光） */
        &.router-link-active,
        &.active {
          color: $ice-blue;
          text-shadow: 0 6px 28px rgba($ice-blue, 0.12);

          .link-glow {
            opacity: 1;
            transform: translateY(0) scaleX(1);
            box-shadow: 0 8px 28px rgba($neon-pink, 0.08);
          }
        }
      }
    }

    /* 小屏样式：折叠菜单为霓虹卡片 + 模糊背景 */
    @media (max-width: 768px) {
      position: absolute;
      top: calc(100% + 8px);
      left: 10px;
      right: 10px;
      margin: 0 auto;
      background: linear-gradient(180deg, rgba(6, 6, 10, 0.72), rgba(8, 6, 16, 0.86));
      border-radius: 14px;
      padding: 12px;
      flex-direction: column;
      align-items: stretch;
      gap: 8px;
      max-height: 0;
      overflow: hidden;
      transform-origin: top center;
      transition: max-height 0.36s cubic-bezier(.2, .8, .2, 1), opacity 0.28s;
      opacity: 0;
      pointer-events: none;
      box-shadow: 0 12px 40px rgba(7, 4, 20, 0.6);

      &.is-open {
        max-height: 520px;
        opacity: 1;
        pointer-events: auto;
      }

      li {
        margin: 0;

        .link {
          display: flex;
          justify-content: center;
          padding: 12px;
          background: linear-gradient(180deg, rgba($violet, 0.02), rgba($neon-pink, 0.02));
          border-radius: 10px;
        }
      }
    }
  }

  /* 小屏展示汉堡 */
  @media (max-width: 768px) {
    &__toggle {
      display: flex;
      flex-direction: column;
    }

    .navbar__logo {
      display: none;
    }

    /* 可按需隐藏/显示 */
  }
}

/* 动画 */
@keyframes floatUp {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.2;
  }

  30% {
    opacity: 0.9;
  }

  60% {
    transform: translateY(-26px) scale(1.05);
    opacity: 0.6;
  }

  100% {
    transform: translateY(-60px) scale(0.95);
    opacity: 0;
  }
}

@keyframes flowMove {
  0% {
    transform: translateX(-30%) rotate(-6deg) scaleX(1);
    opacity: 0.8;
  }

  50% {
    transform: translateX(-10%) rotate(-6deg) scaleX(1.02);
    opacity: 1;
  }

  100% {
    transform: translateX(-30%) rotate(-6deg) scaleX(1);
    opacity: 0.8;
  }
}
</style>
