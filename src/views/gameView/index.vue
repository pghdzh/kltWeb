<template>
  <div class="crystal-game">
    <header class="hud">
      <div class="hud__left">
        <div class="score">得分：<span class="score__num">{{ score }}</span></div>
        <div class="combo" v-if="combo > 1 && !isMobile">连击 ×{{ combo }}</div>
      </div>
      <div class="hud__center">
        <div class="timer">时间：<span class="timer__num">{{ timeLeft.toFixed(2) }}</span>s</div>
      </div>
      <button class="btn leaderboard-btn" @click="openLeaderboard">排行榜</button>
    </header>
    <div v-if="showLeaderboard" class="lb-overlay" @click.self="closeLeaderboard"
      @keydown.esc.prevent="closeLeaderboard" tabindex="-1" ref="lbOverlayRef">
      <div class="lb-card" role="dialog" aria-modal="true" aria-label="排行榜">
        <header class="lb-card__hd">
          <h3>排行榜（Top 99）</h3>
          <button class="lb-close" @click="closeLeaderboard" aria-label="关闭">✕</button>
        </header>

        <section class="lb-card__body">
          <div class="lb-loading" v-if="loadingLeaderboard">加载中…</div>

          <ol class="lb-list" v-else>
            <li v-if="!rankingList || rankingList.length === 0" class="lb-empty">暂无榜单数据</li>

            <li v-for="(it, idx) in rankingList" :key="it.date || (it.score + '-' + idx)" class="lb-item">
              <div class="rank">{{ idx + 1 }}</div>
              <div class="info">
                <div class="name">{{ it.nickname || '匿名' }}</div>
              </div>
              <div class="score">{{ it.count }}</div>
            </li>
          </ol>
        </section>
      </div>
    </div>
    <div class="game-area" ref="containerRef">
      <canvas ref="canvasRef" @pointerdown.prevent="onPointerDown"></canvas>

      <!-- 控件：左右按钮做得更大更明显 -->
      <div class="controls" aria-hidden="false">
        <button class="ctrl left" @pointerdown.prevent="onMoveDown('left')" @pointerup="onMoveUp"
          @pointercancel="onMoveUp" @touchstart.prevent="onMoveDown('left')" @touchend="onMoveUp">◀</button>

        <button class="ctrl right" @pointerdown.prevent="onMoveDown('right')" @pointerup="onMoveUp"
          @pointercancel="onMoveUp" @touchstart.prevent="onMoveDown('right')" @touchend="onMoveUp">▶</button>
      </div>

      <div class="overlay" v-if="!running && !finished">
        <div class="overlay__card">
          <h2>晶斩 — 珂莱塔的试练</h2>
          <p>控制珂莱塔左右移动，自动发射晶弹；子弹命中晶体后破碎。击中晶体会有概率触发彩蛋语音。</p>
          <button class="btn primary" @click="startGame">开始挑战</button>
        </div>
      </div>

      <div class="overlay overlay--end" v-if="finished">
        <div class="overlay__card">
          <h2>时间到</h2>
          <p>得分：<strong>{{ score }}</strong></p>
          <!-- 显示触发过的语音数量 -->
          <p class="voice-count">
            已触发语音：<strong>{{ triggeredVoices.size }}</strong> / 14
          </p>
          <!-- 新增：昵称输入 + 上传分数 -->
          <div class="submit-row">
            <input class="nickname-input" v-model="submitNickname" type="text" placeholder="输入你的昵称（最多50字）"
              maxlength="50" />
            <button class="btn primary" :disabled="submitting || submitted" @click="submitScore">
              <span v-if="!submitting && !submitted">上传分数</span>
              <span v-if="submitting">上传中…</span>
              <span v-if="!submitting && submitted">已上传</span>
            </button>
          </div>
          <div class="submit-msg" v-if="submitMsg" :class="{ error: submitError }">
            {{ submitMsg }}
          </div>
          <div class="actions">
            <button class="btn" @click="restart">再来一次</button>
          </div>

        </div>
      </div>


    </div>


  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from 'vue';
import { getRankingList, addRankingItem } from "@/api/modules/ranking"; // 根据你的实际路径调整
// 排行榜弹窗
const showLeaderboard = ref(false);
const loadingLeaderboard = ref(false);
const lbOverlayRef = ref<HTMLElement | null>(null);

