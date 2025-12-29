<template>
  <nav
    class="kleta-navbar"
    :class="{ 'is-scrolled': isScrolled, 'menu-open': menuOpen }"
    role="navigation"
    aria-label="珂莱塔主题导航"
  >
    <!-- 多层背景与装饰效果 -->
    <div class="nav-bg-effects" aria-hidden="true">
      <div class="bg-gradient"></div>
      <div class="energy-grid"></div>
      <div class="hologram-line"></div>
    </div>

    <!-- 动态粒子与光效 -->
    <div class="nav-particle-field" aria-hidden="true">
      <div class="particle particle-1"></div>
      <div class="particle particle-2"></div>
      <div class="particle particle-3"></div>
      <div class="particle particle-4"></div>
      <div class="particle particle-5"></div>
    </div>

    <div class="nav-container">
      <!-- Logo区域 -->
      <div
        class="nav-brand"
        @click="navigateTo('/')"
        role="button"
        tabindex="0"
        aria-label="返回首页"
      >
        <div class="brand-icon">
          <div class="icon-core"></div>
          <div class="icon-ring"></div>
          <div class="icon-glow"></div>
        </div>
        <div class="brand-text">
          <span class="brand-main">珂莱塔</span>
          <span class="brand-sub">频率档案库</span>
        </div>
        <div
          class="brand-status"
          v-if="onlineCount !== null"
          aria-live="polite"
        >
          <span class="status-dot"></span>
          <span class="status-text">{{ onlineCount }}在线</span>
        </div>
      </div>

      <!-- 桌面端导航链接 -->
      <ul class="nav-links desktop-links" id="primary-navigation">
        <li v-for="(item, index) in primaryLinks" :key="item.name">
          <router-link
            :to="item.path"
            class="nav-link"
            :class="{ 'link-highlight': item.highlight }"
            active-class="active"
            :data-index="index"
            @click="closeMenu"
          >
            <span class="link-icon" v-if="item.icon">{{ item.icon }}</span>
            <span class="link-text">{{ item.name }}</span>
            <span class="link-underline"></span>
            <span class="link-hover-glow"></span>
          </router-link>
        </li>

        <!-- 更多选项下拉菜单 -->
        <li class="nav-dropdown" v-if="secondaryLinks.length > 0">
          <button
            class="dropdown-toggle"
            @click="toggleDropdown"
            :aria-expanded="dropdownOpen"
            aria-label="更多选项"
          >
            <span class="toggle-text">更多</span>
            <span class="toggle-icon" :class="{ open: dropdownOpen }">▼</span>
          </button>
          <transition name="dropdown">
            <ul class="dropdown-menu" v-show="dropdownOpen" @click.stop>
              <li v-for="item in secondaryLinks" :key="item.name">
                <router-link
                  :to="item.path"
                  class="dropdown-link"
                  @click="closeDropdown"
                >
                  <span class="dropdown-icon" v-if="item.icon">{{
                    item.icon
                  }}</span>
                  <span>{{ item.name }}</span>
                </router-link>
              </li>
              <!-- 外部链接 -->
              <li class="dropdown-divider"></li>
              <li>
                <a
                  href="http://slty.site/#/redirector"
                  target="_blank"
                  rel="noopener"
                  class="dropdown-link external"
                  @click="closeDropdown"
                >
                  <span class="dropdown-icon">↗</span>
                  <span>霜落映界</span>
                </a>
              </li>
            </ul>
          </transition>
        </li>
      </ul>

      <!-- 移动端菜单切换按钮 -->
      <button
        class="mobile-toggle"
        :class="{ active: menuOpen }"
        @click="toggleMenu"
        aria-label="切换导航菜单"
        aria-controls="mobile-navigation"
        :aria-expanded="menuOpen"
      >
        <span class="toggle-line line-1"></span>
        <span class="toggle-line line-2"></span>
        <span class="toggle-line line-3"></span>
        <span class="toggle-glow"></span>
      </button>

      <!-- 移动端导航菜单 -->
      <transition name="mobile-menu">
        <div
          class="mobile-nav-container"
          v-if="menuOpen"
          @click.self="closeMenu"
        >
          <div class="mobile-nav-panel" id="mobile-navigation">
            <!-- 移动端品牌区域 -->
            <div class="mobile-brand">
              <div class="mobile-icon">
                <div class="icon-core"></div>
              </div>
              <div class="mobile-brand-text">
                <h2>珂莱塔频率档案库</h2>
                <p class="mobile-status" v-if="onlineCount !== null">
                  <span class="status-indicator"></span>
                  {{ onlineCount }} 位共鸣者在线
                </p>
              </div>
            </div>

            <!-- 移动端导航链接 -->
            <ul class="mobile-nav-links">
              <li v-for="(item, index) in allLinks" :key="item.name">
                <router-link
                  :to="item.path"
                  class="mobile-link"
                  :class="{ 'mobile-highlight': item.highlight }"
                  @click="closeMenu"
                  :data-index="index"
                >
                  <div class="mobile-link-content">
                    <span class="mobile-link-icon" v-if="item.icon">{{
                      item.icon
                    }}</span>
                    <span class="mobile-link-text">{{ item.name }}</span>
                  </div>
                  <span class="mobile-link-arrow">→</span>
                  <span class="mobile-link-glow"></span>
                </router-link>
              </li>

              <!-- 外部链接 -->
              <li class="mobile-external-link">
                <a
                  href="http://slty.site/#/redirector"
                  target="_blank"
                  rel="noopener"
                  class="mobile-link external"
                  @click="closeMenu"
                >
                  <div class="mobile-link-content">
                    <span class="mobile-link-icon">↗</span>
                    <span class="mobile-link-text">霜落映界</span>
                  </div>
                  <span class="mobile-link-arrow external-arrow">↗</span>
                </a>
              </li>
            </ul>

            <!-- 移动端菜单装饰 -->
            <div class="mobile-decor" aria-hidden="true">
              <div class="decor-line"></div>
              <div class="decor-dots">
                <span class="decor-dot"></span>
                <span class="decor-dot"></span>
                <span class="decor-dot"></span>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useRouter } from "vue-router";
