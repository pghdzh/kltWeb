<template>
  <div class="klaita-resources">
    <!-- 动态背景层 -->
    <div class="crystal-background">
      <div class="crystal-layer crystal-layer-1"></div>
      <div class="crystal-layer crystal-layer-2"></div>
      <div class="crystal-layer crystal-layer-3"></div>
      <div class="crystal-particles"></div>
      <div class="art-decorations">
        <div class="crystal-cluster cluster-1"></div>
        <div class="crystal-cluster cluster-2"></div>
        <div class="opal-gem gem-1"></div>
      </div>
    </div>

    <header class="artistic-hero">
      <div class="hero-content">
        <div class="title-container">
          <h1 class="artistic-title">珂莱塔·艺术晶廊</h1>
          <p class="hero-subtitle">「心意至上，于此凝铸艺术晶质」</p>
        </div>
        <div class="hero-decoration">
          <span class="family-sigil">莫塔里</span>
          <div class="hero-crystals">
            <div class="tiny-crystal"></div>
            <div class="tiny-crystal"></div>
            <div class="tiny-crystal"></div>
          </div>
        </div>
      </div>
    </header>

    <main class="art-container">
      <!-- 上传区域 - 艺术创作面板 -->
      <section class="creation-panel" :class="{ collapsed: uploaderCollapsed }">
        <div class="panel-header">
          <div class="panel-title">
            <span class="panel-icon">🎨</span>
            <h2>艺术晶质上传</h2>
          </div>
          <button
            class="panel-toggle"
            @click="toggleUploader"
            :aria-expanded="!uploaderCollapsed"
          >
            <span class="toggle-text">{{
              uploaderCollapsed ? "展开" : "收起"
            }}</span>
            <div class="toggle-icon" :class="{ rotated: !uploaderCollapsed }">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  fill="currentColor"
                  d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
                />
              </svg>
            </div>
          </button>
        </div>

        <transition name="crystal-expand">
          <form
            v-if="!uploaderCollapsed"
            @submit.prevent="addResource"
            class="art-creation-form"
          >
            <div class="form-grid">
              <div class="form-field">
                <label class="field-label">
                  <span class="label-icon">🏷️</span>
                  晶质标题
                  <span class="field-hint">（可包含解压码等信息）</span>
                </label>
                <input
                  v-model="form.title"
                  type="text"
                  class="art-input"
                  placeholder="请输入艺术晶质的标题"
                  aria-label="标题"
                  required
                />
              </div>

              <div class="form-field">
                <label class="field-label">
                  <span class="label-icon">🔗</span>
                  晶质类型
                </label>
                <select
                  v-model="form.type"
                  class="art-select"
                  aria-label="链接类型"
                >
                  <option value="" disabled selected>请选择类型</option>
                  <option value="网页链接">网页链接</option>
                  <option value="B站视频">B站视频</option>
                  <option value="百度网盘">百度网盘</option>
                  <option value="其他平台">其他平台</option>
                </select>
              </div>

              <div class="form-field">
                <label class="field-label">
                  <span class="label-icon">👤</span>
                  贡献者
                </label>
                <input
                  v-model="form.uploader"
                  type="text"
                  class="art-input"
                  placeholder="可选，请输入贡献者名称"
                  aria-label="上传人"
                />
              </div>

              <div class="form-field">
                <label class="field-label">
                  <span class="label-icon">🌐</span>
                  晶质链接
                </label>
                <input
                  v-model="form.link"
                  type="url"
                  class="art-input"
                  placeholder="请输入完整网址（仅英文与符号）"
                  aria-label="链接"
                  required
                />
              </div>
            </div>

            <div class="form-actions">
              <button type="button" class="art-btn ghost" @click="resetForm">
                <span class="btn-icon">🔄</span>
                重置
              </button>
              <button type="submit" class="art-btn primary">
                <span class="btn-icon">✨</span>
                凝铸晶质
                <div class="btn-glow"></div>
              </button>
            </div>
          </form>
        </transition>
      </section>

      <!-- 资源列表 - 艺术晶廊 -->
      <section class="crystal-gallery">
        <div class="gallery-header">
          <div class="gallery-title">
            <h2>
              <span class="title-icon">💎</span>
              艺术晶廊
              <span class="count-badge">{{ resources.length }}</span>
            </h2>
            <p class="gallery-subtitle">每颗晶质都承载着心意</p>
          </div>

          <div class="gallery-controls">
            <div class="sort-control">
              <label class="sort-label">
                <span class="sort-icon">↕️</span>
                排序方式：
              </label>
              <select v-model="sortBy" class="art-select small">
                <option value="time">时间（新→旧）</option>
                <option value="likes">心意值（高→低）</option>
              </select>
            </div>
          </div>
        </div>

        <div class="crystal-grid">
          <div
            v-for="item in sortedResources"
            :key="item.id"
            class="crystal-card"
            :class="getCardTypeClass(item.type)"
          >
            <div class="card-crystal-border"></div>

            <div class="card-content">
              <a
                :href="item.link"
                target="_blank"
                rel="noopener noreferrer"
                class="card-title"
              >
                <div class="title-text">{{ item.title }}</div>
                <div class="title-arrow">↗</div>
              </a>

              <div class="card-meta">
                <div class="meta-left">
                  <div class="meta-item">
                    <span class="meta-icon">👤</span>
                    <span class="meta-text">{{
                      item.uploader || "匿名艺术家"
                    }}</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-icon">🕒</span>
                    <span class="meta-text">{{ formatTime(item.time) }}</span>
                  </div>
                </div>

                <div class="meta-right">
                  <button
                    @click.prevent="handleLike(item)"
                    :aria-pressed="likedIds.has(String(item.id))"
                    class="klaita-like-btn"
                    :class="{ liked: likedIds.has(String(item.id)) }"
                  >
                    <div class="like-heart">
                      <div class="heart-outer"></div>
                      <div class="heart-inner">❤️</div>
                    </div>
                    <span class="like-count">{{ item.likes }}</span>
                  </button>

                  <div class="type-badge" :class="getBadgeClass(item.type)">
                    {{ item.type || "未分类" }}
                  </div>
                </div>
              </div>
            </div>

            <div class="card-refraction"></div>
          </div>
        </div>

        <div v-if="resources.length === 0" class="empty-gallery">
          <div class="empty-crystal">❄️</div>
          <h3>艺术晶廊尚为空寂</h3>
          <p>成为第一位贡献者，凝铸第一颗艺术晶质</p>
        </div>
      </section>
    </main>

    <footer class="artistic-footer">
      <div class="footer-content">
        <div class="footer-crystals">
          <div class="footer-crystal"></div>
          <div class="footer-crystal"></div>
          <div class="footer-crystal"></div>
        </div>
        <p class="footer-note">点击晶质标题将直接跃迁至对应维度</p>
        <p class="footer-quote">
          「美，不应受观赏者的偏好所限」—— 珂莱塔·莫塔里
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  getResourceList,
  createResource,
  likeResource,
} from "@/api/modules/resource";
import { ElMessage } from "element-plus";