interface RankingItem {
  id?: number; // 如果接口返回有 id，可加上
  nickname: string;
  count: number;
}
const rankingList = ref<RankingItem[]>([]);

/**
 * 打开排行榜：同时尝试从后端拉取最新 top
 */
// 默认分页参数（如不分页可省略）
const page = 1;
const pageSize = 99;

const fetchRanking = async () => {
  const res = await getRankingList({ page, pageSize, character_key: "kltGame" });
  if (res.success) {
    rankingList.value = res.data;
  } else {
    console.error("获取排行榜失败", res.message);
  }
};


async function openLeaderboard() {
  showLeaderboard.value = true;
  loadingLeaderboard.value = true;

  // 小技巧：把焦点移到 overlay，便于监听 Esc 关闭
  await nextTick();
  try { lbOverlayRef.value && lbOverlayRef.value.focus(); } catch (e) { }

  // 尝试拉取服务器榜单（可选），若失败则保持原本 local 数据
  try {
    await fetchRanking();
  } catch (e) {
    console.warn('拉取排行榜失败', e);
  } finally {
    loadingLeaderboard.value = false;
  }
}

function closeLeaderboard() {
  showLeaderboard.value = false;
}

/* ===================== 上传分数 ===================== */
// 可修改的角色键（请按实际项目替换）
const CHARACTER_KEY = 'kltGame';

// 提交相关状态
const submitNickname = ref('');
const submitting = ref(false);
const submitted = ref(false);
const submitMsg = ref('');
const submitError = ref(false);

// 复用或创建 leaderboard ref（如果你的组件里已有 leaderboard 请确保该变量名不冲突）
let leaderboard: any;
try {
  // 尝试复用全局挂载的 leaderboard（若你之前用过）
  if ((globalThis as any).__existing_leaderboard_ref__) {
    leaderboard = (globalThis as any).__existing_leaderboard_ref__;
  } else {
    leaderboard = ref([]);
    (globalThis as any).__existing_leaderboard_ref__ = leaderboard;
  }
} catch (e) {
  leaderboard = ref([]);
}

/**
 * 提交分数到后端排行榜
 */
async function submitScore() {
  // 基本校验
  submitMsg.value = '';
  submitError.value = false;

  const name = (submitNickname.value || '').trim();
  if (!name) {
    submitMsg.value = '请输入昵称后再上传';
    submitError.value = true;
    return;
  }
  if (name.length > 50) {
    submitMsg.value = '昵称太长（上限 50 字）';
    submitError.value = true;
    return;
  }

  if (submitting.value || submitted.value) return;

  submitting.value = true;
  try {
    // 调用后端 API（注意接口参数键名与你后端一致）
    const payload = {
      character_key: CHARACTER_KEY,
      nickname: name,
      count: score.value || 0, // 这里用 count 字段，如果后端改为 score 则调整
    };
    console.log('payload', payload)
    const res = await addRankingItem(payload);
    // 处理可能的返回结构（适配 axios 风格）
    // 若你使用 axios，res.data 里通常包含 backend 返回体
    console.log('res', res)

    // 简单判断成功（你可以根据后端实际返回结构调整）
    if (res.success) {
      submitMsg.value = '上传成功';
      submitError.value = false;
      submitted.value = true;
    } else {
      submitMsg.value = (data && data.message) ? data.message : '上传失败（服务器返回异常）';
      submitError.value = true;
    }
  } catch (err: any) {
    // 处理错误（axios 会在 err.response 中包含更多信息）

    submitMsg.value = '上传失败，请稍后重试';
    submitError.value = true;
    console.error('上传分数失败：', err);
  } finally {
    submitting.value = false;
  }
}
/* ===================== 常量（颜色、参数，写死） ===================== */
const COLOR_ICE = '#bff7ff';
const COLOR_NEON = '#ff66c4';
const COLOR_VIOLET = '#7a39ff';
const COLOR_GOLD = '#ffd580';
const COLOR_BG = '#05060a';

const GAME_TIME = 60;
const TARGET_MAX = 6;
const MOBILE_MAX_TARGET = 4;


const PLAYER_SPEED = 240; // px/s
const BULLET_SPEED = 900; // px/s
const FIRE_COOLDOWN = 0.18; // 自动发射间隔（秒）

/* ===================== 可响应状态 ===================== */
const containerRef = ref<HTMLElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);