import { io } from "socket.io-client";

const router = useRouter();

// 响应式状态
const onlineCount = ref<number | null>(1); // 默认显示1，实际应从socket获取
const menuOpen = ref(false);
const dropdownOpen = ref(false);
const isScrolled = ref(false);
const lastScrollY = ref(0);

// 修正后的导航链接
const navLinks = [
  { name: "晶核视界", path: "/", icon: "⌂", highlight: true },
  { name: "执行人密档", path: "/timeLine", icon: "📖" },
  { name: "缄默信笺", path: "/message", icon: "💬" },
  { name: "变彩图鉴", path: "/gallery", icon: "🖼️" },
  { name: "武装套箱", path: "/resources", icon: "📚" },
  { name: "晶刃试炼", path: "/game", icon: "⚔️" },
  { name: "解构密谈", path: "/talk", icon: "🤖" },
  { name: "镜向箔", path: "/voice", icon: "🔊" },
  { name: "宴请终章", path: "/music", icon: "🎵" },
  { name: "重塑档案", path: "/wiki", icon: "📘" },
];

// 计算属性：主链接（桌面端显示前6个）
const primaryLinks = computed(() => navLinks.slice(0, 6));
// 计算属性：次要链接（桌面端放入下拉菜单）
const secondaryLinks = computed(() => navLinks.slice(6));
// 计算属性：所有链接（移动端显示全部）
const allLinks = computed(() => navLinks);

// 方法
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
  if (menuOpen.value) {
    dropdownOpen.value = false;
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

const closeMenu = () => {
  menuOpen.value = false;
  document.body.style.overflow = "";
};

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const closeDropdown = () => {
  dropdownOpen.value = false;
};

const navigateTo = (path: string) => {
  router.push(path);
  closeMenu();
};

const handleScroll = () => {
  const currentScrollY = window.scrollY;

  // 滚动时改变导航栏状态
  isScrolled.value = currentScrollY > 20;

  // 记录最后滚动位置
  lastScrollY.value = currentScrollY;
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest(".nav-dropdown") && dropdownOpen.value) {
    dropdownOpen.value = false;
  }
};
const siteId = "klt";

// 连接时带上 query.siteId
const socket: any = io("http://36.150.237.25:3000", {
  query: { siteId },
});
// 生命周期
onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  document.addEventListener("click", handleClickOutside);

  socket.on("onlineCount", (count: number) => {
    onlineCount.value = count;
  });

  // 初始检查滚动状态
  handleScroll();
});

onBeforeUnmount(() => {
  socket.disconnect();
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("click", handleClickOutside);
  document.body.style.overflow = "";
});
</script>

