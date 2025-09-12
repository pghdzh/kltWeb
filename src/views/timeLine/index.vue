<template>
  <div class="megumi-page" aria-live="polite">


    <main class="container" ref="mainContainer">
      <!-- HERO -->
      <header class="hero" role="banner">
        <div class="left-col">
          <button class="avatar-card" ref="avatarCard" @click="openAvatar" @keydown.enter.prevent="openAvatar"
            @keydown.space.prevent="openAvatar" aria-label="查看珂莱塔头像大图" :aria-expanded="isAvatarOpen.toString()">
            <picture class="avatar-wrap">
              <img src="@/assets/avatar/kelaita.webp" alt="珂莱塔 头像" class="avatar" loading="lazy" decoding="async" />
            </picture>

            <div class="avatar-meta">
              <span class="avatar-badge">共鸣能力 · 向度重塑</span>
            </div>
          </button>


        </div>

        <div class="right-col" ref="metaCard">
          <h1 class="name">珂莱塔 <span class="jp">（莫塔里家族二小姐）</span></h1>

          <p class="lead">
            莫塔里家族的二小姐，不被教条限制的艺术投资人。 明面上，珂莱塔游走在交际与交易中，暗地里，她则为家族处理着不可明说的“麻烦”。 一颗“宝石”的绽放，一场生命的凋零，她以自我为名，给予现实另一向度的重塑。
          </p>

          <!-- 桌面侧边 quick-info（sticky） -->
          <aside class="quick-info" ref="infoCard" aria-label="角色快速信息">
            <h3 class="qi-title">快速资料</h3>
            <dl>
              <div>
                <dt>别名</dt>
                <dd>欧泊</dd>
              </div>
              <div>
                <dt>武器类型</dt>
                <dd>佩枪</dd>
              </div>
              <div>
                <dt>出生</dt>
                <dd>黎那汐塔</dd>
              </div>
              <div>
                <dt>共鸣属性</dt>
                <dd>冷凝</dd>
              </div>
              <div>
                <dt>特殊料理</dt>
                <dd>橘调浓缩</dd>
              </div>
              <div>
                <dt>中文CV</dt>
                <dd>闫夜桥</dd>
              </div>
            </dl>
          </aside>
        </div>
      </header>

      <section id="personality" class="card personality">
        <div class="card-head">
          <h2>性格特征</h2>

        </div>

        <ul class="traits">
          <li>
            珂莱塔把对“美”的理解贯彻在每个方面，她认为艺术的美，不该因观赏者的经历、偏好、认知而设限。新潮的流行还是古的派系，又或者是超现实的前卫品，本质来说只是立足点不同而已她欣赏创作者在其中投入的情感和追求。
          </li>
          <li>
            莫塔里家族富裕，需要用钱时，珂莱塔也从不吝啬。在珂莱塔眼里，金钱和价格固然是衡量事物价值的某种标准，但却不是唯一的标准。
          </li>
          <li>
            有时候，珂莱塔会在街头买下那些不见经传的潦草画作，出于不带任何意图的个人偏好，而还有些时候，珂莱塔会甘愿为家人和挚友放弃触手可及的利益，承担沉没成本。
          </li>
          <li>正如他们也会为她做出一样的选择。并非所有一切都关乎商机和得利，并非所有言行都一定别有深意，珂莱塔从一开始就知道，唯有心意至上。</li>
        </ul>

        <blockquote class="quote">你，愿意和我生死相随吗？</blockquote>
      </section>

      <section id="overview" class="card overview">
        <div class="card-head">
          <h2>配队</h2>
        </div>

        <div class="grid two-col">
          <div class="team">
            <h3>珂折守(高配)</h3>
            <ul>
              <li><img src="@/assets/avatar/kelaita.webp" alt="" /></li>
              <li><img src="@/assets/avatar/zhezhi.png" alt="" /></li>
              <li><img src="@/assets/avatar/shouanren.png" alt="" /></li>
            </ul>
          </div>

          <div class="team">
            <h3>珂秧守(中配)</h3>
            <ul>
              <li><img src="@/assets/avatar/kelaita.webp" alt="" /></li>
              <li><img src="@/assets/avatar/yangyang.webp" alt="" /></li>
              <li><img src="@/assets/avatar/shouanren.png" alt="" /></li>
            </ul>
          </div>

          <div class="team">
            <h3>珂桃维(低配)</h3>
            <ul>
              <li><img src="@/assets/avatar/kelaita.webp" alt="" /></li>
              <li><img src="@/assets/avatar/taoqi.png" alt="" /></li>
              <li><img src="@/assets/avatar/akijueyuan.jpg" alt="" /></li>
            </ul>
          </div>
        </div>
      </section>

      <section id="timeline" class="card timeline">
        <div class="card-head">
          <h2>共鸣链详解 · 提升</h2>
        </div>

        <div class="tl-wrap">
          <div class="vl" aria-hidden="true"></div>
          <ol class="tl-list">
            <li v-for="(ev, i) in timeline" :key="i" class="tl-item">
              <div class="marker" aria-hidden="true"><span>{{ i + 1 }}链</span></div>
              <div class="tl-card">
                <h3 class="tl-title">{{ ev.title }}<span class="tl-meta">(提升{{ ev.time }})</span></h3>
                <p class="tl-desc">{{ ev.desc }}</p>
              </div>
            </li>
          </ol>
        </div>
      </section>


    </main>

    <!-- 简易模态：头像大图 -->
    <div v-if="isAvatarOpen" class="overlay" role="dialog" aria-modal="true" @click.self="closeAvatar">
      <button class="overlay-close" @click="closeAvatar" aria-label="关闭大图">✕</button>
      <div class="overlay-content" role="document">
        <img src="@/assets/avatar/kelaita.webp" alt="珂莱塔 大图" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const timeline = ref([
  { time: '10%', title: '美或死，璀璨即凋零', desc: '珂莱塔对拥有解离效果的目标攻击造成伤害时，该次伤害的暴击提升12.5%。对处于变彩状态下的目标施放共鸣技能示我璀璨并命中时，额外回复30点【灵萃】。' },
  { time: '22%', title: '寂与亡，衰败亦新生', desc: '共鸣解放致死以终的伤害倍率提升126%。' },
  { time: '22%', title: '切步、向前，此为优雅的进行式', desc: '延奏技能碎璃镜花：施放延奏技能致辞后，额外进行一次攻击，造成珂莱塔1032.18%攻击的冷凝伤害。共鸣技能暴力美学、共鸣技能示我璀璨的伤害倍率提升93%。' },
  { time: '7%', title: '以旧雨，为颂赞的苦酒', desc: '珂莱塔施放重击、重击限制性策略、重击末路见行时，队伍中的角色共鸣技能伤害加成提升25%，持续30秒。' },
  { time: '3%', title: '敬昨夜、今日和彼时彼刻', desc: '重击末路见行的伤害倍率提升47%。' },
  { time: '31%', title: '我依然故我，于终幕之上', desc: '共鸣解放死兆的射击造成更高的伤害，并且生成的晶体数量翻倍，二者总计使共鸣解放死兆伤害倍率提升186.6%。' }
]);