let ctx: CanvasRenderingContext2D | null = null;
let rafId = 0;
let lastTime = 0;
let dpr = Math.min(window.devicePixelRatio || 1, 2);

const running = ref(false);
const finished = ref(false);
const timeLeft = ref(GAME_TIME);
const score = ref(0);
const combo = ref(0);

/* ===================== gameplay 内部 ===================== */
let spawnTimer = 0;
let elapsedGame = 0;
let baseSpawnInterval = 0.9;
let fireCooldownTimer = 0;

let targets: Target[] = [];
let particles: Particle[] = [];
let bullets: Bullet[] = [];
let floaters: Floater[] = [];
let shake = 0;

/* 玩家 */
const player = { x: 0, y: 0, w: 64, h: 80, vx: 0 };
let movingLeft = false;
let movingRight = false;




/* player image with load/broken flags */
const playerImg = new Image();
let playerImgLoaded = false;
let playerImgBroken = false;
playerImg.onload = () => { playerImgLoaded = true; playerImgBroken = false; };
playerImg.onerror = (e) => { playerImgLoaded = false; playerImgBroken = true; console.warn('player.png 加载失败', e); };
playerImg.src = '/player.webp'; // 放 public/assets/player.png


/* ===================== 类型定义 ===================== */
type Vec2 = { x: number; y: number };
type TargetKind = 'normal' | 'tough' | 'split' | 'gold';
type Target = { id: number; pos: Vec2; r: number; vx: number; vy: number; color: string; hp: number; score: number; kind: TargetKind; };
type Particle = { pos: Vec2; v: Vec2; life: number; color: string; size: number; };
type Bullet = { pos: Vec2; v: Vec2; life: number; radius: number; dead?: boolean; };
type Floater = { x: number; y: number; text: string; life: number; vy: number; color?: string; };

/* ===================== 对象池工具 & 池实例 ===================== */
function createPool<T>(factory: () => T, initial = 40) {
  const pool: T[] = [];
  for (let i = 0; i < initial; i++) pool.push(factory());
  return {
    acquire() { return pool.length ? pool.pop()! : factory(); },
    release(obj: T) { pool.push(obj); }
  };
}

const bulletPool = createPool<Bullet>(() => ({ pos: { x: 0, y: 0 }, v: { x: 0, y: 0 }, life: 0, radius: 6, dead: false }), 80);
const particlePool = createPool<Particle>(() => ({ pos: { x: 0, y: 0 }, v: { x: 0, y: 0 }, life: 0, color: '#fff', size: 1 }), 160);

/* ===================== 工具函数 ===================== */
function rand(min: number, max: number) { return Math.random() * (max - min) + min; }
function distance(a: Vec2, b: Vec2) { const dx = a.x - b.x, dy = a.y - b.y; return Math.sqrt(dx * dx + dy * dy); }
function spawnScorePopup(x: number, y: number, text: string, color = '#bff7ff') { floaters.push({ x, y, text, life: 0.9, vy: -36, color }); }


/* ===================== 播放语音 ===================== */
let currentAudio: HTMLAudioElement | null = null;

function playVoice(path: string) {
  try {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.src = ''; // 清理旧的
    }
    currentAudio = new Audio(path);
    currentAudio.play().catch(() => { });
  } catch (e) {
    console.error('播放语音失败:', e);
  }
}

function stopVoice() {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.src = '';
    } catch (e) { }
    currentAudio = null;
  }
}


/* ===================== 生命周期：挂载/卸载 ===================== */

let resizeHandler: (() => void) | null = null;
onMounted(() => {
  const canvas = canvasRef.value!;
  const container = containerRef.value!;
  ctx = canvas.getContext('2d')!;

  resizeHandler = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.floor(container.clientWidth));
    const h = Math.max(1, Math.floor(container.clientHeight));
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx && ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    player.x = w / 2;
    player.y = h - 46;
    player.w = Math.min(120, Math.max(48, Math.floor(w * 0.12)));
    player.h = player.w * 1.25;
  };
  resizeHandler()
  window.addEventListener('resize', resizeHandler);
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler);
  resizeHandler = null;
  window.cancelAnimationFrame(rafId);
  window.removeEventListener('keydown', onKeyDown);
  window.removeEventListener('keyup', onKeyUp);
  stopVoice(); // 清理全局音频
});