<style lang="scss" scoped>
/* 鸣潮风格配色方案 */
$color-deep-space: #0a0c1a;
$color-nebula-blue: #0d1b2a;
$color-void-purple: #1a1b3a;
$color-core-blue: #00d4ff;
$color-neon-pink: #ff2a6d;
$color-energy-violet: #7b2cbf;
$color-hologram-teal: #00ffc3;
$color-text-primary: #e2f3ff;
$color-text-secondary: #a6c1d6;
$color-text-dim: #6d8ba3;
$color-glass-light: rgba(255, 255, 255, 0.08);
$color-glass-dark: rgba(10, 12, 26, 0.7);

/* 混合与函数 */
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin text-glow($color, $intensity: 0.4) {
  text-shadow: 0 0 8px rgba($color, $intensity),
    0 0 16px rgba($color, $intensity * 0.6),
    0 0 24px rgba($color, $intensity * 0.3);
}

@mixin box-glow($color, $intensity: 0.3) {
  box-shadow: 0 0 20px rgba($color, $intensity),
    0 0 40px rgba($color, $intensity * 0.5),
    inset 0 0 20px rgba($color, $intensity * 0.2);
}

@mixin glass-effect($blur: 12px) {
  background: $color-glass-dark;
  backdrop-filter: blur($blur) saturate(180%);
  -webkit-backdrop-filter: blur($blur) saturate(180%);
  border: 1px solid $color-glass-light;
}

/* 动画定义 */
@keyframes float {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-10px) scale(1.05);
  }
}

@keyframes pulse-glow {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

@keyframes hologram-scan {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
}

@keyframes grid-shift {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 40px 40px;
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 主要导航栏样式 */
.kleta-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 80px;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);

  &.is-scrolled {
    height: 70px;
    background: rgba($color-deep-space, 0.92);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }

  &.menu-open {
    background: $color-deep-space;
  }
}

/* 背景效果层 */
.nav-bg-effects {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;

  .bg-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba($color-nebula-blue, 0.95) 0%,
      rgba($color-void-purple, 0.85) 100%
    );
    opacity: 0.9;
  }

  .energy-grid {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(
        rgba($color-core-blue, 0.05) 1px,
        transparent 1px
      ),
      linear-gradient(90deg, rgba($color-core-blue, 0.05) 1px, transparent 1px);
    background-size: 40px 40px;
    animation: grid-shift 20s linear infinite;
    opacity: 0.3;
  }

  .hologram-line {
    position: absolute;
    top: 0;
    left: 0;
    height: 1px;
    width: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      $color-hologram-teal,
      transparent
    );
    filter: blur(1px);
    animation: hologram-scan 3s linear infinite;
    opacity: 0.5;
  }
}

/* 粒子场效果 */
.nav-particle-field {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;

  .particle {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(
      circle at center,
      $color-core-blue,
      transparent 70%
    );
    filter: blur(4px);
    opacity: 0;
    animation: float 8s infinite ease-in-out;

    &.particle-1 {
      width: 6px;
      height: 6px;
      top: 20%;
      left: 10%;
      animation-delay: 0s;
      animation-duration: 9s;
    }

    &.particle-2 {
      width: 8px;
      height: 8px;
      top: 60%;
      left: 85%;
      background: radial-gradient(
        circle at center,
        $color-neon-pink,
        transparent 70%
      );
      animation-delay: 1.2s;
      animation-duration: 11s;
    }

    &.particle-3 {
      width: 4px;
      height: 4px;
      top: 40%;
      left: 30%;
      background: radial-gradient(
        circle at center,
        $color-hologram-teal,
        transparent 70%
      );
      animation-delay: 2.5s;
      animation-duration: 7s;
    }

    &.particle-4 {
      width: 10px;
      height: 10px;
      top: 75%;
      left: 60%;
      animation-delay: 3.8s;
      animation-duration: 13s;
    }

    &.particle-5 {
      width: 5px;
      height: 5px;
      top: 10%;
      left: 70%;
      background: radial-gradient(
        circle at center,
        $color-energy-violet,
        transparent 70%
      );
      animation-delay: 5.1s;
      animation-duration: 10s;
    }
  }
}

/* 导航容器 */
.nav-container {
  position: relative;
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  height: 100%;
  @include flex-center;
  justify-content: space-between;
}