// 珂莱塔主题配色
const KL_COLORS = {
  primary: "#E8F4FF", // 银白主色
  secondary: "#7FD3FF", // 冷海蓝
  accent: "#C77CFF", // 品红点缀
  dark: "#0A1A2A", // 深海夜色
  crystal: "rgba(127, 211, 255, 0.15)",
};

type ResourceType =
  | "网页链接"
  | "B站视频"
  | "百度网盘"
  | "阿里云盘"
  | "其他平台"
  | string;

interface Resource {
  id: number | string;
  title: string;
  uploader?: string;
  time: string;
  likes: number;
  link: string;
  type: ResourceType;
  role_key?: string;
}

const STORAGE_KEY = "klaita_resources_v2";
const DEFAULT_ROLE = "klt";

const form = ref<{
  title: string;
  uploader: string;
  link: string;
  type: ResourceType;
}>({
  title: "",
  uploader: "",
  link: "",
  type: "",
});

const resources = ref<Resource[]>([]);
const likedIds = ref(new Set<string>());
const sortBy = ref<"time" | "likes">("time");
const uploaderCollapsed = ref(false);

function mapServerToLocal(row: any): Resource {
  return {
    id: row.id,
    title: row.title,
    uploader: row.uploader || "匿名",
    time: row.created_at || row.time || new Date().toISOString(),
    likes: row.likes ?? 0,
    link: row.link,
    type: (row.storage_type || row.type || "其他平台") as ResourceType,
    role_key: row.role_key,
  };
}