/* ===================== 生成/刷怪（带难度系数） ===================== */
let nextId = 1;
function spawnTarget(width: number, height: number, diff = 1) {
  const isMobile = containerRef.value ? containerRef.value.clientWidth < 720 : false;
  const max = isMobile ? MOBILE_MAX_TARGET : TARGET_MAX;
  if (targets.length >= max) return;

  const rType = Math.random();
  let kind: TargetKind = 'normal';
  if (rType < 0.06 * Math.min(1.6, diff)) kind = 'gold';
  else if (rType < 0.18 * Math.min(1.5, diff)) kind = 'split';
  else if (rType < 0.42) kind = 'tough';

  const baseR = rand(18, 36) * (isMobile ? 0.8 : 1);
  let hp = 1;
  let sc = Math.round((10 + baseR) * diff);
  let color = Math.random() > 0.5 ? COLOR_ICE : COLOR_NEON;
  if (kind === 'tough') { hp = Math.max(2, Math.round(1 + diff * 0.6)); color = COLOR_VIOLET; sc = Math.round(80 * diff); }
  if (kind === 'gold') { hp = Math.max(3, Math.round(2 + diff * 0.6)); color = COLOR_GOLD; sc = Math.round(160 * diff); }
  if (kind === 'split') { hp = 1; color = Math.random() > 0.5 ? COLOR_ICE : COLOR_NEON; sc = Math.round(60 * diff); }

  const t: Target = {
    id: nextId++,
    pos: { x: rand(baseR, width - baseR), y: -baseR - rand(10, 120) },
    r: baseR,
    vx: rand(-0.2, 0.2) * (1 + diff * 0.05),
    vy: rand(0.3, 0.9) * (1 + diff * 0.06),
    color,
    hp,
    score: sc,
    kind
  };
  targets.push(t);
}

/* ===================== 发射（自动） ===================== */
function shoot() {
  if (!running.value) return;
  const b = bulletPool.acquire();
  b.pos.x = player.x;
  b.pos.y = player.y - player.h * 0.5;
  b.v.x = 0; b.v.y = -BULLET_SPEED; // px/s
  b.life = 2.5; b.dead = false;
  bullets.push(b);
}

/* ===================== 交互：指针/键盘/移动按钮 ===================== */
function onPointerDown(_: PointerEvent) {
  // 自动发射，无需手动射击
}
function onMoveDown(dir: 'left' | 'right') {
  if (dir === 'left') { movingLeft = true; movingRight = false; } else { movingRight = true; movingLeft = false; }
}
function onMoveUp() { movingLeft = movingRight = false; }

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') movingLeft = true;
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') movingRight = true;
  if (e.key === ' ' || e.key === 'Enter') { /* space/enter 不再触发手动射击 */ }
}
function onKeyUp(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') movingLeft = false;
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') movingRight = false;
}

/* ===================== 命中处理（hp 判定） ===================== */
function handleHitFinal(t: Target) {
  // 爆裂、分数、粒子、彩蛋 -> 仅在 t.hp <= 0 时调用
  score.value += t.score;
  combo.value += 1;

  // spawn particles (use pool)
  const fragCount = t.kind === 'split' ? 12 : 10;
  for (let i = 0; i < fragCount; i++) {
    const p = particlePool.acquire();
    p.pos.x = t.pos.x; p.pos.y = t.pos.y;
    p.v.x = rand(-2.6, 2.6); p.v.y = rand(-5.0, 1.6);
    p.life = rand(0.6, 1.4); p.color = t.kind === 'gold' ? COLOR_GOLD : t.color; p.size = rand(1.8, 4.6);
    particles.push(p);
  }


  // 分裂逻辑
  if (t.kind === 'split') {
    for (let k = 0; k < 2 + Math.floor(Math.random() * 2); k++) {
      const small: Target = {
        id: nextId++,
        pos: { x: t.pos.x + rand(-12, 12), y: t.pos.y + rand(-6, 6) },
        r: Math.max(8, t.r * 0.45),
        vx: rand(-0.6, 0.6),
        vy: rand(0.6, 1.2),
        color: Math.random() > 0.5 ? COLOR_ICE : COLOR_NEON,
        hp: 1,
        score: Math.round(t.score * 0.35),
        kind: 'normal'
      };
      targets.push(small);
    }
  }

  // 分数弹窗
  spawnScorePopup(t.pos.x, t.pos.y - t.r, `+${t.score}`, t.color);

  // remove target
  targets = targets.filter(x => x.id !== t.id);
  // 音效
  try {
    if (t.kind === 'gold' && Math.random() < 0.50) triggerEasterEgg();
    if (t.kind === 'tough' && Math.random() < 0.15) triggerEasterEgg();
    if (t.kind === 'split' && Math.random() < 0.05) triggerEasterEgg();
  } catch (e) { /* 容错 */ }

  shake = 8;
}