/* 品牌区域 */
.nav-brand {
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  user-select: none;
  padding: 8px 0;
  position: relative;
  z-index: 3;

  .brand-icon {
    position: relative;
    width: 48px;
    height: 48px;
    @include flex-center;

    .icon-core {
      width: 24px;
      height: 24px;
      background: linear-gradient(
        135deg,
        $color-core-blue,
        $color-hologram-teal
      );
      border-radius: 50%;
      animation: pulse-glow 3s infinite ease-in-out;
      @include box-glow($color-core-blue, 0.5);
      z-index: 1;
    }

    .icon-ring {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 2px solid rgba($color-core-blue, 0.4);
      border-radius: 50%;
      animation: pulse-glow 4s infinite ease-in-out 0.5s;
    }

    .icon-glow {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: radial-gradient(
        circle at center,
        rgba($color-core-blue, 0.2),
        transparent 70%
      );
      filter: blur(8px);
    }
  }

  .brand-text {
    display: flex;
    flex-direction: column;

    .brand-main {
      font-size: 1.5rem;
      font-weight: 800;
      background: linear-gradient(
        90deg,
        $color-core-blue,
        $color-hologram-teal
      );
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      line-height: 1;
      @include text-glow($color-core-blue, 0.6);
    }

    .brand-sub {
      font-size: 0.75rem;
      color: $color-text-dim;
      letter-spacing: 2px;
      margin-top: 2px;
    }
  }

  .brand-status {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    background: rgba($color-energy-violet, 0.1);
    border-radius: 12px;
    border: 1px solid rgba($color-energy-violet, 0.2);

    .status-dot {
      width: 8px;
      height: 8px;
      background: $color-hologram-teal;
      border-radius: 50%;
      @include box-glow($color-hologram-teal, 0.6);
      animation: pulse-glow 2s infinite;
    }

    .status-text {
      font-size: 0.75rem;
      font-weight: 600;
      color: $color-text-secondary;
    }
  }

  &:hover {
    .icon-core {
      transform: scale(1.1);
      transition: transform 0.3s ease;
    }
  }
}

/* 桌面端导航链接 */
.nav-links.desktop-links {
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;
  margin: 0;
  padding: 0;

  & > li {
    position: relative;

    .nav-link {
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      text-decoration: none;
      color: $color-text-secondary;
      font-weight: 600;
      font-size: 0.9rem;
      border-radius: 12px;

      transition: all 0.3s ease;

      .link-icon {
        font-size: 1rem;
        transition: transform 0.3s ease;
      }

      .link-text {
        position: relative;
        z-index: 1;
      }

      .link-underline {
        position: absolute;
        bottom: 0;
        left: 10%;
        width: 80%;
        height: 2px;
        background: linear-gradient(
          90deg,
          transparent,
          $color-core-blue,
          transparent
        );
        transform: scaleX(0);
        transition: transform 0.4s ease;
      }

      .link-hover-glow {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          135deg,
          rgba($color-core-blue, 0.05),
          rgba($color-neon-pink, 0.02)
        );
        border-radius: 12px;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 0;
      }

      &:hover,
      &.active {
        color: $color-text-primary;
        transform: translateY(-2px);

        .link-icon {
          transform: scale(1.2);
          color: $color-core-blue;
        }

        .link-underline {
          transform: scaleX(1);
        }

        .link-hover-glow {
          opacity: 1;
        }
      }

      &.active {
        background: rgba($color-core-blue, 0.08);
        @include box-glow($color-core-blue, 0.2);

        .link-underline {
          background: linear-gradient(
            90deg,
            $color-core-blue,
            $color-hologram-teal
          );
          box-shadow: 0 0 10px rgba($color-core-blue, 0.5);
        }
      }

      &.link-highlight {
        background: linear-gradient(
          135deg,
          rgba($color-neon-pink, 0.1),
          rgba($color-energy-violet, 0.1)
        );
        border: 1px solid rgba($color-neon-pink, 0.2);
        @include box-glow($color-neon-pink, 0.2);

        &:hover {
          background: linear-gradient(
            135deg,
            rgba($color-neon-pink, 0.2),
            rgba($color-energy-violet, 0.2)
          );
        }
      }
    }
  }
}