async function loadResources() {
  try {
    const res: any = await getResourceList({
      role_key: DEFAULT_ROLE,
      page: 1,
      pageSize: 100,
    });
    if (res && res.success && Array.isArray(res.data)) {
      resources.value = res.data.map(mapServerToLocal);
      // 恢复本地点赞状态
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (parsed.liked && Array.isArray(parsed.liked)) {
            parsed.liked.forEach((id: string) => likedIds.value.add(id));
          }
        } catch (e) {
          /* ignore */
        }
      }
      return;
    }
  } catch (err) {
    console.warn("加载资源失败，使用本地缓存", err);
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.liked && Array.isArray(parsed.liked)) {
        parsed.liked.forEach((id: string) => likedIds.value.add(id));
      }
    }
  } catch (e) {
    console.warn("本地加载失败", e);
  }
}

function saveLocalCache() {
  try {
    const liked = Array.from(likedIds.value);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ liked }));
  } catch (e) {
    console.warn("保存本地缓存失败", e);
  }
}

onMounted(() => {
  loadResources();
  uploaderCollapsed.value = window.innerWidth <= 640;
});

function toggleUploader() {
  uploaderCollapsed.value = !uploaderCollapsed.value;
}

async function addResource() {
  const t = form.value.title.trim();
  const l = form.value.link.trim();
  const type = form.value.type;

  if (!t || !l || !type) {
    return ElMessage.warning("请填写完整信息");
  }
  if (!/^https?:\/\//i.test(l)) {
    return ElMessage.error("请输入正确的链接（以 http:// 或 https:// 开头）");
  }

  try {
    const payload = {
      title: t,
      uploader: form.value.uploader.trim() || "匿名艺术家",
      link: l,
      storage_type: type,
      role_key: DEFAULT_ROLE,
    };
    const res: any = await createResource(payload);
    if (res && res.success && res.data) {
      const added = mapServerToLocal(res.data);
      resources.value.unshift(added);
      saveLocalCache();
      resetForm();
      ElMessage.success("艺术晶质已凝铸");
      return;
    }
    ElMessage.error("凝铸失败");
  } catch (err) {
    console.warn("创建资源失败", err);
    ElMessage.error("网络错误，请稍后重试");
  }
}

function resetForm() {
  form.value.title = "";
  form.value.uploader = "";
  form.value.link = "";
  form.value.type = "";
}

async function handleLike(item: Resource) {
  const id = item.id;
  const wasLiked = likedIds.value.has(String(id));

  // 乐观更新
  if (wasLiked) {
    likedIds.value.delete(String(id));
    item.likes = Math.max(0, item.likes - 1);
  } else {
    likedIds.value.add(String(id));
    item.likes++;
  }
  saveLocalCache();

  // 同步后端
  try {
    const action = wasLiked ? "unlike" : "like";
    const res: any = await likeResource(id, action);
    if (
      res &&
      res.success &&
      res.data &&
      typeof res.data.likes !== "undefined"
    ) {
      item.likes = res.data.likes;
    }
  } catch (err) {
    console.warn("点赞接口调用失败，回滚本地状态", err);
    if (wasLiked) {
      likedIds.value.add(String(id));
      item.likes++;
    } else {
      likedIds.value.delete(String(id));
      item.likes = Math.max(0, item.likes - 1);
    }
    saveLocalCache();
  }
}