/* ===================== 彩蛋音频 ===================== */
let isOnCooldown = false; // 冷却标记
// 初始化触发记录，从 localStorage 读取，如果没有就用空数组
const triggeredVoices = new Set(JSON.parse(localStorage.getItem('triggeredVoices') || '[]'));

function triggerEasterEgg() {
  if (isOnCooldown) return; // 冷却中不触发

  // 生成随机编号 0 ~ 13
  const randomIndex = Math.floor(Math.random() * 14);
  playVoice(`/gameAudio/audio (${randomIndex}).mp3`);
  // 记录触发过的语音编号
  triggeredVoices.add(randomIndex);

  // 保存到 localStorage
  localStorage.setItem('triggeredVoices', JSON.stringify([...triggeredVoices]));
  // 开启冷却
  isOnCooldown = true;
  setTimeout(() => {
    isOnCooldown = false;
  }, 10000); // 10秒冷却
}

/* ===================== 主循环更新（dt 秒） ===================== */
function updateGame(dt: number) {
  const canvas = canvasRef.value!;
  const w = canvas.width / dpr;
  const h = canvas.height / dpr;

  // 难度演进
  elapsedGame += dt;
  const diff = Math.min(1.8, 1 + elapsedGame * 0.035);
  const spawnInterval = Math.max(0.45, baseSpawnInterval - elapsedGame * 0.01);

  // spawn
  spawnTimer += dt;
  if (spawnTimer >= spawnInterval) { spawnTimer = 0; spawnTarget(w, h, diff); }

  // player movement
  const mv = (movingLeft ? -1 : 0) + (movingRight ? 1 : 0);
  player.vx = mv * PLAYER_SPEED;
  player.x += player.vx * dt;
  const edgePadding = Math.max(player.w * 0.15, 20); // 15% 宽度 或最少 20px
  player.x = Math.max(edgePadding, Math.min(w - edgePadding, player.x));
  // move targets
  for (let t of targets) {
    t.pos.x += t.vx * dt * 60;
    t.pos.y += t.vy * dt * 60;
    if (t.pos.x < t.r) { t.pos.x = t.r; t.vx *= -0.6; }
    if (t.pos.x > w - t.r) { t.pos.x = w - t.r; t.vx *= -0.6; }
  }

  // move bullets (v in px/s)
  for (let b of bullets) {
    b.pos.x += b.v.x * dt;
    b.pos.y += b.v.y * dt;
    b.life -= dt;
  }

  // bullet vs target collision -> reduce hp, only explode if hp<=0
  for (let bi = 0; bi < bullets.length; bi++) {
    const b = bullets[bi];
    if (b.dead) continue;
    for (let ti = 0; ti < targets.length; ti++) {
      const t = targets[ti];
      const d = distance(b.pos, t.pos);
      if (d <= t.r + b.radius) {
        // 减 HP
        t.hp -= 1;
        // 小击中粒子
        for (let i = 0; i < 6; i++) {
          const p = particlePool.acquire();
          p.pos.x = t.pos.x + rand(-6, 6);
          p.pos.y = t.pos.y + rand(-6, 6);
          p.v.x = rand(-1.6, 1.6); p.v.y = rand(-3.2, 1.2);
          p.life = rand(0.4, 0.9); p.color = t.color; p.size = rand(1.2, 3.2);
          particles.push(p);
        }

        // 若 HP <= 0 则最终爆裂
        if (t.hp <= 0) {
          handleHitFinal(t);
        } else {
          // 轻微反馈：缩小或闪烁
          t.r = Math.max(6, t.r * 0.86);
          // 小的分数提示（可调整为偏低）
          spawnScorePopup(t.pos.x, t.pos.y - t.r, `+${Math.round(t.score * 0.25)}`, t.color);
        }

        b.dead = true;
        break;
      }
    }
  }

  // bullets cleanup：回收到池
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    if (b.dead || b.life <= 0 || b.pos.y < -120) {
      bullets.splice(i, 1);
      bulletPool.release(b);
    }
  }

  // particles update & cleanup（回收）
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.pos.x += p.v.x * dt * 60;
    p.pos.y += p.v.y * dt * 60;
    p.v.y += 9.8 * dt * 0.4;
    p.life -= dt;
    if (p.life <= 0) { particles.splice(i, 1); particlePool.release(p); }
  }

  // floaters update & cleanup
  for (let i = floaters.length - 1; i >= 0; i--) {
    const f = floaters[i];
    f.y += f.vy * dt;
    f.life -= dt;
    if (f.life <= 0) floaters.splice(i, 1);
  }

  // targets fall off => miss
  targets = targets.filter(t => {
    if (t.pos.y - t.r > h + 40) { combo.value = 0; return false; }
    return true;
  });

  // time
  timeLeft.value = Math.max(0, timeLeft.value - dt);
  if (timeLeft.value <= 0 && running.value) {
    running.value = false; finished.value = true;
    triggerEasterEgg();
  }

  shake *= 0.9;
}

