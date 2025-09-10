<template>
    <main class="home">


        <section class="center" role="main">
            <h1 class="title">生死相随 · 珂莱塔</h1>

            <div class="subtitle" aria-live="polite">
                <span class="typed">{{ typed }}</span><span class="cursor" aria-hidden="true">|</span>
            </div>

        </section>

        <footer class="site-footer" role="contentinfo">
            <div class="foot-inner">
                <div class="left">© 珂莱塔设定集 · 非商业同人</div>
                <div class="right">设计：霜落天亦 · 2025</div>
            </div>
        </footer>
    </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 固定要循环的副标题句子（写死）
const lines = [
    '一颗“宝石”的绽放，一场生命的凋零',
    '美或死，璀璨即凋零',
    '寂与亡，衰败亦新生',
    '切步、向前，此为优雅的进行式',
    '以旧雨，为颂赞的苦酒',
    '敬昨夜、今日和彼时彼刻',
    '我依然故我，于终幕之上',
];

const typed = ref('');
let lineIndex = 0;
let charIndex = 0;
let deleting = false;
let timer: number | null = null;

const TYPING = 200;     // 打字速度（ms/字符）
const DELETING = 35;   // 删除速度
const PAUSE = 1000;    // 完成后停留时间

function tick() {
    const cur = lines[lineIndex];
    if (!deleting) {
        typed.value = cur.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex >= cur.length) {
            timer = window.setTimeout(() => { deleting = true; tick(); }, PAUSE);
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




onMounted(() => {
    timer = window.setTimeout(tick, 500);

});

onBeforeUnmount(() => {

    if (timer) window.clearTimeout(timer);
});

</script>

<style lang="scss" scoped>
/* 固定配色（写死） */
$bg-dark: #05060a;
$ice-blue: #bff7ff;
$neon-pink: #ff66c4;
$violet: #7a39ff;
$gold: #ffd580;
$text: #eef6fb;

.home {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #05060a;
    color: $text;
    font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'PingFang SC', 'Noto Sans CJK SC', sans-serif;


}

.center {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 24px 18px;
    gap: 18px;

    .title {
        z-index: 9;

        font-size: 2rem;
        margin: 0;
        font-weight: 800;
        line-height: 1;
        background: linear-gradient(90deg, $ice-blue, $neon-pink);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        -webkit-text-fill-color: transparent;
        text-shadow: 0 10px 40px rgba($ice-blue, 0.06);
    }

    .subtitle {
        font-size: 1.05rem;
        min-height: 1.6em; // 保证高度稳定
        color: rgba(238, 247, 255, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;

        .typed {
            display: inline-block;
            white-space: nowrap;
            letter-spacing: 0.6px;
            font-weight: 600;
        }

        .cursor {
            display: inline-block;
            width: 10px;
            height: 1.05em;
            margin-left: 4px;
            background: linear-gradient(180deg, $ice-blue, $neon-pink);
            border-radius: 2px;
            animation: blink 1s steps(1) infinite;
        }
    }

}

.site-footer {
    flex-shrink: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.04);
    background: linear-gradient(180deg, rgba(7, 10, 18, 0.6), rgba(4, 6, 10, 0.8));
    padding: 14px 18px;

    .foot-inner {
        max-width: 1100px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        color: rgba(238, 247, 255, 0.7);
        font-size: 0.92rem;

        .left {
            font-weight: 700;
            color: $ice-blue;
        }

        .right {
            color: rgba(238, 247, 255, 0.55);
        }
    }
}

@keyframes blink {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@media (max-width: 720px) {
    .center {
        padding: 20px 14px;

        .title {
            font-size: 1.5rem;
        }

        .subtitle {
            font-size: 0.98rem;
        }
    }

    .site-footer .foot-inner {
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 6px;
    }
}
</style>