const sortedResources = computed(() => {
  const arr = [...resources.value];
  if (sortBy.value === "time") {
    arr.sort((a, b) => +new Date(b.time) - +new Date(a.time));
  } else {
    arr.sort((a, b) => b.likes - a.likes);
  }
  return arr;
});

function formatTime(iso: string) {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  } catch (e) {
    return iso;
  }
}

// 卡片样式辅助函数
function getCardTypeClass(type: ResourceType) {
  const typeMap: Record<string, string> = {
    B站视频: "type-video",
    百度网盘: "type-cloud",

    网页链接: "type-web",
    其他平台: "type-other",
  };
  return typeMap[type] || "type-other";
}

function getBadgeClass(type: ResourceType) {
  const typeMap: Record<string, string> = {
    B站视频: "badge-video",
    百度网盘: "badge-cloud",
    阿里云盘: "badge-cloud",
    网页链接: "badge-web",
    其他平台: "badge-other",
  };
  return typeMap[type] || "badge-other";
}
</script>

<style lang="scss" scoped>
/* ==== 珂莱塔主题变量 ==== */
$kl-primary: #e8f4ff; // 银白主色
$kl-secondary: #7fd3ff; // 冷海蓝
$kl-accent: #ff66c4; // 品红点缀
$kl-dark: #0a1a2a; // 深海夜色
$kl-card: rgba(232, 244, 255, 0.08);
$kl-crystal: rgba(127, 211, 255, 0.15);
$kl-text: rgba(232, 244, 255, 0.95);
$kl-muted: rgba(232, 244, 255, 0.7);
$kl-danger: #ff7b9d;
$glow-blue: rgba(127, 211, 255, 0.3);
$glow-purple: rgba(199, 124, 255, 0.3);
$shadow-deep: rgba(2, 12, 26, 0.8);