/* 下拉菜单 */
.nav-dropdown {
  position: relative;

  .dropdown-toggle {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 18px;
    background: rgba($color-glass-light, 0.1);
    border: 1px solid rgba($color-core-blue, 0.2);
    border-radius: 12px;
    color: $color-text-secondary;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 300; /* 下拉按钮较高层级 */

    .toggle-icon {
      font-size: 0.7rem;
      transition: transform 0.3s ease;

      &.open {
        transform: rotate(180deg);
      }
    }

    &:hover {
      background: rgba($color-core-blue, 0.1);
      color: $color-text-primary;
      border-color: rgba($color-core-blue, 0.4);
    }
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    min-width: 220px;
    background: rgba(10, 12, 26, 0.95);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba($color-glass-light, 0.3);
    border-radius: 16px;
    padding: 8px 0;
    list-style: none;
    margin: 0;

    /* 关键：确保下拉菜单在一切之上 */
    z-index: 9999 !important; /* 使用较高值确保显示 */

    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7),
      0 10px 40px rgba($color-core-blue, 0.2),
      inset 0 0 20px rgba($color-core-blue, 0.1);

    /* 确保不被父容器裁剪 */
    overflow: visible !important;
    .dropdown-divider {
      height: 1px;
      background: rgba($color-text-dim, 0.2);
      margin: 8px 16px;
    }

    .dropdown-link {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 20px;
      text-decoration: none;
      color: $color-text-secondary;
      font-size: 0.9rem;
      transition: all 0.2s ease;

      .dropdown-icon {
        font-size: 1rem;
        width: 20px;
        text-align: center;
      }

      &:hover {
        background: rgba($color-core-blue, 0.1);
        color: $color-text-primary;
        padding-left: 24px;
      }

      &.external {
        color: $color-hologram-teal;

        &:hover {
          background: rgba($color-hologram-teal, 0.1);
        }
      }
    }
  }

  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: all 0.3s ease;
  }

  .dropdown-enter-from,
  .dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
}