/* ===================== 渲染 ===================== */
function drawGame() {
  if (!ctx || !canvasRef.value) return;
  const c = ctx;
  const canvas = canvasRef.value!;
  const w = canvas.width / dpr;
  const h = canvas.height / dpr;

  // clear
  c.fillStyle = COLOR_BG;
  c.fillRect(0, 0, w, h);

  c.save();
  if (shake > 0.5) { const sx = (Math.random() - 0.5) * shake; const sy = (Math.random() - 0.5) * shake; c.translate(sx, sy); }

  // background gradient
  const g = c.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, '#071025'); g.addColorStop(0.4, '#061026'); g.addColorStop(1, '#04030a');
  c.fillStyle = g; c.fillRect(0, 0, w, h);

  // draw targets
  for (let t of targets) drawTarget(c, t);

  // draw player (image or placeholder) with safety checks
  c.save();
  const px = player.x; const py = player.y;
  if (playerImgLoaded && !playerImgBroken) {
    try {
      const iw = player.w; const ih = player.h;
      c.drawImage(playerImg, px - iw / 2, py - ih / 2, iw, ih);
    } catch (err) {
      // fallback
      playerImgBroken = true;
      c.beginPath(); c.fillStyle = '#e9f9ff'; c.arc(px, py - 8, player.w * 0.28, 0, Math.PI * 2); c.fill();
      c.fillStyle = '#ff66c4'; c.fillRect(px - player.w * 0.28, py + 6, player.w * 0.56, 6);
    }
  } else {
    c.beginPath(); c.fillStyle = '#e9f9ff'; c.arc(px, py - 8, player.w * 0.28, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#ff66c4'; c.fillRect(px - player.w * 0.28, py + 6, player.w * 0.56, 6);
  }
  c.restore();

  // draw bullets
  for (let b of bullets) {
    c.beginPath(); c.fillStyle = '#e6f8ff'; c.arc(b.pos.x, b.pos.y, b.radius, 0, Math.PI * 2); c.fill();
    c.globalAlpha = 0.45; c.fillRect(b.pos.x - 1, b.pos.y + 6, 2, 6); c.globalAlpha = 1;
  }

  // draw particles
  for (let p of particles) {
    c.globalAlpha = Math.max(0, p.life / 1.2);
    c.fillStyle = p.color;
    c.beginPath(); c.arc(p.pos.x, p.pos.y, p.size, 0, Math.PI * 2); c.fill();
    c.globalAlpha = 1;
  }

  // draw floaters
  if (floaters.length) {
    c.save();
    c.font = 'bold 14px system-ui, -apple-system, "PingFang SC", "Noto Sans CJK SC", sans-serif';
    c.textAlign = 'center';
    for (const f of floaters) {
      c.globalAlpha = Math.max(0, f.life / 0.9);
      c.fillStyle = f.color || '#bff7ff';
      c.fillText(f.text, f.x, f.y);
    }
    c.restore();
  }

  c.restore();
}