.klaita-resources {
  min-height: 100vh;
  color: $kl-text;
  position: relative;
  overflow-x: hidden;
  padding-top: 100px;

  /* 动态背景 */
  .crystal-background {
    position: fixed;
    inset: 0;
    z-index: 0;
    background: linear-gradient(135deg, #071625 0%, $kl-dark 100%);
    overflow: hidden;

    .crystal-layer {
      position: absolute;
      inset: 0;
      opacity: 0.05;

      &.crystal-layer-1 {
        background: radial-gradient(
            circle at 20% 30%,
            $glow-blue 0%,
            transparent 50%
          ),
          repeating-linear-gradient(
            45deg,
            transparent,
            transparent 2px,
            $kl-crystal 2px,
            $kl-crystal 4px
          );
      }

      &.crystal-layer-2 {
        background: radial-gradient(
            circle at 80% 70%,
            $glow-purple 0%,
            transparent 50%
          ),
          repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 1px,
            $kl-crystal 1px,
            $kl-crystal 3px
          );
        animation: crystal-drift 20s linear infinite;
      }

      &.crystal-layer-3 {
        background: radial-gradient(
          circle at 50% 50%,
          rgba($kl-accent, 0.1) 0%,
          transparent 70%
        );
        animation: pulse 8s ease-in-out infinite;
      }
    }

    .crystal-particles {
      position: absolute;
      inset: 0;
      background-image: radial-gradient(
          1px 1px at 10% 20%,
          $kl-secondary,
          transparent
        ),
        radial-gradient(1px 1px at 30% 40%, $kl-accent, transparent),
        radial-gradient(2px 2px at 70% 30%, $kl-primary, transparent),
        radial-gradient(1px 1px at 80% 70%, $kl-secondary, transparent),
        radial-gradient(2px 2px at 40% 80%, $kl-accent, transparent);
      animation: particles-float 60s linear infinite;
    }

    .art-decorations {
      .crystal-cluster {
        position: absolute;
        background: linear-gradient(135deg, transparent, $kl-crystal);
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        opacity: 0.1;

        &.cluster-1 {
          width: 120px;
          height: 120px;
          top: 10%;
          left: 5%;
          animation: shard-float 15s ease-in-out infinite;
        }

        &.cluster-2 {
          width: 80px;
          height: 80px;
          bottom: 20%;
          right: 10%;
          animation: shard-float 20s ease-in-out infinite reverse;
        }
      }

      .opal-gem {
        position: absolute;
        width: 40px;
        height: 40px;
        background: radial-gradient(
          circle at 30% 30%,
          $kl-accent,
          transparent 70%
        );
        border-radius: 50%;
        top: 50%;
        left: 15%;
        opacity: 0.08;
        animation: gem-pulse 6s infinite;
      }
    }
  }

  /* 艺术英雄区域 */
  .artistic-hero {
    position: relative;
    z-index: 10;
    padding: 40px 20px;
    margin-bottom: 30px;

    .hero-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;

      .title-container {
        .artistic-title {
          margin: 0;
          font-size: 42px;
          font-weight: 700;
          background: linear-gradient(
            135deg,
            $kl-primary,
            $kl-secondary,
            $kl-accent
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 4px 20px rgba($kl-secondary, 0.3);
          letter-spacing: 1px;
        }

        .hero-subtitle {
          margin: 12px 0 0;
          font-size: 16px;
          color: $kl-muted;
          font-style: italic;
          letter-spacing: 0.5px;
        }
      }

      .hero-decoration {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;

        .family-sigil {
          padding: 8px 20px;
          background: rgba($kl-accent, 0.1);
          border: 1px solid rgba($kl-accent, 0.3);
          border-radius: 20px;
          font-size: 14px;
          color: $kl-accent;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .hero-crystals {
          display: flex;
          gap: 8px;

          .tiny-crystal {
            width: 8px;
            height: 8px;
            background: $kl-secondary;
            border-radius: 50%;
            opacity: 0.6;

            &:nth-child(2) {
              background: $kl-accent;
              animation-delay: 0.2s;
            }

            &:nth-child(3) {
              animation-delay: 0.4s;
            }

            animation: crystal-blink 2s infinite;
          }
        }
      }
    }
  }

  /* 主容器 */
  .art-container {
    position: relative;
    z-index: 10;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px 60px;

    /* 创作面板 */
    .creation-panel {
      background: linear-gradient(
        145deg,
        rgba($kl-primary, 0.05),
        rgba($kl-secondary, 0.03)
      );
      backdrop-filter: blur(10px);
      border-radius: 20px;
      border: 1px solid rgba($kl-primary, 0.1);
      margin-bottom: 30px;
      overflow: hidden;
      box-shadow: 0 20px 40px $shadow-deep;

      .panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 24px;
        background: linear-gradient(
          90deg,
          rgba($kl-secondary, 0.1),
          rgba($kl-accent, 0.05)
        );
        border-bottom: 1px solid rgba($kl-primary, 0.1);

        .panel-title {
          display: flex;
          align-items: center;
          gap: 12px;

          .panel-icon {
            font-size: 24px;
          }

          h2 {
            margin: 0;
            font-size: 20px;
            color: $kl-primary;
            font-weight: 600;
          }
        }

        .panel-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba($kl-primary, 0.1);
          border: 1px solid rgba($kl-secondary, 0.2);
          border-radius: 12px;
          padding: 10px 16px;
          color: $kl-secondary;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            background: rgba($kl-secondary, 0.1);
            border-color: $kl-secondary;
          }

          .toggle-icon {
            transition: transform 0.3s ease;

            &.rotated {
              transform: rotate(180deg);
            }

            svg {
              color: $kl-secondary;
            }
          }
        }
      }

      .art-creation-form {
        padding: 24px;

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 24px;

          @media (max-width: 768px) {
            grid-template-columns: 1fr;
          }

          .form-field {
            .field-label {
              display: flex;
              align-items: center;
              gap: 8px;
              margin-bottom: 8px;
              color: $kl-primary;
              font-weight: 500;
              font-size: 14px;

              .label-icon {
                opacity: 0.8;
              }

              .field-hint {
                font-size: 12px;
                color: $kl-muted;
                font-weight: normal;
                margin-left: 4px;
              }
            }

            .art-input,
            .art-select {
              width: 100%;
              padding: 12px 16px;
              background: rgba($kl-primary, 0.05);
              border: 1px solid rgba($kl-secondary, 0.2);
              border-radius: 12px;
              color: $kl-text;
              font-size: 14px;
              transition: all 0.3s;
              option {
                color: #000;
              }
              &:focus {
                outline: none;
                border-color: $kl-secondary;
                box-shadow: 0 0 0 3px rgba($kl-secondary, 0.1);
                background: rgba($kl-primary, 0.1);
              }

              &::placeholder {
                color: rgba($kl-secondary, 0.5);
              }
            }

            .art-select {
              cursor: pointer;

              &.small {
                padding: 8px 12px;
                font-size: 13px;
              }
            }
          }
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 16px;
          padding-top: 20px;
          border-top: 1px solid rgba($kl-primary, 0.1);

          .art-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;

            &.ghost {
              background: transparent;
              border: 1px solid rgba($kl-secondary, 0.3);
              color: $kl-secondary;

              &:hover {
                background: rgba($kl-secondary, 0.1);
              }
            }

            &.primary {
              background: linear-gradient(135deg, $kl-secondary, $kl-accent);
              border: none;
              color: $kl-dark;

              &:hover {
                transform: translateY(-2px);
                box-shadow: 0 12px 32px rgba($kl-secondary, 0.4);

                .btn-glow {
                  opacity: 1;
                }
              }

              .btn-glow {
                position: absolute;
                inset: 0;
                background: radial-gradient(
                  circle at center,
                  rgba(255, 255, 255, 0.4),
                  transparent 70%
                );
                opacity: 0;
                transition: opacity 0.3s;
              }
            }

            .btn-icon {
              font-size: 16px;
            }
          }
        }
      }

      /* 收起状态 */
      &.collapsed {
        .panel-toggle {
          .toggle-icon {
            transform: rotate(0deg);
          }
        }
      }
    }

    /* 晶体画廊 */
    .crystal-gallery {
      .gallery-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        flex-wrap: wrap;
        gap: 20px;

        .gallery-title {
          display: flex;
          align-items: center;
          gap: 16px;

          h2 {
            margin: 0;
            font-size: 28px;
            color: $kl-primary;
            display: flex;
            align-items: center;
            gap: 12px;

            .title-icon {
              font-size: 24px;
            }

            .count-badge {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              min-width: 32px;
              height: 32px;
              padding: 0 10px;
              background: rgba($kl-accent, 0.2);
              border: 1px solid rgba($kl-accent, 0.3);
              border-radius: 16px;
              font-size: 14px;
              color: $kl-accent;
              margin-left: 12px;
            }
          }

          .gallery-subtitle {
            margin: 4px 0 0;
            color: $kl-muted;
            font-size: 14px;
            font-style: italic;
          }
        }

        .gallery-controls {
          .sort-control {
            display: flex;
            align-items: center;
            gap: 12px;

            .sort-label {
              color: $kl-muted;
              font-size: 14px;
              display: flex;
              align-items: center;
              gap: 6px;
            }
          }
        }
      }

      .crystal-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 24px;

        @media (max-width: 768px) {
          grid-template-columns: 1fr;
        }
      }

      .crystal-card {
        background: linear-gradient(
          145deg,
          rgba($kl-primary, 0.05),
          rgba($kl-secondary, 0.03)
        );
        backdrop-filter: blur(10px);
        border-radius: 16px;
        padding: 24px;
        border: 1px solid rgba($kl-primary, 0.1);
        position: relative;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;

        &:hover {
          transform: translateY(-6px);
          border-color: rgba($kl-secondary, 0.4);
          box-shadow: 0 20px 40px rgba(2, 12, 26, 0.6),
            0 0 60px rgba($kl-secondary, 0.1);

          .card-crystal-border {
            opacity: 1;
          }

          .card-refraction {
            opacity: 0.3;
          }
        }

        /* 卡片类型样式 */
        &.type-video {
          background: linear-gradient(
            145deg,
            rgba(255, 107, 107, 0.05),
            rgba(107, 107, 255, 0.03)
          );
        }

        &.type-web {
          background: linear-gradient(
            145deg,
            rgba(199, 124, 255, 0.05),
            rgba(124, 255, 255, 0.03)
          );
        }

        .card-crystal-border {
          position: absolute;
          inset: 0;
          border: 2px solid transparent;
          border-radius: 16px;
          background: linear-gradient(135deg, $kl-secondary, $kl-accent)
            border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s;
        }

        .card-content {
          position: relative;
          z-index: 2;

          .card-title {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 16px;
            text-decoration: none;
            margin-bottom: 20px;

            .title-text {
              flex: 1;
              color: $kl-primary;
              font-size: 18px;
              font-weight: 600;
              line-height: 1.5;
              transition: color 0.3s;
            }

            .title-arrow {
              color: $kl-secondary;
              font-size: 20px;
              opacity: 0.7;
              transition: transform 0.3s;
            }

            &:hover {
              .title-text {
                color: $kl-secondary;
              }

              .title-arrow {
                transform: translate(3px, -3px);
              }
            }
          }

          .card-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 12px;

            .meta-left {
              display: flex;
              gap: 16px;
              flex-wrap: wrap;

              .meta-item {
                display: flex;
                align-items: center;
                gap: 6px;
                color: $kl-muted;
                font-size: 13px;

                .meta-icon {
                  opacity: 0.7;
                  font-size: 12px;
                }
              }
            }

            .meta-right {
              display: flex;
              align-items: center;
              gap: 12px;

              .klaita-like-btn {
                display: flex;
                align-items: center;
                gap: 6px;
                background: rgba($kl-primary, 0.1);
                border: 1px solid rgba($kl-secondary, 0.2);
                border-radius: 20px;
                padding: 8px 12px;
                color: $kl-muted;
                font-size: 13px;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;

                &:hover {
                  background: rgba($kl-secondary, 0.1);
                  border-color: $kl-secondary;
                }

                &.liked {
                  background: rgba($kl-danger, 0.1);
                  border-color: $kl-danger;
                  color: $kl-danger;

                  .heart-outer {
                    animation: heart-beat 0.6s ease;
                  }

                  .like-sparkles {
                    opacity: 1;
                  }
                }

                .like-heart {
                  position: relative;
                  width: 20px;
                  height: 20px;

                  .heart-outer {
                    position: absolute;
                    inset: 0;
                    background: $kl-danger;
                    border-radius: 50%;
                    transform: scale(0);
                    transition: transform 0.3s;
                  }

                  .heart-inner {
                    position: relative;
                    z-index: 1;
                  }
                }

                .like-count {
                  font-weight: 600;
                }

                .like-sparkles {
                  position: absolute;
                  inset: 0;
                  background: radial-gradient(
                    circle at center,
                    rgba(255, 255, 255, 0.8),
                    transparent 70%
                  );
                  opacity: 0;
                  transition: opacity 0.3s;
                }
                &.active .heart-core {
                  transform: scale(1);
                }

                .like-count {
                  font-weight: 600;
                }
              }

              .type-badge {
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;

                &.badge-video {
                  background: rgba(255, 107, 107, 0.1);
                  color: #ff6b6b;
                  border: 1px solid rgba(255, 107, 107, 0.3);
                }

                &.badge-cloud {
                  background: rgba(127, 211, 255, 0.1);
                  color: $kl-secondary;
                  border: 1px solid rgba(127, 211, 255, 0.3);
                }

                &.badge-web {
                  background: rgba(199, 124, 255, 0.1);
                  color: $kl-accent;
                  border: 1px solid rgba(199, 124, 255, 0.3);
                }

                &.badge-other {
                  background: rgba($kl-primary, 0.1);
                  color: $kl-muted;
                  border: 1px solid rgba($kl-primary, 0.2);
                }
              }
            }
          }
        }

        .card-refraction {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 50% 0%,
            rgba($kl-secondary, 0.1),
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }
      }

      .empty-gallery {
        text-align: center;
        padding: 80px 20px;

        .empty-crystal {
          font-size: 64px;
          margin-bottom: 20px;
          opacity: 0.5;
          animation: crystal-pulse 3s infinite;
        }

        h3 {
          color: $kl-primary;
          margin: 0 0 12px;
          font-size: 24px;
        }

        p {
          color: $kl-muted;
          margin: 0;
          font-size: 16px;
        }
      }
    }
  }

  /* 艺术页脚 */
  .artistic-footer {
    position: relative;
    z-index: 10;
    margin-top: 60px;
    padding: 40px 20px;
    border-top: 1px solid rgba($kl-primary, 0.1);

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;

      .footer-crystals {
        display: flex;
        justify-content: center;
        gap: 16px;
        margin-bottom: 20px;

        .footer-crystal {
          width: 12px;
          height: 12px;
          background: linear-gradient(135deg, $kl-secondary, $kl-accent);
          border-radius: 50%;
          opacity: 0.6;
          animation: crystal-blink 2s infinite;

          &:nth-child(2) {
            animation-delay: 0.2s;
          }

          &:nth-child(3) {
            animation-delay: 0.4s;
          }
        }
      }

      .footer-note {
        color: $kl-muted;
        font-size: 14px;
        margin: 0 0 12px;
      }

      .footer-quote {
        color: rgba($kl-accent, 0.8);
        font-size: 16px;
        font-style: italic;
        margin: 0;
      }
    }
  }
}