const isAvatarOpen = ref(false);
function openAvatar() { isAvatarOpen.value = true; document.body.style.overflow = 'hidden'; }
function closeAvatar() { isAvatarOpen.value = false; document.body.style.overflow = ''; }

const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;


onMounted(() => {

  if (!reducedMotion) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.avatar-card', { duration: 0.8, y: 18, opacity: 0, scale: 0.99 })
      .from('.right-col > .name', { duration: 0.9, x: 24, opacity: 0 }, '-=0.45')
      .from('.quick-info', { duration: 0.7, y: 12, opacity: 0 }, '-=0.55');

    gsap.utils.toArray('.tl-item').forEach((it: any, idx: number) => {
      gsap.from(it.querySelector('.tl-card'), {
        scrollTrigger: {
          trigger: it,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 22,
        duration: 0.7,
        delay: idx * 0.06
      });
    });

    gsap.to('.avatar-card', { scale: 1.007, duration: 2.8, yoyo: true, repeat: -1, ease: 'sine.inOut' });
  } else {
    document.documentElement.classList.add('reduced-motion');
  }

  
});


</script>

<style scoped lang="scss">
/* 整体背景容器 */
.megumi-page {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(180deg, #fffafc 0%, #f8f7fb 100%);
  font-family: "Noto Sans SC", system-ui, -apple-system, "Segoe UI", Roboto, Arial;
  color: #14202b;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: clamp(18px, 4vw, 80px);
  box-sizing: border-box;
  padding-top: 60px;



  /* 主体容器提升 z-index，保证在背景之上 */
  .container {
    position: relative;
    z-index: 10;
    max-width: 1100px;
    margin: 0 auto;
    padding: clamp(12px, 2vw, 40px);
  }

  /* 方便 reduced motion */
  &.reduced-motion * {
    transition: none !important;
    animation: none !important;
  }
}

/* HERO 布局 */
.hero {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 28px;
  align-items: start;

  .left-col {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .avatar-card {
    background: rgba(255, 255, 255, 0.92);
    /* 半透明白，便于对比 */
    backdrop-filter: blur(6px);
    border-radius: 16px;
    padding: 12px;
    box-shadow: 0 18px 50px rgba(20, 20, 30, 0.08);
    display: grid;
    justify-items: center;
    gap: 8px;
    border: 1px solid rgba(220, 220, 225, 0.6);
    cursor: pointer;
    transition: transform .28s cubic-bezier(.2, .9, .3, 1), box-shadow .28s;
    width: 100%;
  }

  .avatar-card:focus {
    outline: 3px solid rgba(243, 183, 201, 0.18);
  }

  .avatar-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 28px 70px rgba(20, 20, 30, 0.12);
  }

  .avatar-wrap {
    width: 100%;
    display: block;
  }

  .avatar {
    width: 100%;
    height: auto;
    border-radius: 10px;
    display: block;
    box-shadow: 0 10px 36px rgba(20, 20, 30, 0.06);
    border: 3px solid rgba(255, 255, 255, 0.9);
  }

  .avatar-meta {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  .avatar-badge {
    font-size: 0.9rem;
    color: #5f6b72;
  }



  .right-col {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .name {
    font-size: clamp(1.4rem, 2.5vw, 2rem);
    margin: 0;
    color: #111315;
  }

  .jp {
    font-size: .95rem;
    color: #6f6f6f;
    margin-left: 8px;
    font-weight: 400;
  }

  .lead {
    margin: 6px 0 0;
    color: #47525a;
    line-height: 1.7;
    max-width: 78ch;
  }

  .quick-info {
    margin-top: 12px;
    background: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(6px);
    border-radius: 12px;
    padding: 12px;
    box-shadow: 0 10px 28px rgba(20, 20, 30, 0.06);
    font-size: 0.95rem;
    position: sticky;
    top: 18px;
    align-self: start;

    dl {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 6px 10px;
    }

    dt {
      font-weight: 600;
      color: #555;
      font-size: 0.85rem;
      margin-top: 6px;
    }

    dd {
      margin: 0;
      color: #333;
      font-size: 0.93rem;
      min-width: 200px;
    }
  }
}

/* 通用卡片风格（白色 + 毛玻璃） */
.card {
  margin-top: 22px;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 18px 44px rgba(20, 20, 30, 0.06);
  backdrop-filter: blur(4px);
  color: #222;
  border: 1px solid rgba(220, 220, 225, 0.6);

  h2 {
    margin: 0 0 8px 0;
    font-size: 1.12rem;
    color: #111315;
  }

  .card-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }

  .btn {
    padding: 8px 12px;
    border-radius: 10px;
    border: none;
    background: #ffffff;
    box-shadow: 0 8px 22px rgba(20, 20, 30, 0.04);
    cursor: pointer;
    font-weight: 600;
  }


}

/* personality */
.personality {
  .traits {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .traits li {
    padding: 12px 0;
    border-bottom: 1px dashed #f5f5f5;
    font-size: 1rem;
    color: #333;
  }

  .quote {
    margin-top: 12px;
    padding: 12px 14px;
    border-left: 4px solid #f3b7c9;
    background: linear-gradient(90deg, rgba(243, 183, 201, 0.04), transparent);
    color: #4f4f4f;
    border-radius: 6px;
  }
}

/* overview 配队 */
.overview {
  .two-col {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 8px;

    .team {
      margin: 8px;
      min-width: 180px;

      ul {
        display: flex;
        gap: 8px;
        padding: 6px 0;
      }

      li img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
  }
}

/* timeline */
.timeline {
  .tl-wrap {
    position: relative;
    padding: 8px 0 0 0;
  }

  .vl {
    position: absolute;
    left: 56px;
    top: 26px;
    bottom: 20px;
    width: 2px;
    background: linear-gradient(180deg, #f3b7c9, #9fb8d1);
    border-radius: 2px;
    opacity: 0.12;
  }

  .tl-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .tl-item {
    display: flex;
    gap: 18px;
    align-items: flex-start;
    padding: 12px 8px 18px 8px;
    position: relative;
  }

  .marker {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    flex: 0 0 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, #ffffff, rgba(255, 255, 255, 0.95));
    box-shadow: 0 8px 20px rgba(20, 20, 30, 0.06);
    border: 1px solid rgba(200, 200, 200, 0.08);
  }

  .marker span {
    font-weight: 700;
    color: #f3b7c9;
  }

  .tl-card {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.96));
    border-radius: 10px;
    padding: 10px 14px;
    box-shadow: 0 10px 32px rgba(20, 20, 30, 0.04);
    width: calc(100% - 60px);
  }

  .tl-meta {
    color: #6f6f6f;
    font-size: 0.9rem;
    margin-bottom: 6px;
  }

  .tl-title {
    margin: 0;
    font-size: 1.02rem;
    color: #111315;
  }

  .tl-desc {
    margin: 8px 0 0;
    color: #444;
    line-height: 1.6;
  }
}

/* footer */
.credits {
  margin-top: 18px;
  color: #6f6f6f;
  font-size: 0.94rem;
}

/* overlay modal */
.overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(6, 8, 10, 0.6);
  z-index: 1200;
}

.overlay-content img {
  max-width: min(90vw, 720px);
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
}

.overlay-close {
  position: absolute;
  top: 18px;
  right: 18px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
}

/* Responsive */
@media (max-width: 980px) {
  .megumi-page {
  

    .container {
      padding: 18px;
    }
  }

  .hero {
    grid-template-columns: 1fr;
    gap: 18px;

    .quick-info {
      display: none;
    }

  }

  .overview .two-col {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .timeline .vl {
    left: 40px;
  }

  .card {
    padding: 14px;
    border-radius: 12px;
  }
}


/* small accessibility tweaks */
.avatar-card,
.btn {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.06);
}
</style>