/* target 绘制 */
function drawTarget(c: CanvasRenderingContext2D, t: Target) {
  c.save();
  // glow
  const grd = c.createRadialGradient(t.pos.x, t.pos.y, 0, t.pos.x, t.pos.y, t.r * 1.6);
  grd.addColorStop(0, t.color); grd.addColorStop(0.4, 'rgba(255,255,255,0.06)'); grd.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = grd; c.beginPath(); c.arc(t.pos.x, t.pos.y, t.r * 1.6, 0, Math.PI * 2); c.fill();

  // body
  c.beginPath(); c.fillStyle = t.color; c.arc(t.pos.x, t.pos.y, t.r, 0, Math.PI * 2); c.fill();

  // sheen
  c.beginPath(); c.fillStyle = 'rgba(255,255,255,0.22)';
  c.moveTo(t.pos.x - t.r * 0.4, t.pos.y - t.r * 0.65);
  c.lineTo(t.pos.x + t.r * 0.2, t.pos.y - t.r * 0.2);
  c.lineTo(t.pos.x - t.r * 0.1, t.pos.y + t.r * 0.1);
  c.fill();

  // hp ring
  if (t.hp > 1) {
    const maxHp = t.kind === 'gold' ? 3 : 2;
    const pct = Math.min(1, t.hp / maxHp);
    c.lineWidth = Math.max(2, t.r * 0.12);
    c.strokeStyle = `rgba(255,255,255,0.22)`;
    c.beginPath();
    c.arc(t.pos.x, t.pos.y, t.r + 6, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * pct);
    c.stroke();
  }

  if (t.kind === 'gold') {
    c.lineWidth = Math.max(2, t.r * 0.12);
    c.strokeStyle = '#ffe6a8';
    c.beginPath(); c.arc(t.pos.x, t.pos.y, t.r + 8, 0, Math.PI * 2); c.stroke();
  }

  c.restore();
}

/* ===================== RAF 循环（含自动发射节奏） ===================== */
function rafLoop(now: number) {
  rafId = requestAnimationFrame(rafLoop);
  const dt = (now - lastTime) / 1000;
  lastTime = now;

  if (running.value && !finished.value) {
    // 自动发射计时
    fireCooldownTimer -= dt;
    if (fireCooldownTimer <= 0) {
      shoot();
      fireCooldownTimer = FIRE_COOLDOWN;
    }
    updateGame(dt);
  }

  drawGame();
}

/* ===================== 游戏控制（start/restart/export） ===================== */
function startGame() {
  // reset
  targets = []; particles = []; bullets = []; floaters = [];
  score.value = 0; combo.value = 0;
  elapsedGame = 0; spawnTimer = 0;
  timeLeft.value = GAME_TIME;
  fireCooldownTimer = 0;

  running.value = true; finished.value = false;
  lastTime = performance.now();
  rafLoop(lastTime);
}

function restart() {
  running.value = false; finished.value = false;
  setTimeout(() => startGame(), 140);
}


/* ===================== 辅助：按键/清理暴露 ===================== */
const isMobile = computed(() => containerRef.value ? containerRef.value.clientWidth < 720 : false);

/* debug */
Object.assign(window, { __game_debug: { targets, particles, bullets, player, floaters } });

</script>

