<template>
  <div class="klaita-wiki-page">
    <!-- 背景轮播放在最底层 -->
    <div class="crystal-carousel">
      <img
        v-for="(src, idx) in randomFive"
        :key="idx"
        :src="src"
        class="carousel-image"
        :class="{ active: idx === currentIndex }"
      />
      <!-- 冰晶粒子效果层 -->
      <div class="crystal-particles"></div>
    </div>

    <!-- 顶部艺术装饰 -->
    <div class="artistic-header-decoration">
      <div class="crystal-shard shard-1"></div>
      <div class="crystal-shard shard-2"></div>
      <div class="opal-gem gem-1"></div>
    </div>

    <header class="klaita-wiki-header">
      <div class="title-section">
        <div class="title-with-icon">
          <div class="gun-icon">🔫</div>
          <h1>珂莱塔·文本回廊</h1>
        </div>
        <p class="subtitle">「心意至上」——于此凝铸家族的记忆</p>
        
      </div>

      <div class="header-actions">
        <div class="search-container">
          <div class="search-icon">🔍</div>
          <input
            v-model="search"
            class="art-search"
            placeholder="在晶质中寻觅..."
          />
          <div class="search-crystal"></div>
        </div>

        <button class="btn-artistic" @click="openCreate">
          <span class="btn-sparkle">✨</span>
          新建艺术记录
          <span class="btn-glow"></span>
        </button>
      </div>
    </header>

    <main class="klaita-wiki-body">
      <div v-if="filteredEntries.length === 0" class="elegant-empty">
        <div class="empty-crystal">❄️</div>
        <p>尚未寻得匹配的晶质记录</p>
        <p class="empty-hint">尝试用「必要性手段」创造新的艺术</p>
      </div>

      <div class="gallery-grid">
        <div
          v-for="entry in filteredEntries"
          :key="entry.id"
          class="art-gallery-card"
          :class="{ 'mine-entry': canEdit(entry.id) }"
        >
          <div class="card-crystal-border"></div>

          <div class="card-header" @click="openDetail(entry)">
            <div class="card-title-section">
              <h2 class="art-title">{{ entry.title }}</h2>
              <div class="art-tag" :style="getTagColor(entry.slug)">
                #{{ entry.slug || "无标签" }}
              </div>
            </div>

            <div class="card-meta">
              <div class="meta-item">
                <span class="meta-icon">👩‍🎨</span>
                <span class="meta-text">{{
                  entry.author || "匿名作者"
                }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-icon">⏳</span>
                <span class="meta-text">{{ formatTime(entry.updatedAt) }}</span>
              </div>
            </div>
          </div>

          <div class="card-actions">
            <button
              class="klaita-like-btn"
              :class="{ liked: isLiked(entry.id) }"
              @click.stop="toggleLike(entry.id)"
            >
              <div class="like-heart">
                <div class="heart-outer"></div>
                <div class="heart-inner">❤️</div>
              </div>
              <span class="like-count">{{ entry.likes || 0 }}</span>
              <div class="like-sparkles"></div>
            </button>

            <div class="art-actions" v-if="canEdit(entry.id)">
              <button class="art-btn edit-art" @click="openEdit(entry)">
                <span class="btn-icon">✏️</span>
                重塑
              </button>
              <button class="art-btn delete-art" @click="remove(entry.id)">
                <span class="btn-icon">🗑️</span>
                解构
              </button>
            </div>
          </div>

        
        </div>
      </div>
    </main>

    <!-- 编辑/创建模态框 -->
    <transition name="crystal-fade">
      <div class="art-modal-overlay" v-if="showModal">
        <div class="art-modal">
          <div class="modal-crystal-corner tl"></div>
          <div class="modal-crystal-corner tr"></div>
          <div class="modal-crystal-corner bl"></div>
          <div class="modal-crystal-corner br"></div>

          <header class="art-modal-header">
            <h3>
              <span class="modal-icon">{{ editing ? "🔄" : "🆕" }}</span>
              {{ editing ? "重塑艺术记录" : "创作新的艺术记录" }}
            </h3>
            <button class="modal-close" @click="closeModal">
              <span class="close-icon">⨯</span>
            </button>
          </header>

          <section class="art-modal-body">
            <div class="form-row">
              <label class="art-label">
                <span class="label-icon">🏷️</span>
                标题
                <div class="label-hint">艺术品的名称</div>
              </label>
              <input
                v-model="form.title"
                class="art-input"
                placeholder="如：「雨夜·家族肖像」"
              />
            </div>

            <div class="form-row">
              <label class="art-label">
                <span class="label-icon">🔖</span>
                标签
                <div class="label-hint">用于分类的关键词</div>
              </label>
              <input
                v-model="form.slug"
                class="art-input"
                placeholder="如：家族、艺术、记忆、雨夜"
              />
            </div>

            <div class="form-row">
              <label class="art-label">
                <span class="label-icon">👤</span>
                创作者
                <div class="label-hint">您的作者名号</div>
              </label>
              <input
                v-model="form.author"
                class="art-input"
                placeholder="如：珂莱塔·莫塔里"
              />
            </div>

            <div class="form-row">
              <label class="art-label">
                <span class="label-icon">📝</span>
                艺术内容
                <div class="label-hint">在此倾注您的情感与技艺</div>
              </label>
              <textarea
                v-model="form.content"
                class="art-textarea"
                rows="6"
                placeholder="每一笔触都承载着心意..."
              ></textarea>
            </div>
          </section>

          <footer class="art-modal-footer">
            <button class="modal-btn ghost" @click="closeModal">取消</button>
            <button
              class="modal-btn primary"
              @click="submit"
              :disabled="!canSubmit"
              :class="{ disabled: !canSubmit }"
            >
              <span class="submit-sparkle">✨</span>
              {{ editing ? "保存重塑" : "凝铸艺术" }}
            </button>
          </footer>
        </div>
      </div>
    </transition>

    <!-- 详情模态框 -->
    <transition name="crystal-fade">
      <div class="art-modal-overlay" v-if="detailEntry">
        <div class="art-modal detail-modal">
          <div class="modal-crystal-corner tl"></div>
          <div class="modal-crystal-corner tr"></div>

          <header class="art-modal-header">
            <h3 class="detail-title">
              <span class="title-gem">💎</span>
              {{ detailEntry.title }}
            </h3>
            <button class="modal-close" @click="detailEntry = null">
              <span class="close-icon">⨯</span>
            </button>
          </header>

          <section class="art-modal-body">
            <div class="detail-meta">
              <div class="detail-meta-item">
                <strong>作者：</strong>{{ detailEntry.author }}
              </div>
              <div class="detail-meta-item">
                <strong>创作时间：</strong
                >{{ formatTime(detailEntry.updatedAt) }}
              </div>
              <div class="detail-meta-item" v-if="detailEntry.slug">
                <strong>标签：</strong>
                <span class="detail-tag">{{ detailEntry.slug }}</span>
              </div>
            </div>

            <div class="detail-content">
              <div class="content-border"></div>
              <div class="content-text">{{ detailEntry.content }}</div>
              <div class="content-signature">—— 此乃心意的证明</div>
            </div>
          </section>
        </div>
      </div>
    </transition>

    <!-- 底部艺术签名 -->
    <footer class="klaita-footer">
      <div class="footer-content">
        <div class="footer-crystal"></div>
        <p class="footer-quote">「美，不应受观赏者的偏好所限」</p>
        <p class="footer-credit">—— 珂莱塔·莫塔里 · 艺术回廊</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
import { ElMessage } from "element-plus";
import {
  getWikiList,
  createWiki,
  updateWiki,
  deleteWiki,
  likeWiki,
} from "@/api/modules/wiki";

// 珂莱塔风格配色系统
const KL_COLORS = {
  primary: "#E8F4FF", // 银白主色
  secondary: "#7FD3FF", // 冷海蓝
  accent: "#C77CFF", // 品红点缀
  darkBg: "#0A1A2A", // 深海夜色
  cardBg: "rgba(232, 244, 255, 0.08)",
  crystal: "rgba(127, 211, 255, 0.15)",
  danger: "#FF7B9D", // 品红危险色
};

// 本地存储自己创建的词条 ID
const LS_MY_WIKI_IDS = "klaita:wiki:my_ids";
const myWikiIds: string[] = JSON.parse(
  localStorage.getItem(LS_MY_WIKI_IDS) || "[]"
);
const markAsMine = (id: string | number) => {
  if (!myWikiIds.includes(String(id))) {
    myWikiIds.push(String(id));
    localStorage.setItem(LS_MY_WIKI_IDS, JSON.stringify(myWikiIds));
  }
};
const canEdit = (id: string | number) => myWikiIds.includes(String(id));

// 数据状态
const entries = ref<any[]>([]);

// 本地存储键
const LS_LIKED_IDS = "klaita:wiki:liked_ids";
const likedIds = ref<string[]>(
  JSON.parse(localStorage.getItem(LS_LIKED_IDS) || "[]")
);

const showModal = ref(false);
const editing = ref(false);
const editingId = ref<string | number | null>(null);
const detailEntry = ref<any>(null);
const form = reactive({ title: "", slug: "", author: "", content: "" });
const search = ref("");

// 标签颜色生成
function getTagColor(tag: string) {
  if (!tag) return { background: KL_COLORS.crystal };

  const colors = [
    "linear-gradient(135deg, #7FD3FF22, #C77CFF22)",
    "linear-gradient(135deg, #7FD3FF33, #E8F4FF33)",
    "linear-gradient(135deg, #C77CFF22, #FF7B9D22)",
    "linear-gradient(135deg, #E8F4FF33, #7FD3FF33)",
  ];

  const hash = tag.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return { background: colors[hash % colors.length] };
}

// 时间格式化
function formatTime(ts: string | number | null | undefined) {
  if (!ts) return "未记录时间";
  const date = new Date(ts);
  if (isNaN(date.getTime())) return "时间未明";
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

// 加载词条列表
async function loadEntries() {
  try {
    const res: any = await getWikiList();
    entries.value = res.data.map((e: any) => ({
      ...e,
      createdAt: e.createdAt || e.created_at,
      updatedAt: e.updatedAt || e.updated_at,
    }));
  } catch (err) {
    console.error(err);
    ElMessage.error("加载艺术记录失败");
  }
}

// 打开/关闭弹窗
function openCreate() {
  editing.value = false;
  editingId.value = null;
  form.title = "";
  form.slug = "";
  form.author = "";
  form.content = "";
  showModal.value = true;
}

function openEdit(entry: any) {
  if (!canEdit(entry.id)) {
    ElMessage.warning("仅艺术创作者可进行重塑");
    return;
  }
  editing.value = true;
  editingId.value = entry.id;
  form.title = entry.title;
  form.slug = entry.slug;
  form.author = entry.author;
  form.content = entry.content;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

const canSubmit = computed(() => form.title.trim() && form.content.trim());

// 提交
async function submit() {
  if (!canSubmit.value) {
    ElMessage.warning("请填写艺术品名称与内容");
    return;
  }
  const payload = {
    title: form.title.trim(),
    author: form.author.trim() || "匿名作者",
    content: form.content.trim(),
    slug: null,
  };
  if (form.slug.trim()) payload.slug = form.slug.trim();
  try {
    if (editing.value && editingId.value) {
      await updateWiki(editingId.value, payload);
      ElMessage.success("艺术重塑成功");
    } else {
      const res: any = await createWiki(payload);
      markAsMine(res.data.id);
      editingId.value = res.data.id;
      ElMessage.success("艺术创作已凝铸");
    }
    showModal.value = false;
    loadEntries();
  } catch (err) {
    console.error(err);
    ElMessage.error("创作失败");
  }
}

// 删除
async function remove(id: string | number) {
  if (!canEdit(id)) {
    ElMessage.warning("仅艺术创作者可进行解构");
    return;
  }
  if (!confirm("确认解构此艺术记录？此乃不可逆之过程")) return;
  try {
    await deleteWiki(id);
    const index = myWikiIds.indexOf(String(id));
    if (index !== -1) myWikiIds.splice(index, 1);
    localStorage.setItem(LS_MY_WIKI_IDS, JSON.stringify(myWikiIds));
    ElMessage.success("艺术已解构");
    loadEntries();
  } catch (err) {
    console.error(err);
    ElMessage.error("解构失败");
  }
}

// 点赞
function persistLikedIds() {
  try {
    localStorage.setItem(LS_LIKED_IDS, JSON.stringify(likedIds.value));
  } catch (e) {
    console.warn("保存喜欢记录失败", e);
  }
}

function isLiked(id: string | number) {
  return likedIds.value.includes(String(id));
}

async function toggleLike(id: string | number) {
  const entry = entries.value.find((e) => e.id === id);
  if (!entry) return;

  const idStr = String(id);
  const wasLiked = likedIds.value.includes(idStr);

  // 乐观更新
  if (wasLiked) {
    entry.likes = Math.max(0, (entry.likes || 0) - 1);
    likedIds.value = likedIds.value.filter((x) => x !== idStr);
  } else {
    entry.likes = (entry.likes || 0) + 1;
    likedIds.value.push(idStr);
  }
  persistLikedIds();

  try {
    const action = wasLiked ? "unlike" : "like";
    await likeWiki(id, action);
  } catch (err) {
    console.error("toggleLike error", err);
    if (wasLiked) {
      entry.likes = (entry.likes || 0) + 1;
      if (!likedIds.value.includes(idStr)) likedIds.value.push(idStr);
    } else {
      entry.likes = Math.max(0, (entry.likes || 0) - 1);
      likedIds.value = likedIds.value.filter((x) => x !== idStr);
    }
    persistLikedIds();
    ElMessage.error("心意传达失败");
  }
}

// 详情弹窗
async function openDetail(entry: any) {
  detailEntry.value = entry;
}

// 搜索过滤
const filteredEntries = computed(() => {
  const q = String(search.value || "")
    .trim()
    .toLowerCase();
  let list = entries.value;

  if (q) {
    list = list.filter(
      (e) =>
        (e.title || "").toLowerCase().includes(q) ||
        (e.slug || "").toLowerCase().includes(q) ||
        (e.content || "").toLowerCase().includes(q)
    );
  }

  // 按更新时间排序（新的在前）
  return [...list].sort((a, b) => {
    const timeA = new Date(a.updatedAt || a.createdAt || 0).getTime();
    const timeB = new Date(b.updatedAt || b.createdAt || 0).getTime();
    return timeB - timeA;
  });
});

// 图片轮播逻辑
const pcModules = import.meta.glob("@/assets/images1/*.{jpg,png,jpeg,webp}", {
  eager: true,
});
const mobileModules = import.meta.glob(
  "@/assets/images2/*.{jpg,png,jpeg,webp}",
  { eager: true }
);

const pcSrcs: string[] = Object.values(pcModules).map((m: any) => m.default);
const mobileSrcs: string[] = Object.values(mobileModules).map(
  (m: any) => m.default
);

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const randomFive = ref<string[]>([]);
const currentIndex = ref(0);
let timer: number;

function pickImages() {
  const isMobile = window.innerWidth < 768;
  const all = isMobile ? mobileSrcs : pcSrcs;
  randomFive.value = shuffle(all).slice(0, 5);
}

onMounted(() => {
  loadEntries();
  pickImages();
  window.addEventListener("resize", pickImages);

  timer = window.setInterval(() => {
    if (randomFive.value.length > 0) {
      currentIndex.value = (currentIndex.value + 1) % randomFive.value.length;
    }
  }, 6000);
});

onUnmounted(() => {
  clearInterval(timer);
  window.removeEventListener("resize", pickImages);
});
</script>

<style scoped lang="scss">
/* ==== 珂莱塔主题变量 ==== */
$kl-primary: #e8f4ff; // 银白主色
$kl-secondary: #7fd3ff; // 冷海蓝
$kl-accent: #ff66c4; // 品红点缀
$kl-dark: #0a1a2a; // 深海夜色
$kl-card: rgba(232, 244, 255, 0.08);
$kl-crystal: rgba(127, 211, 255, 0.15);
$kl-danger: #ff7b9d;
$kl-text: rgba(232, 244, 255, 0.95);

$shadow-deep: rgba(2, 12, 26, 0.8);
$inset-light: rgba(255, 255, 255, 0.05);
$glow-blue: rgba(127, 211, 255, 0.3);
$glow-purple: rgba(199, 124, 255, 0.3);

.klaita-wiki-page {
  min-height: 100vh;
  color: $kl-text;
  padding: 20px;
  box-sizing: border-box;
  padding-top: 100px;
  background: linear-gradient(180deg, #071625 0%, $kl-dark 100%);
  position: relative;
  overflow-x: hidden;

  /* 背景轮播 */
  .crystal-carousel {
    position: fixed;
    inset: 0;
    z-index: 0;

    .carousel-image {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 1.5s ease;
    }

    .carousel-image.active {
      opacity: 0.4;
    }

    .crystal-particles {
      position: absolute;
      inset: 0;
      background: radial-gradient(
          circle at 20% 30%,
          $glow-blue 0%,
          transparent 50%
        ),
        radial-gradient(circle at 80% 70%, $glow-purple 0%, transparent 50%);
      opacity: 0.1;
      animation: crystal-float 20s infinite linear;
    }
  }

  /* 艺术装饰元素 */
  .artistic-header-decoration {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 300px;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;

    .crystal-shard {
      position: absolute;
      background: linear-gradient(135deg, transparent, $kl-crystal);
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);

      &.shard-1 {
        width: 120px;
        height: 120px;
        top: 20px;
        left: 10%;
        opacity: 0.15;
        transform: rotate(15deg);
        animation: shard-float 12s ease-in-out infinite;
      }

      &.shard-2 {
        width: 80px;
        height: 80px;
        top: 60px;
        right: 15%;
        opacity: 0.1;
        transform: rotate(-20deg);
        animation: shard-float 15s ease-in-out infinite reverse;
      }
    }

    .opal-gem {
      position: absolute;
      width: 60px;
      height: 60px;
      background: radial-gradient(
        circle at 30% 30%,
        $kl-accent,
        transparent 70%
      );
      border-radius: 50%;
      top: 40px;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0.08;
      animation: gem-pulse 8s infinite;
    }
  }

  /* 主标题区域 */
  .klaita-wiki-header {
    position: relative;
    z-index: 10;
    background: linear-gradient(
      135deg,
      rgba($kl-primary, 0.03),
      rgba($kl-secondary, 0.02)
    );
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 24px;
    margin-bottom: 30px;
    border: 1px solid rgba($kl-primary, 0.08);
    box-shadow: 0 20px 40px $shadow-deep, 0 0 60px rgba($kl-secondary, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent,
        $kl-secondary,
        transparent
      );
    }

    .title-section {
      margin-bottom: 20px;

      .title-with-icon {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 8px;

        .gun-icon {
          font-size: 24px;
          opacity: 0.8;
        }

        h1 {
          margin: 0;
          font-size: 32px;
          font-weight: 700;
          background: linear-gradient(135deg, $kl-primary, $kl-secondary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 4px 20px rgba($kl-secondary, 0.3);
          letter-spacing: 1px;
        }
      }

      .subtitle {
        margin: 8px 0;
        font-size: 14px;
        color: rgba($kl-secondary, 0.9);
        font-style: italic;
      }

    }

    .header-actions {
      display: flex;
      gap: 16px;
      align-items: center;
      flex-wrap: wrap;

      .search-container {
        flex: 1;
        min-width: 300px;
        position: relative;

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: $kl-secondary;
          font-size: 16px;
        }

        .art-search {
          width: 100%;
          padding: 12px 16px 12px 40px;
          background: rgba($kl-dark, 0.6);
          border: 1px solid rgba($kl-secondary, 0.2);
          border-radius: 12px;
          color: $kl-text;
          font-size: 14px;
          transition: all 0.3s ease;

          &:focus {
            outline: none;
            border-color: $kl-secondary;
            box-shadow: 0 0 0 3px rgba($kl-secondary, 0.2);
            background: rgba($kl-dark, 0.8);
          }

          &::placeholder {
            color: rgba($kl-secondary, 0.6);
          }
        }

        .search-crystal {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 8px;
          height: 8px;
          background: $kl-secondary;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s;
        }

        &:focus-within .search-crystal {
          opacity: 1;
        }
      }

      .btn-artistic {
        position: relative;
        background: linear-gradient(135deg, $kl-secondary, $kl-accent);
        color: $kl-dark;
        border: none;
        border-radius: 12px;
        padding: 12px 24px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        overflow: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 8px 24px rgba($kl-secondary, 0.3);

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba($kl-secondary, 0.4);

          .btn-glow {
            opacity: 1;
          }
        }

        .btn-sparkle {
          margin-right: 8px;
          animation: sparkle 2s infinite;
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
    }
  }

  /* 内容区域 */
  .klaita-wiki-body {
    position: relative;
    z-index: 10;

    .elegant-empty {
      text-align: center;
      padding: 80px 20px;

      .empty-crystal {
        font-size: 48px;
        margin-bottom: 20px;
        opacity: 0.5;
        animation: crystal-pulse 3s infinite;
      }

      p {
        color: rgba($kl-secondary, 0.8);
        margin: 8px 0;
        font-size: 16px;
      }

      .empty-hint {
        font-size: 14px;
        color: rgba($kl-accent, 0.7);
        font-style: italic;
      }
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
      margin-top: 20px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .art-gallery-card {
      background: linear-gradient(
        145deg,
        rgba($kl-primary, 0.05),
        rgba($kl-secondary, 0.03)
      );
      backdrop-filter: blur(10px);
      border-radius: 16px;
      padding: 20px;
      position: relative;
      border: 1px solid rgba($kl-primary, 0.08);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;

      &:hover {
        transform: translateY(-4px);
        border-color: rgba($kl-secondary, 0.3);
        box-shadow: 0 20px 40px rgba(2, 12, 26, 0.6),
          0 0 60px rgba($kl-secondary, 0.1),
          inset 0 0 0 1px rgba($kl-primary, 0.1);

        .card-crystal-border {
          opacity: 1;
        }
      }

      &.mine-entry {
        background: linear-gradient(
          145deg,
          rgba($kl-accent, 0.08),
          rgba($kl-secondary, 0.04)
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
        pointer-events: none;
      }

      .card-header {
        cursor: pointer;
        margin-bottom: 20px;

        .card-title-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 12px;

          .art-title {
            margin: 0;
            font-size: 18px;
            font-weight: 600;
            color: $kl-primary;
            flex: 1;
          }

          .art-tag {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            color: rgba($kl-primary, 0.9);
            white-space: nowrap;
          }
        }

        .card-meta {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;

          .meta-item {
            display: flex;
            align-items: center;
            gap: 6px;
            color: rgba($kl-secondary, 0.9);
            font-size: 13px;

            .meta-icon {
              opacity: 0.7;
            }
          }
        }
      }

      .card-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid rgba($kl-primary, 0.08);

        .klaita-like-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: 1px solid rgba($kl-secondary, 0.2);
          border-radius: 20px;
          padding: 8px 16px;
          color: $kl-secondary;
          font-size: 14px;
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
        }

        .art-actions {
          display: flex;
          gap: 8px;

          .art-btn {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 8px 16px;
            border-radius: 12px;
            border: 1px solid;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.3s;

            &.edit-art {
              background: rgba($kl-secondary, 0.1);
              border-color: rgba($kl-secondary, 0.3);
              color: $kl-secondary;

              &:hover {
                background: rgba($kl-secondary, 0.2);
              }
            }

            &.delete-art {
              background: rgba($kl-danger, 0.1);
              border-color: rgba($kl-danger, 0.3);
              color: $kl-danger;

              &:hover {
                background: rgba($kl-danger, 0.2);
              }
            }

            .btn-icon {
              font-size: 14px;
            }
          }
        }
      }

      
    }
  }

  /* 模态框 */
  .art-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(2, 12, 26, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(5px);

    .art-modal {
      position: relative;
      width: min(800px, 90%);
      max-height: 90vh;
      overflow-y: auto;
      background: linear-gradient(
        145deg,
        rgba($kl-dark, 0.95),
        rgba(#071625, 0.98)
      );
      backdrop-filter: blur(20px);
      border-radius: 20px;
      padding: 30px;
      border: 1px solid rgba($kl-primary, 0.1);
      box-shadow: 0 40px 80px rgba(0, 0, 0, 0.8),
        0 0 100px rgba($kl-secondary, 0.2);

      .modal-crystal-corner {
        position: absolute;
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, $kl-secondary, transparent 70%);
        opacity: 0.3;

        &.tl {
          top: 0;
          left: 0;
          border-radius: 20px 0 0 0;
        }

        &.tr {
          top: 0;
          right: 0;
          border-radius: 0 20px 0 0;
          background: linear-gradient(225deg, $kl-accent, transparent 70%);
        }

        &.bl {
          bottom: 0;
          left: 0;
          border-radius: 0 0 0 20px;
          background: linear-gradient(45deg, $kl-secondary, transparent 70%);
        }

        &.br {
          bottom: 0;
          right: 0;
          border-radius: 0 0 20px 0;
          background: linear-gradient(315deg, $kl-accent, transparent 70%);
        }
      }

      .art-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 1px solid rgba($kl-primary, 0.1);

        h3 {
          margin: 0;
          font-size: 24px;
          color: $kl-primary;
          display: flex;
          align-items: center;
          gap: 12px;

          .modal-icon {
            font-size: 20px;
          }
        }

        .modal-close {
          background: rgba($kl-primary, 0.1);
          border: 1px solid rgba($kl-primary, 0.2);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: $kl-primary;
          transition: all 0.3s;

          &:hover {
            background: rgba($kl-primary, 0.2);
            transform: rotate(90deg);
          }
        }
      }

      .art-modal-body {
        .form-row {
          margin-bottom: 24px;

          .art-label {
            display: block;
            margin-bottom: 8px;
            color: $kl-primary;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;

            .label-icon {
              opacity: 0.8;
            }

            .label-hint {
              margin-left: auto;
              font-size: 12px;
              color: rgba($kl-secondary, 0.7);
              font-weight: normal;
            }
          }

          .art-input,
          .art-textarea {
            width: 100%;
            padding: 12px 16px;
            background: rgba($kl-primary, 0.05);
            border: 1px solid rgba($kl-secondary, 0.2);
            border-radius: 12px;
            color: $kl-text;
            font-size: 14px;
            transition: all 0.3s;

            &:focus {
              outline: none;
              border-color: $kl-secondary;
              background: rgba($kl-primary, 0.1);
              box-shadow: 0 0 0 3px rgba($kl-secondary, 0.1);
            }

            &::placeholder {
              color: rgba($kl-secondary, 0.5);
            }
          }

          .art-textarea {
            resize: vertical;
            min-height: 120px;
            line-height: 1.6;
          }
        }

        /* 详情页样式 */
        .detail-title {
          font-size: 28px;
          margin-bottom: 24px;

          .title-gem {
            margin-right: 12px;
            animation: gem-spin 4s linear infinite;
          }
        }

        .detail-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 30px;
          padding: 20px;
          background: rgba($kl-primary, 0.05);
          border-radius: 12px;

          .detail-meta-item {
            color: rgba($kl-primary, 0.9);
            font-size: 14px;

            strong {
              color: $kl-secondary;
              font-weight: 600;
            }

            .detail-tag {
              display: inline-block;
              padding: 4px 12px;
              background: linear-gradient(135deg, $kl-secondary, $kl-accent);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              font-weight: 600;
            }
          }
        }

        .detail-content {
          position: relative;
          padding: 30px;

          .content-border {
            position: absolute;
            inset: 0;
            border: 1px solid rgba($kl-secondary, 0.2);
            border-radius: 12px;
            pointer-events: none;
          }

          .content-text {
            color: $kl-text;
            font-size: 16px;
            line-height: 1.8;
            white-space: pre-wrap;
          }

          .content-signature {
            margin-top: 40px;
            text-align: right;
            color: rgba($kl-accent, 0.8);
            font-style: italic;
            font-size: 14px;
            padding-top: 20px;
            border-top: 1px solid rgba($kl-primary, 0.1);
          }
        }
      }

      .art-modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 16px;
        margin-top: 40px;
        padding-top: 20px;
        border-top: 1px solid rgba($kl-primary, 0.1);

        .modal-btn {
          padding: 12px 32px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;

          &.ghost {
            background: transparent;
            border: 1px solid rgba($kl-primary, 0.3);
            color: $kl-primary;

            &:hover {
              background: rgba($kl-primary, 0.1);
            }
          }

          &.primary {
            background: linear-gradient(135deg, $kl-secondary, $kl-accent);
            border: none;
            color: $kl-dark;
            position: relative;
            overflow: hidden;

            &:not(.disabled):hover {
              transform: translateY(-2px);
              box-shadow: 0 12px 32px rgba($kl-secondary, 0.4);

              .submit-sparkle {
                animation: sparkle 1s infinite;
              }
            }

            &.disabled {
              opacity: 0.5;
              cursor: not-allowed;
            }

            .submit-sparkle {
              margin-right: 8px;
            }
          }
        }
      }

      &.detail-modal {
        max-width: 900px;
      }
    }
  }

  /* 页脚 */
  .klaita-footer {
    margin-top: 60px;
    padding: 30px 0;
    text-align: center;
    border-top: 1px solid rgba($kl-primary, 0.1);
    position: relative;

    .footer-content {
      position: relative;

      .footer-crystal {
        width: 60px;
        height: 60px;
        margin: 0 auto 20px;
        background: linear-gradient(135deg, $kl-secondary, $kl-accent);
        -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 1l3.22 6.78L22 9l-5 4.75 1.18 6.87L12 17.77 5.82 20.62 7 13.75 2 9l6.78-1.22L12 1z'/%3E%3C/svg%3E")
          center/contain no-repeat;
        mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 1l3.22 6.78L22 9l-5 4.75 1.18 6.87L12 17.77 5.82 20.62 7 13.75 2 9l6.78-1.22L12 1z'/%3E%3C/svg%3E")
          center/contain no-repeat;
        opacity: 0.3;
        animation: crystal-rotate 20s linear infinite;
      }

      .footer-quote {
        font-size: 18px;
        color: $kl-primary;
        font-style: italic;
        margin: 10px 0;
      }

      .footer-credit {
        font-size: 14px;
        color: rgba($kl-secondary, 0.7);
        margin-top: 5px;
      }
    }
  }
}

/* 动画定义 */
@keyframes crystal-float {
  0%,
  100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(10px, -10px);
  }
  50% {
    transform: translate(-5px, 15px);
  }
  75% {
    transform: translate(-15px, -5px);
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
    transform: translateX(-50%) scale(1);
  }
  50% {
    opacity: 0.12;
    transform: translateX(-50%) scale(1.1);
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

@keyframes sparkle {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
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

@keyframes gem-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes crystal-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 过渡动画 */
.crystal-fade-enter-active,
.crystal-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.crystal-fade-enter-from,
.crystal-fade-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .klaita-wiki-page {
    padding: 15px;
    padding-top: 80px;
  }

  .klaita-wiki-header {
    padding: 20px 16px !important;

    .header-actions {
      flex-direction: column;
      align-items: stretch;

      .search-container {
        min-width: unset !important;
      }
    }
  }

  .gallery-grid {
    grid-template-columns: 1fr !important;
  }

  .art-modal {
    padding: 20px 16px !important;
    width: 95% !important;
  }

  .detail-meta {
    flex-direction: column;
    gap: 10px !important;
  }
}
</style>