/* 动画定义 */
@keyframes crystal-drift {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(10px, -10px) rotate(1deg);
  }
  50% {
    transform: translate(-5px, 15px) rotate(-1deg);
  }
  75% {
    transform: translate(-15px, -5px) rotate(2deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.2;
  }
}

@keyframes particles-float {
  0% {
    transform: translateY(0) translateX(0);
  }
  100% {
    transform: translateY(-1000px) translateX(100px);
  }
}

@keyframes shard-float {
  0%,
  100% {
    transform: rotate(15deg) translateY(0);
  }
  50% {
    transform: rotate(15deg) translateY(-20px);
  }
}

@keyframes gem-pulse {
  0%,
  100% {
    opacity: 0.08;
    transform: scale(1);
  }
  50% {
    opacity: 0.12;
    transform: scale(1.1);
  }
}

@keyframes sparkle {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

@keyframes crystal-blink {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

@keyframes crystal-pulse {
  0%,
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

@keyframes heart-beat {
  0% {
    transform: scale(0);
  }
  70% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

/* 展开过渡动画 */
.crystal-expand-enter-active,
.crystal-expand-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.crystal-expand-enter-from,
.crystal-expand-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-20px);
}

.crystal-expand-enter-to,
.crystal-expand-leave-from {
  max-height: 600px;
  opacity: 1;
  transform: translateY(0);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .klaita-resources {
    padding-top: 80px;

    .artistic-hero {
      padding: 30px 16px;

      .hero-content {
        flex-direction: column;
        text-align: center;

        .title-container {
          .artistic-title {
            font-size: 32px;
          }

          .hero-subtitle {
            font-size: 14px;
          }
        }
      }
    }

    .art-container {
      padding: 0 16px 40px;
    }

    .crystal-grid {
      grid-template-columns: 1fr !important;
    }

    .form-grid {
      grid-template-columns: 1fr !important;
    }
  }
}
</style>