<style lang="scss" scoped>
.crystal-game {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #03050a 0%, #071025 100%);
  color: #eef6fb;
  font-family: Inter, system-ui, -apple-system, 'PingFang SC', 'Noto Sans CJK SC', sans-serif;
  padding-top: 80px;

  .hud {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;


    &__left,
    &__center,
    &__right {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .score {
      font-weight: 700;

      .score__num {
        color: #bff7ff;
        font-size: 1.05rem;
      }
    }

    .combo {
      color: #ff66c4;
      font-weight: 700;
    }

    .timer {
      font-weight: 700;

      .timer__num {
        color: #7a39ff;
      }
    }

    .btn {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.06);
      padding: 8px 10px;
      border-radius: 10px;
      color: #eef6fb;
      cursor: pointer;
      transition: all 160ms;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
      }

      &.primary {
        background: linear-gradient(90deg, #bff7ff, #ff66c4);
        color: #05060a;
        border: none;
      }

    }
  }

  .lb-overlay {
    position: fixed;
    inset: 0;
    background: rgba(2, 4, 8, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1200;
    backdrop-filter: blur(4px);
    padding: 18px;
    outline: none;

    .lb-card {
      width: 680px;
      max-width: 100%;
      max-height: 86vh;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 14px;
      box-shadow: 0 24px 60px rgba(2, 4, 8, 0.8);
      display: flex;
      flex-direction: column;
      overflow: hidden;

      &__hd {
        padding: 14px 18px;
      }

      &__hd,
      &__ft {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .lb-card__hd {
        padding: 14px 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        h3 {
          margin: 0;
          color: #bff7ff;
          font-size: 1.15rem;
        }

        .lb-close {
          background: transparent;
          border: none;
          color: #eef6fb;
          font-size: 1rem;
          cursor: pointer;
        }
      }

      .lb-card__body {
        padding: 8px 18px 12px 18px;
        overflow: auto;
        flex: 1 1 auto;

        .lb-loading {
          color: rgba(255, 255, 255, 0.7);
          padding: 24px;
          text-align: center;
        }

        .lb-list {
          list-style: none;
          margin: 0;
          padding: 6px 0;

          .lb-empty {
            color: rgba(255, 255, 255, 0.6);
            padding: 18px;
            text-align: center;
          }

          .lb-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px 12px;
            border-radius: 10px;
            margin-bottom: 8px;
            background: linear-gradient(90deg, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.008));
            border: 1px solid rgba(255, 255, 255, 0.02);

            .rank {
              width: 44px;
              text-align: center;
              font-weight: 800;
              color: #bff7ff;
            }

            .info {
              flex: 1;

              .name {
                font-weight: 700;
                color: #fff;
              }

              .meta {
                font-size: 0.86rem;
                color: rgba(255, 255, 255, 0.6);
                margin-top: 2px;
              }
            }

            .score {
              font-weight: 900;
              color: #ffd580;
              min-width: 84px;
              text-align: right;
            }
          }
        }
      }

      .lb-card__ft {
        padding: 12px 18px;
        border-top: 1px solid rgba(255, 255, 255, 0.02);
        display: flex;
        justify-content: flex-end;
        gap: 12px;
      }
    }
  }


  .game-area {
    position: relative;
    flex: 1 1 auto;
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;

    canvas {
      display: block;
      background: transparent;
      border-radius: 10px;
      max-width: 100%;
      max-height: 100%;
      touch-action: none;
    }

    /* 控件：更大、更好按 */
    .controls {
      position: absolute;
      bottom: 64px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 18px;
      z-index: 6;

      .ctrl {
        border-radius: 14px;
        border: 1px solid #bff7ff;
        background: rgba(255, 255, 255, 0.02);
        color: #eef6fb;
        padding: 14px 18px;
        font-weight: 900;
        font-size: 1.2rem;
        user-select: none;
        width: 72px;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
        touch-action: none;
      }

      .left,
      .right {
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
      }

      .shoot {
        background: linear-gradient(90deg, #bff7ff, #ff66c4);
        color: #05060a;
      }
    }

    .overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 5;

      &__card {
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01));
        border: 1px solid rgba(255, 255, 255, 0.04);
        padding: 22px;
        border-radius: 12px;
        text-align: center;
        max-width: 420px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);

        .submit-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          flex-direction: column;
          margin: 12px 0;

          .label {
            color: rgba(255, 255, 255, 0.8);
            margin-right: 6px;
          }

          .nickname-input {
            flex: 1;
            padding: 8px 10px;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.06);
            background: rgba(255, 255, 255, 0.02);
            color: #fff;
            outline: none;
            font-size: 0.95rem;

            &::placeholder {
              color: rgba(255, 255, 255, 0.45);
            }
          }

          .btn.primary {
            min-width: 120px;
            padding: 8px 12px;
            font-weight: 700;
          }
        }

        .submit-msg {
          margin-top: 8px;
          color: #bff7ff;

          &.error {
            color: #ff9fb6;
          }
        }

        h2 {
          margin: 0 0 8px 0;
          font-size: 1.2rem;
          color: #bff7ff;
        }

        p {
          margin: 0 0 12px 0;
          color: rgba(255, 255, 255, 0.9);

          &.voice-count {
            font-size: 1.05rem;
            color: #7fffd4;
            margin-bottom: 16px;

            strong {
              color: #bff7ff;
            }
          }
        }
      }

      &--end {
        background: linear-gradient(180deg, rgba(2, 4, 8, 0.6), rgba(2, 4, 8, 0.85));
      }
    }
  }

}
</style>