/* 移动端切换按钮 */
.mobile-toggle {
  display: none;
  position: relative;
  width: 48px;
  height: 48px;
  background: rgba($color-glass-light, 0.1);
  border: 1px solid rgba($color-core-blue, 0.2);
  border-radius: 12px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1001;

  .toggle-line {
    display: block;
    width: 24px;
    height: 2px;
    background: $color-text-primary;
    border-radius: 2px;
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);

    &.line-1 {
      transform-origin: center;
    }

    &.line-2 {
      opacity: 1;
    }

    &.line-3 {
      transform-origin: center;
    }
  }

  .toggle-glow {
    position: absolute;
    inset: -4px;
    border-radius: 16px;
    background: radial-gradient(
      circle at center,
      rgba($color-core-blue, 0.2),
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &.active {
    background: rgba($color-core-blue, 0.1);
    border-color: rgba($color-core-blue, 0.4);

    .toggle-glow {
      opacity: 1;
    }

    .line-1 {
      transform: translateY(8px) rotate(45deg);
      background: $color-core-blue;
    }

    .line-2 {
      opacity: 0;
      transform: scaleX(0);
    }

    .line-3 {
      transform: translateY(-8px) rotate(-45deg);
      background: $color-core-blue;
    }
  }

  &:hover {
    background: rgba($color-core-blue, 0.15);

    .toggle-glow {
      opacity: 0.5;
    }
  }
}

/* 移动端导航面板 */
.mobile-nav-container {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba($color-deep-space, 0.9);
  backdrop-filter: blur(10px);

  .mobile-nav-panel {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 90%;
    max-width: 400px;
    background: linear-gradient(180deg, $color-nebula-blue, $color-void-purple);
    border-left: 1px solid rgba($color-core-blue, 0.2);
    box-shadow: -10px 0 60px rgba(0, 0, 0, 0.7);
    padding: 24px;
    overflow-y: auto;
    animation: slide-up 0.4s ease-out;

    .mobile-brand {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 32px;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba($color-text-dim, 0.2);

      .mobile-icon {
        width: 60px;
        height: 60px;
        @include flex-center;

        .icon-core {
          width: 36px;
          height: 36px;
          background: linear-gradient(
            135deg,
            $color-core-blue,
            $color-hologram-teal
          );
          border-radius: 50%;
          @include box-glow($color-core-blue, 0.6);
          animation: pulse-glow 3s infinite ease-in-out;
        }
      }

      .mobile-brand-text {
        flex: 1;

        h2 {
          margin: 0;
          font-size: 1.4rem;
          background: linear-gradient(
            90deg,
            $color-core-blue,
            $color-hologram-teal
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          @include text-glow($color-core-blue, 0.6);
        }

        .mobile-status {
          margin: 4px 0 0;
          font-size: 0.85rem;
          color: $color-text-dim;
          display: flex;
          align-items: center;
          gap: 6px;

          .status-indicator {
            width: 8px;
            height: 8px;
            background: $color-hologram-teal;
            border-radius: 50%;
            @include box-glow($color-hologram-teal, 0.6);
            animation: pulse-glow 2s infinite;
          }
        }
      }
    }

    .mobile-nav-links {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        margin-bottom: 8px;

        .mobile-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          text-decoration: none;
          color: $color-text-secondary;
          border-radius: 14px;
          background: rgba($color-glass-light, 0.05);
          border: 1px solid transparent;
          transition: all 0.3s ease;
          position: relative;

          .mobile-link-content {
            display: flex;
            align-items: center;
            gap: 12px;

            .mobile-link-icon {
              font-size: 1.2rem;
              width: 24px;
              text-align: center;
              transition: transform 0.3s ease;
            }

            .mobile-link-text {
              font-size: 1rem;
              font-weight: 600;
            }
          }

          .mobile-link-arrow {
            font-size: 1.2rem;
            color: $color-text-dim;
            transition: all 0.3s ease;

            &.external-arrow {
              color: $color-hologram-teal;
            }
          }

          .mobile-link-glow {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              135deg,
              rgba($color-core-blue, 0.1),
              rgba($color-hologram-teal, 0.05)
            );
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: -1;
          }

          &:hover,
          &.router-link-active {
            background: rgba($color-core-blue, 0.1);
            border-color: rgba($color-core-blue, 0.3);
            color: $color-text-primary;
            transform: translateX(4px);

            .mobile-link-icon {
              transform: scale(1.2);
              color: $color-core-blue;
            }

            .mobile-link-arrow {
              color: $color-core-blue;
              transform: translateX(4px);
            }

            .mobile-link-glow {
              opacity: 1;
            }
          }

          &.mobile-highlight {
            background: linear-gradient(
              135deg,
              rgba($color-neon-pink, 0.1),
              rgba($color-energy-violet, 0.1)
            );
            border: 1px solid rgba($color-neon-pink, 0.2);

            &:hover {
              background: linear-gradient(
                135deg,
                rgba($color-neon-pink, 0.2),
                rgba($color-energy-violet, 0.2)
              );
            }
          }

          &.external {
            .mobile-link-text {
              color: $color-hologram-teal;
            }

            &:hover {
              background: rgba($color-hologram-teal, 0.1);
              border-color: rgba($color-hologram-teal, 0.3);
            }
          }
        }

        &.mobile-external-link {
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid rgba($color-text-dim, 0.2);
        }
      }
    }

    .mobile-decor {
      margin-top: 40px;
      text-align: center;

      .decor-line {
        height: 1px;
        background: linear-gradient(
          90deg,
          transparent,
          $color-core-blue,
          transparent
        );
        margin-bottom: 16px;
      }

      .decor-dots {
        display: flex;
        justify-content: center;
        gap: 12px;

        .decor-dot {
          width: 6px;
          height: 6px;
          background: $color-text-dim;
          border-radius: 50%;
          opacity: 0.6;

          &:nth-child(1) {
            animation: pulse-glow 2s infinite;
          }

          &:nth-child(2) {
            animation: pulse-glow 2s infinite 0.4s;
          }

          &:nth-child(3) {
            animation: pulse-glow 2s infinite 0.8s;
          }
        }
      }
    }
  }

  .mobile-menu-enter-active,
  .mobile-menu-leave-active {
    transition: all 0.4s ease;
  }

  .mobile-menu-enter-from,
  .mobile-menu-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .nav-container {
    padding: 0 20px;
  }

  .nav-links.desktop-links > li .nav-link {
    padding: 10px 14px;
    font-size: 0.85rem;
  }
}

@media (max-width: 1024px) {
  .nav-links.desktop-links > li .nav-link {
    padding: 10px 12px;
    font-size: 0.82rem;

    .link-icon {
      display: none;
    }
  }
}

@media (max-width: 900px) {
  .nav-links.desktop-links {
    display: none;
  }

  .mobile-toggle {
    display: flex;
  }

  .kleta-navbar {
    height: 72px;

    &.is-scrolled {
      height: 68px;
    }
  }

  .nav-brand .brand-status {
    display: none;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0 16px;
  }

  .kleta-navbar {
    height: 68px;

    &.is-scrolled {
      height: 64px;
    }
  }

  .nav-brand .brand-sub {
    display: none;
  }

  .mobile-nav-panel {
    width: 100%;
    max-width: none;
  }
}

/* 辅助功能优化 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .kleta-navbar {
    background: rgba($color-deep-space, 0.95);
  }

  .mobile-nav-panel {
    background: linear-gradient(
      180deg,
      rgba($color-nebula-blue, 5%),
      rgba($color-void-purple, 5%)
    );
  }
}
</style>