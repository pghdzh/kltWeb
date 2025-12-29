<template>
  <div class="megumi-page" aria-live="polite">
    <main class="container" ref="mainContainer">
      <!-- HERO 区域 -->
      <header class="hero" role="banner">
        <div class="left-col">
          <button class="avatar-card">
            <picture class="avatar-wrap">
              <img
                src="@/assets/avatar/kelaita.webp"
                class="avatar"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div class="avatar-meta">
              <span class="avatar-badge">共鸣能力：向度重塑</span>
            </div>
          </button>
        </div>
        <div class="right-col" ref="metaCard">
          <div class="hero-panel">
            <h1 class="name">
              珂莱塔
              <span class="jp"
                >（莫塔里家族的二小姐，不被教条限制的艺术投资人。）</span
              >
            </h1>
            <p class="subtitle">"如果我们的语言是鸡尾酒"</p>
            <p class="lead">
              明面上，珂莱塔游走在交际与交易中，暗地里，她则为家族处理着不可明说的“麻烦”。
              一颗“宝石”的绽放，一场生命的凋零，她以自我为名，给予现实另一向度的重塑。
            </p>
          </div>
        </div>
      </header>

      <!-- 内容卡片区 -->
      <section id="personality" class="card personality">
        <div class="card-head">
          <h2>核心机制</h2>
        </div>
        <ul class="traits">
          <li>
            【可塑晶质】：珂莱塔左侧类似左轮弹匣的计数器，通过普攻、重击、空中攻击、变奏技能、共鸣技能、闪避成功时获得。
          </li>
          <li>
            【灵萃】：血条上方的蓝色特殊能量条，能量条满会获得揭幕者效果。【灵萃】通过消耗【可塑晶质】或施放变奏技能获得。
          </li>
          <li>
            揭幕者：提高共鸣解放伤害倍率。注意：只会因在共鸣解放期间切人结束效果。
          </li>
          <li>
            【镀色晶】：【灵萃】充满且【镀色晶】处于激活状态，重击施放末路见行，减少共鸣技能冷却时间。随后【镀色晶】进入22秒的冷却。
          </li>
          <li>
            总之，珂莱塔小姐看起来很复杂，专有名词极多。其实玩法总结就一句话，就是消耗【可塑晶质】攒满【灵萃】，在【镀色晶】激活的情况下打出末路见行，接着打出共鸣解放。
          </li>

          <li style="font-weight: bold">输出流程：</li>
          <li>
            【0链】基础流程：（开场）E-E-（换人）（变奏入场）E-E-Z-R-R1-R2-R3-R4-R-E-E
          </li>
          <li>
            【1链及以上且持有死与舞】基础流程：（开场）Z-E-E-（换人）（变奏入场）E-Z-E-R-R1-R2-R3-R4-R-Z-E-E
          </li>
          <li>
            两个流程时长相同，一链以上也可以选择0链流程，开场铺垫一个重击是为了在变奏入场时可以让强化特殊重击【末路见行】享受到死与舞的共鸣技能伤害加成。
          </li>
          <li>
            技能缩写：普攻 = A，重击 = Z，共鸣技能 = E，共鸣解放 = R，声骸 = Q
          </li>
        </ul>
      </section>

      <section id="resonance-status" class="card overview">
        <div class="card-head">
          <h2>共鸣状况</h2>
        </div>
        <div class="two-col">
          <div class="text-block">
            <p>
              「截取自莫塔里家族的内部记录-权限已共享」 代号：“欧泊”<br />
              该成员共鸣史10年，能力开发度高、使用度高。<br />
              该成员声痕位于腰椎处，使用共鸣能力时，可无限生成具有变彩效应的璀璨晶体，形质类似欧泊。成员可凭个体意愿和实际诉求，将此类晶体重塑成枪械、弹药等物件，使被命中的敌人出现晶体化效果。使用能力期间，该成员发尾处同样存在局部晶体化的情况。<br />
              值得一提的是，曾有好事者想通过搜集这种“宝石”大赚一笔，却发现它们根本没法变现和流通……从形象上看，它们的确很具有迷惑性，但其本质，更像某种引发解构和重塑的介质……能造成受击者频率的坍缩、解体……直至沉寂。<br />
              该成员共鸣频谱检验图与宝石彩窗类装饰品、自然界中冰雪均有一定的相似度，疑似与其异能觉醒时，打破教条、将装饰转变为武器的主动行为有关。受试样本拉贝尔曲线不具收敛性，可判断为存在潜伏期的突变型共鸣者。
            </p>
          </div>
        </div>
      </section>

      <!-- 新增三大主题区域 -->
      <section id="food" class="card special-section">
        <div class="card-head">
          <h2>艺术的回馈</h2>
        </div>
        <div class="content two-col">
          <div class="img-area">
            <img src="./img/item1.png" loading="lazy" decoding="async" />
          </div>
          <div class="text-block">
            <p>
              场灵感的诠释，一段被构建的事实，一个由多种材质拼贴而成的艺术品。<br />
              最开始，没人真正看好它的作者，那个初出茅庐却风格前卫的女性新人。但偏偏，珂莱塔认可了其价值，称赞她的创作为“叠加了鬼魅诗意的他者印象”。如今，曾经的新人已是备受赞誉的装置艺术家。她以这独一无二的作品，回馈珂莱塔的信任，感念对方的赏识和投资。
            </p>
          </div>
        </div>
      </section>
      <section id="shattered-crystal" class="card special-section">
        <div class="card-head">
          <h2>执行人套装</h2>
        </div>
        <div class="content two-col">
          <div class="img-area">
            <img src="./img/item2.png" loading="lazy" decoding="async" />
          </div>
          <div class="text-block">
            <p>
              小巧精致的手提箱包，以珠宝配饰为点缀，出现在任何高雅场合都不显突兀，足够得体。但正如那句拉古那谚语所言，被淑女藏在包内的，往往才是秘密所在。可被引爆的香氛瓶、能匹配定位并实时查询信息的眼镜……正是这些被伪装成饰品的工具，组成了珂莱塔执行期间的必要套装。<br />
              谈到美，她会用上它们，而谈到死，她还是会用上它们。
            </p>
          </div>
        </div>
      </section>

      <section id="cyclic-clock" class="card special-section">
        <div class="card-head">
          <h2>家族的刻度</h2>
        </div>
        <div class="content two-col">
          <div class="img-area">
            <img src="./img/item3.png" loading="lazy" decoding="async" />
          </div>
          <div class="text-block">
            <p>
              一双光泽如夜的黑色手套，嵌有与佩戴者代号相同的指代物——欧泊石。<br />
              家族内部，有许多不便也不需对外言明的法则，其中一条便是：佩戴黑色手套之人，需以悄无声息的方式处理不必要的“麻烦”，达成家族的需要。<br />
              但这并非某种妥协，而是珂莱塔自己的选择。家族将更广阔的世界带来她面前，她将家族带向更广阔的新世界，以一个真正的莫塔里的名义，也以自己的名义。
            </p>
          </div>
        </div>
      </section>

      <section id="collective-album" class="card special-section">
        <div class="card-head">
          <h2>橘调浓缩</h2>
        </div>
        <div class="content two-col">
          <div class="img-area">
            <img src="./img/food.png" loading="lazy" decoding="async" />
          </div>
          <div class="text-block">
            <p>
              以一杯带有橘子香气的咖啡唤醒清晨的味蕾，是珂莱塔成为莫塔里的一员后，逐渐养成的习惯。浓缩的咖啡基底混合了柑橘的回甘，这一抹清新中和了苦涩，达成了令人愉悦的平衡。它适合那些将要开启焦灼时刻的人，也适合那些想在焦灼之后享受松弛的人。
            </p>
          </div>
        </div>
      </section>
      <section id="hidden-details" class="card special-section">
        <div class="card-head">
          <h2>隐藏细节与彩蛋</h2>
        </div>
        <div class="details-container">
          <div
            v-for="(detail, index) in details"
            :key="detail.id"
            class="detail-card"
            :class="{ 'detail-card-highlight': index === 0 }"
          >
            <div class="detail-icon">
              <span v-if="index === 0">🍸</span>
              <span v-else-if="index === 1">📚</span>
              <span v-else-if="index === 2">🚤</span>
              <span v-else-if="index === 3">💍</span>
              <span v-else>💎</span>
            </div>
            <div class="detail-content">
              <h3 class="detail-title">{{ detail.title }}</h3>
              <div class="detail-text" v-html="detail.content"></div>
            </div>
            <div class="detail-number">{{ index + 1 }}</div>
          </div>
        </div>
      </section>
      <section
        id="timeline"
        class="card timeline"
        aria-labelledby="timeline-heading"
      >
        <div class="card-head">
          <h2 id="timeline-heading">共鸣链详解</h2>
        </div>
        <div class="tl-wrap" role="list">
          <div class="vl" aria-hidden="true"></div>
          <ol class="tl-list">
            <li
              v-for="(ev, i) in timeline"
              :key="i"
              class="tl-item"
              role="listitem"
              tabindex="0"
              :aria-label="``"
            >
              <div class="tl-card">
                <h3 class="tl-title">第 {{ i + 1 }} 链 · {{ ev.title }}</h3>
                <p class="tl-desc">{{ ev.desc }}</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section class="ll-stories" ref="storyRef">
        <div class="card" role="region" aria-labelledby="stories-title">
          <header class="card-head">
            <h2 id="stories-title" class="card-title">珂莱塔纪事</h2>
          </header>

          <main class="card-body">
            <transition name="fade-slide" mode="out-in">
              <article
                :key="items[current].id"
                :id="`panel-${items[current].id}`"
                class="story"
                role="tabpanel"
                :aria-labelledby="`tab-${items[current].id}`"
              >
                <h3 class="story-head">{{ items[current].title }}</h3>
                <div
                  class="story-content"
                  v-html="items[current].content"
                ></div>
              </article>
            </transition>
          </main>

          <footer class="card-foot">
            <button class="nav-btn" @click="prev" aria-label="上一则故事">
              ‹
            </button>
            <div class="pager">{{ current + 1 }} / {{ items.length }}</div>
            <button class="nav-btn" @click="next" aria-label="下一则故事">
              ›
            </button>
          </footer>
        </div>
      </section>
    </main>
    <div class="floating-chibis">
      <img
        v-for="(pet, i) in chibiList"
        :key="i"
        :src="pet.src"
        :style="{ top: pet.top + 'px', left: pet.left + 'px' }"
        class="chibi-img"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
// 在 timeline 数据附近添加（大概在第100-120行位置）
const details = ref([
  {
    id: "cocktail",
    title: "欧泊特调鸡尾酒",
    content: `在伴星任务结束后在下午茶时间来到露天水吧邂逅珂莱塔，她会问你要不要点上一杯名为"欧泊"的特调鸡尾酒。<br><br>配方是白朗姆、玫瑰甘露、石榴汁，再加少许黑胡椒和贝母粉。<br><br>在现实中这杯酒有另外一个名字叫做【情书】。`,
  },
  {
    id: "achievement",
    title: "隐藏成就的文学出处",
    content: `珂莱塔对话隐藏成就"如果我们的语言是鸡尾酒"出自村上春树的作品《如果我们的语言是威士忌》。<br><br>"如果我们的语言是威士忌，只要我默默递出酒杯，您接过静静送入喉咙即可，无需言语，心照不宣"。`,
  },
  {
    id: "gondola",
    title: "贡多拉隐藏台词",
    content: `坐贡多拉选择陪伴对象时珂莱塔会触发隐藏台词：<br><br>氤柔水境："我们流连于大海的宫室被海妖以红的和棕的海草装饰，一旦被人声唤醒，我们就消失。"<br><br>悲叹墓岛旁边："未开拓的海域、待发掘的价值......在这里搭建的新航线，就由你来命名，如何？"`,
  },
  {
    id: "catseye",
    title: "猫眼石的真实含义",
    content: `猫眼石真正的含义是【订婚信物】。<br><br>这种宝石不会因岁月而褪色，恒久不变历久弥新，所以也被象征于忠贞不渝的爱情。`,
  },
  {
    id: "opal",
    title: "欧泊与猫眼石的对比",
    content: `不同于恒久不变的猫眼石，欧泊其实经不起岁月的风霜，荏苒的时光会夺走它原本璀璨夺目的色泽，变得黯淡无光。`,
  },
]);
const timeline = ref([
  {
    title: "美或死，璀璨即凋零",
    desc: ` 珂莱塔对拥有解离效果的目标攻击造成伤害时，该次伤害的暴击提升12.5%。对处于变彩状态下的目标施放共鸣技能示我璀璨并命中时，额外回复30点【灵萃】。`,
  },
  {
    title: "寂与亡，衰败亦新生",
    desc: `共鸣解放致死以终的伤害倍率提升126%。`,
  },
  {
    title: "切步、向前，此为优雅的进行式",
    desc: `延奏技能碎璃镜花：施放延奏技能致辞后，额外进行一次攻击，造成珂莱塔1032.18%攻击的冷凝伤害。
共鸣技能暴力美学、共鸣技能示我璀璨的伤害倍率提升93%。`,
  },
  {
    title: "以旧雨，为颂赞的苦酒",
    desc: `珂莱塔施放重击、重击限制性策略、重击末路见行时，队伍中的角色共鸣技能伤害加成提升25%，持续30秒。`,
  },
  {
    title: "敬昨夜、今日和彼时彼刻",
    desc: `重击末路见行的伤害倍率提升47%。`,
  },
  {
    title: "我依然故我，于终幕之上",
    desc: `共鸣解放死兆的射击造成更高的伤害，并且生成的晶体数量翻倍，二者总计使共鸣解放死兆伤害倍率提升186.6%。
共鸣解放死兆的射击命中目标时，对目标附加焕彩效果：持续时间内无法进行任何动作，受到伤害或持续1.5秒时清除效果。`,
  },
]);

const items = [
  {
    id: "1",
    title: "筹码与艺术",
    content: `是夜，雨水淅淅沥沥地敲打着窗柩，激荡起一种潮湿的味道，空气像发酵了的苦酒。

珂莱塔不喜欢这味道，但她必须承认，这天气也有好处，连倾覆的雨水都无法阻挡的出行者，怀揣的绝不是轻易被满足的欲望，而更艰涩的欲望，意味着更难被遮掩的意图。

角落里，那女人衣着陈旧却竭力保持体面，一瞬不瞬地紧盯着拍卖师的动作，如一个走投无路不得不孤注一掷的赌徒。前厅中央，那客人夸夸其谈、腔调十足，整整二十分钟，他不舍得将自己从焦点处挪出分毫，但偏偏连基础的流派都区分不全。另一扇窗边，那孩子忍不住又瞥了眼珂莱塔，然后非常快地移开了视线，嗯，有点僵硬但总不算大问题。

至于自己……这是一场博弈，而她要掌握输赢。

这并非她第一次参与拍卖。

时间流转，台上的作品在柔和的灯光下来来往往，逐一展示。台下的人们低声交谈，分析着每一件的市场价值，仿佛这些它们只是待价而沽的筹码。

艺术很纯粹，关于艺术的买卖却不。涉及到价值的投资，每一笔，都是对未来的承诺与押注。

但即便如此，她依旧会对不被大众主流看好的作品举起手牌。每次竞拍，无异于一场小型的博弈，究竟是毫无意义的几何光影，还是忠于自我的解构表达……时间很快揭晓了答案，以远超预期的回报。

当质疑变为笃信，不断有人追捧她的青睐，被她的选择引领。

她却清楚地知道，究其根本，自己只是用理论知识、美感、流通性等多重标准搭建了一套框架，却又跳出这框架的限制，看得更远、更多一些。

就好比，好比此时此刻——

在拍卖师询问前的最后一秒，珂莱塔不顾在场众人的讶异，再次举牌加码，而那腔调十足的客人见状，几乎是毫不犹豫地选择了跟拍。

倒数、举牌，倒数、举牌……回合持续，越来越短促的间隔将气氛推至焦灼，那女人因高涨的数字瞪大了眼睛，满脸不可置信，那孩子顺着加码的声音左右回转着脑袋，险些忘了自己可以呼吸。

终于，在拍卖师即将落锤的时刻，珂莱塔没再出价，只是冲着那客人摆摆手，遗憾地叹了口气，“真不敢相信，除我之外，还有人能看出这幅画的价值，甚至不惜加价至此……好吧，按照规矩，现在这是你的了。”

临近散场，但珂莱塔还有些事宜需处理妥当。

她目送那客人带着画作心满意足离去的背影，隐没身形，来到暗处的角落。那等待已久的孩子凑过来，小声叨叨着，“小姐，你要我传的消息，开场前我就搞定了……今晚会有一个了不起的大作品，莫塔里家的珂莱塔对它志在必得！”是的，的确如此，珂莱塔笑了笑将约定好的酬劳交到对方手上，如果对方乐意，她不介意和他保持更多亲密的、微不足道的小小合作，至于另一位在不远处着踟蹰的女人——

“珂莱塔小姐，我很感激你为我和我父亲所做的一切，只是，只是……”女人喏儒着，似乎有些羞于启齿，珂莱塔却了然地接过话头，“不，今晚的成交价并不含有水分，我的确使用了些许方法，但你父亲的画作确实值这么多。只是有时候，人们还没有足够的耐心。”

这是一场博弈，而她会掌握输赢。

有人得到了备受瞩目的快感，有人得到了长期合作的机遇，有人得到了物质层面的援助。

大家都得到了想要的东西，她也一样。

珂莱塔这样想着，转身离开，没入夜色也没入雨中。`,
  },
  {
    id: "2",
    title: "迟来的过去",
    content: `是夜，这一次雨来得很急。

雨幕倾倒，冲刷着街边的建筑，把零点前的最后一刻填充得更为暗淡。珂莱塔抬眼看去，灯光透过雨水层层消减，湿影憧憧，她突然觉得，穿行于这样的雨幕之中的自己，也像是一个幽灵……幽灵？是的，鬼魅的幽灵追讨着过去，直至将死亡献上才肯松口。

这雨，阻挡不了她找要找的人。

啪嗒啪嗒，似鞋跟落地不断迫近的脚步声，也似卷烟燃烧过半的火粒声。

门吱呀一下推开，珂莱塔径直走向里间，她穿过大半个拉古那，来到那个几乎被时间忘却的老人面前，向他问好，“让我们开诚布公地说吧，我来这里只为了一件事，以莫塔里的名义，宣读你的讣告。”

“我知道你会来。” 老人头发花白，脸上的皱纹如同破旧的墙纸般层层叠叠，他淡淡开口，语气中没有惊讶，仿佛早已预见过这一刻的到来，“莫塔里人从不会真正放下血债，我知道，早晚有一天，我会被找到。”

墙角的窗户开着，寒风微微吹进，带来了夜晚的凉意。

老人瑟缩着，仿佛一个等待宿命降临的影子，珂莱塔却对他的示弱感到厌烦……多么轻巧的口吻？仿佛他不是当年那个在家族纠纷中滥用诡计的人，仿佛他不曾向翡萨烈献媚，在莫塔里谈妥西区的买卖后，发起了针对本部的袭击，致使那样多的成员丧命。

“别将这归咎于命运，这只是选择的后果，你的选择。”

“呵，你这固执而冷酷的莫塔里！十年了，一切早就结束，你们拿回了西区，而我，像只阴沟里的水狗一样，担惊受怕……每个雨夜，我都担心，会有你这样的莫塔里悄无声息地潜进来，杀掉我……” 老人微微叹息，随即神色凛然，将手伸向了藏有武器的暗格。

同一时间，珂莱塔没再言语，只以类似宝石的晶体生成枪与弹，替代了回应。

比起复仇，珂莱塔更愿用清偿债务来形容今晚这种行动。

莫塔里的成员会死亡，但只要还有一个莫塔里人活着，莫塔里就不会消亡，他们可以放心地将自己的后背交给家人，他们可以舍弃生命延续更为必要的价值，因为他们知道，会有另一个莫塔里人替他们做完未尽之事。所以即便过了十年，这笔旧账总要画上句号，才算真正结束。

这不仅关乎代价和结果，更关乎信任和承诺，她需要拿回属于莫塔里家族的那份尊严。

砰，伴随最后一声枪响，又一颗“宝石”碎裂。

倒地的躯体不甘地望着珂莱塔的身影一点点离开视野，但他已不能回头，不能再动上一分一毫，""咳，咳咳……别以为你们已经赢了……欲望的游戏……从不会因死亡而结束……”

是啊，它从来只以倦怠收场。

珂莱塔在心中默念着，走出这角落，任由夜风轻拂过她的脸颊，带走屋内的沉寂。

她关上门，一张印有“债已清偿”的莫塔里的纸笺，轻飘飘落在老人的脚边。

至此……窗外是拉古那，门内是死。`,
  },

  {
    id: "3",
    title: "死与舞的宴请",
    content: `是夜，雨水不断从珂莱塔的发梢滑落，淌至脸颊，她晃悠悠往前走去，只觉得四肢乏力，就像是淹在雨里，细密的雨丝几乎要将她吞没。

突然间，珂莱塔有点懊恼自己那不爱带伞的坏习惯，或许至少， 她能休息片刻，等这一场雨过去……但很可惜，那越发迫近的脚步声的所有者们，并不满足于她的松懈。

那么，就让她更专注一些吧。珂莱塔咬住手套，利落地从手上褪下，和她的对手们继续先前那场，以生命为筹码的舞约。

舞约……是的，灯光交错，舞会的宴请在城中最盛大的主厅举行，修会、翡萨烈、莫塔里，所有在城内叫得上名号的势力都怀揣着自己的目的，悉数到场。

珂莱塔也一样，礼服与鞋跟不会阻挡她的步伐，今晚她将游走在与其他家族的交际间，为暗处的行动做遮掩，拖延时间。

她步入舞池，与那位自翡萨烈的代表交换了一个礼节性的微笑。

“你今晚看起来格外迷人呢，珂莱塔小姐，有什么特别的打算吗？”

“不，只是在享受一个普通的夜晚罢了，和你一样。”

她将手搭上那位美艳的女子的腰际，对方同样握托起她的小臂。

掌心交握，身影婆娑，两道不同的裙摆摇曳，绽放如花。

“是么？但我却觉得……你今晚的目的，不只是来跳舞这么简单。莫塔里来的人不止你一个，对吧？”

“你知道的，我一向喜欢在关键时刻出现在关键地点。你如此在意，想必今晚对翡萨烈意义非凡。”

美艳女子率先变换了步调，手上拉拽发力，试图占据主导，珂莱塔却借着这牵引，将自己变成一道优雅打出的弧度，旋身，再转回。

“修会掌控着城市的未来，而我们翡萨烈……并不打算让你们打破现有的秩序。莫塔里的想法，太过激进了。”

“激进的不是我们，而是你们对权力的渴望。你们以为可以永远掌控一切，但世界并非静止不变。”

双人的舞步在陡升的音阶中越发缭乱，时而是一方对另一方的迫近追逐，时而是一方对另一方的游离周旋，就在舞曲将推至高潮的时刻，美艳女子却倏地撤回手，准备先一步离去——她所注意的方向，正是莫塔里其他成员行动的所在。

行动必须继续，所以抱歉，这场舞还不能就此结束。珂莱塔拉过对方撤回的手，将她代入自己的节奏，与细密的颤音交织的是小而碎的环步，美艳女子找不到体面地停下的间隙，又不好弄出太大的动静，她愤恨地瞪着珂莱塔，眼中闪过一丝狠戾。

“莫塔里的消息很灵通，从一开始，你们就是冲着我新饲育的‘孩子们’来的……呵，但愿你真做好，舞到至死方休的准备。”

于是，共舞的定义和对象就此发生了改变。停步，旋转，重击，倒地……珂莱塔和美艳女子的手下们、她所饲育的成熟的“孩子们”从撤退的路上，一直缠斗到此处，舞在雨中。

致幻的毒素顺着创口流向体内，铁锈味的红色液从唇齿间涌出，珂莱塔满不在乎地勾了勾嘴角，轻笑出声。

上一个倒下的舞伴也是这样的吗？

果然，为他人送葬的带来安息的人，与死亡共舞的人，怎会被死神幸免？

倘若死亡不可避免，那么就让我把这场舞变得更美一些吧……毒素破坏了她的认知和感官，也撕扯开理性和体面身份的约束，她微微躬身，随即笑着为她的舞伴招致足以使雨夜亮如白昼的璀璨。`,
  },

  {
    id: "4",
    title: "以莫塔里的名义",
    content: `是夜，珂莱塔知道，外面大概是又下雨了。虽然隔着窗直接看，看不太出来，但如果留意就能注意到点点湿痕，加重了窗玻璃上的花色。

珂莱塔这样想着，对着镜子撩开了衣摆，是的，先前行动导致的伤口也已经不太看得出来了，毒素什么的已经完全排除。她不是很想歇息，尽管她从来没对谁说过，但什么都不做的时间会让她觉得恐慌，就像是漏了些什么，要不还是再去找「祖父」问问吧，看看能不能尽快继续处理那些“麻烦”。

然而在前厅的回廊里，珂莱塔比她预想的更早地遇见了「祖父」，他们都是习惯了与夜色同行的人，这个点「祖父」没睡不奇怪，但他静默地站在这里，是在看窗外的雨景，还是在看墙上的画作，又或者，是……

“祖父，您在等我？”

“不全是，准确地说，我是在想你才加入家族时的样子。”

珂莱塔有些讶异，坦白地讲，她不是特别喜欢那时候的自己，稚嫩而弱小的旁支孤女，距离莫塔里这个姓氏太过遥远，关于拉古那和家族，关于如何优雅地解决问题，有太多需要她掌握和适应，而除了「祖父」，几乎没人真正看好她。

她唯一引以为傲的，是自己的共鸣能力，力量于珂莱塔而言，是天生就知道如何使用的武器，所以那后来，她一边掌握和适应着莫塔里的规则，一边用力量替家族处理那些不便言明的事宜。
这中间，出了什么差错吗？

珂莱塔自认为，现在的她，已经站在了最有利于家族未来的位置上。家族接纳她，家族肯定她，家族需要她，现在的她更像是「祖父」的孙女，远比那时候的自己更配得上一声莫塔里的称赞。

但为什么「祖父」会向自己提起那时候？

“还记得吗？你向我提出成为执行人的请求，我将那副嵌有欧泊石的手套交给你，就是在这里，”「祖父」轻轻拍了拍珂莱塔的肩膀，“我永远不会怀疑你的能力，只是我开始思索，那是否可以算作你真正想要的。”

自己真正想要的与自己现在所做的……珂莱塔并不认为这两者有什么不同。人生漫长，人们总惯将某种信念、某个理想，甚至是某个人当作自己的锚点，而莫塔里就是她的锚点，莫塔里甚至可以是她的全部。

“不，正因如此，才有所不同，”「祖父」看透珂莱塔所想，以一种有力的口吻将一切娓娓道来，“一个真正的莫塔里，不会以莫塔里为全部。她不会依赖他人的规则生存，无论这规则是我还是家族制定，她必须真正的感受这世界，定义自己的规则。”

“但……我欲使原石变成雕琢后的珠宝，只因为原石天然就拥有璀璨的本质。最开始，在你被莫塔里这概念限制之前，你就已经在定义自己的规则了。”

天微微亮起，「祖父」最终拒绝了珂莱塔尽快继续执行人工作的要求，而是让她写下了一封送给黑海岸的邀请函。珂莱塔朝窗外看去，夜雨过后，拉古那的清晨笼罩在一片灰蓝的雾气里，整个城市像一座沉睡的巨兽，等待着一场足够盛大的狂欢将它唤醒。

那时的珂莱塔尚且不知，正是在这个雨夜，祖父做出了有关莫塔里未来的决定，他将会以一种特殊的方式，将选择的主动权交到她手中，而她也将如最初的自己一样定义前路。`,
  },

  {
    id: "5",
    title: "以珂莱塔的名义",
    content: `黄昏，今日不再有雨。

落日的余晖轻柔地照拂在珂莱塔身上，她端着咖啡寻一处码头停下，看遍染鎏金的潮水不断起落，正如这城中更迭流转的千百个日夜。

不带任何目的，只是随意地走走停停，她以前不常这么干，但以后……她应该会多试试，正如她逐渐开始寻找除莫塔里外的，只属于珂莱塔的部分。

在和那远道而来的客人一同举办了狂欢节之后，在{TA}与自己一同揭露科波拉的背誓之后，珂莱塔终于明白了「祖父」在那个雨夜未能言明的深意。

他担心自己受制于家族所需，做出违背本心的抉择，他并不以自己的旧路为自己划下方向，只希望自己不沉溺在既定的平衡中。

但事实并非完全如此。

她选择在执行人的位置停留，当然有出于家族利益的考量。但每一个需要选择的关键点，她都是真正做出决定的那个人。她选择这样去做，仅此而已，她从没有被教条束缚的打算，过去是，现在是，此后也依旧是。

当然，作为家族的一员时，她并不能仅考虑她自己。她偏好极致的、肆意的方案，并不忌惮变化和风险，但决策或行动时，她必须克制这部分的偏向。客观来说，这的确是身份赋予的枷锁，但这同样是珍贵的联结和羁绊。

珂莱塔·莫塔里，她将被一直需要，她永远不会被再度遗弃。

而抛却这点限制，她已经足够的自由。

一生只为一副佳作的创作，珂莱塔见过很多。

未来是个足够有趣的议题，为完成这副名为自我的画作，她愿意花更多的时间去摸索。方法是，以对这个世界的诸多感受为素材，裁剪、堆叠、拼贴……直至她觉得足够丰满。

只是现在，请允许她一如既往地保持那小小骄傲。

她暂时还不预备向他人袒露更多只属于珂莱塔的部分……不，或许【玩家】会是意外。猫眼石，果然自己还是更喜欢这样称呼【他/她】。他们曾并肩一起走过，尽管终点时，他们谁也没有为对方完全停留，但作为【他/她】毫不避讳地指出自己“过分完美“的回礼，作为答应过的“更加不加掩饰的自己”的承诺，她会将那颗光彩照人的猫眼石纳入关于自我的部分中。

更何况，她有种预感，命运还会将【他/她】再度带到自己面前。至于那时，她又将和【他/她】处于何种境遇，展开怎样的冒险……她尽可以去期待。

远处，贡多拉结束了一天的航行，向码头归航。船上和岸上的人们彼此呼和着，结束了这一日的喧嚣。

雨停后，无人知晓漆色的夜晚究竟发生过怎样的往事，但此刻，太阳的余晖照拂着她，直至下一个夜幕再来。

于是她将杯中的最后一口饮尽，转身向朝那个夜色走去。

在万物静止的时刻，她自会跳自己的舞。

`,
  },
];
const current = ref(0);

function select(index) {
  current.value = index;
  // 将焦点移回当前 tab（便于无障碍与键盘导航）
  const id = `tab-${items[index].id}`;
  const el = document.getElementById(id);
  if (el) el.focus();
}
const storyRef = ref<HTMLElement | null>(null);

function prev() {
  current.value = (current.value - 1 + items.length) % items.length;
  select(current.value);
  storyRef.value.scrollIntoView({ behavior: "smooth", block: "start" });
}

function next() {
  current.value = (current.value + 1) % items.length;
  select(current.value);
  storyRef.value.scrollIntoView({ behavior: "smooth", block: "start" });
}
interface Chibi {
  src: string;
  top: number;
  left: number;
}

const chibiList = ref<Chibi[]>([]);
onMounted(async () => {
  // 1. 基础配置信息
  const total = 9;
  let pickCount = 3; // 每次抽取 3 张
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const isMobile = window.innerWidth <= 768;
  // 如果已知单张小人图片的宽高，可避免超出边界；
  // 假设小人图片宽 100px、高 100px，按需替换：
  const imgWidth = 100;
  const imgHeight = 100;

  // 2. Fisher–Yates 洗牌函数
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // 3. 随机选出 3 个编号
  if (isMobile) {
    pickCount = 1;
  }
  const nums = shuffle(Array.from({ length: total }, (_, k) => k + 1));
  const picks = nums.slice(0, pickCount);

  // 4. 生成随机位置并填充 chibiList
  chibiList.value = []; // 先清空
  picks.forEach((i) => {
    chibiList.value.push({
      src: `/QImages/1 (${i}).png`,
      left: Math.random() * (vw - imgWidth), // 保证不超出左右边界
      top: Math.random() * (vh - imgHeight), // 保证不超出上下边界
    });
  });

  // 2. 等 img 渲染到 DOM
  await nextTick();

  // 3. 给每个小人绑定 GSAP 动画
  const imgs = document.querySelectorAll<HTMLImageElement>(".chibi-img");
  imgs.forEach((img, index) => {
    const padding = 200; // 边缘预留空间
    // ✅ 初始出场动画（闪现）
    gsap.fromTo(
      img,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(2)",
        delay: 0.2 * index,
      }
    );

    // ✅ 鼠标靠近闪避
    img.addEventListener("mouseenter", () => {
      gsap.killTweensOf(img);

      gsap.to(img, {
        x: "+=" + ((Math.random() - 0.5) * 400).toFixed(0),
        y: "+=" + ((Math.random() - 0.5) * 400).toFixed(0),
        duration: 1.2,
        ease: "back.out(2)",
        onComplete: () => {
          // 闪避完成后，再重新启用动画
          animate(img);
        },
      });
    });

    const animate = (img: HTMLImageElement) => {
      let { x, y } = img.getBoundingClientRect();
      let deltaX = (Math.random() - 0.5) * 200;
      let deltaY = (Math.random() - 0.5) * 200;

      // 预测一下偏移后的位置
      let nextX = x + deltaX;
      let nextY = y + deltaY;

      // 校正：防漂出左、右、上、下边界
      if (nextX < padding) deltaX = padding - x;
      if (nextX + img.width > window.innerWidth - padding)
        deltaX = window.innerWidth - padding - (x + img.width);
      if (nextY < padding) deltaY = padding - y;
      if (nextY + img.height > window.innerHeight - padding)
        deltaY = window.innerHeight - padding - (y + img.height);

      gsap.to(img, {
        x: `+=${deltaX.toFixed(0)}`,
        y: `+=${deltaY.toFixed(0)}`,
        rotation: `+=${((Math.random() - 0.5) * 60).toFixed(0)}`,
        duration: 2 + Math.random() * 2,
        ease: "power1.inOut",
        onComplete: () => animate(img),
      });
    };
    animate(img);
  });
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
$color-holo-teal: #bff7ff;
$color-executor-red: #ff2a6d;
$color-text-primary: #eef6fb;
$color-text-secondary: #b0c8e0;
$color-text-dim: #6d8ba3;

$glass-bg: rgba(10, 12, 26, 0.72);
$glass-border: rgba(191, 247, 255, 0.12);
$glass-border-pink: rgba(255, 102, 196, 0.1);
$inner-glow: rgba(191, 247, 255, 0.08);

/* ===== 页面整体重构 ===== */
.megumi-page {
  position: relative;
  min-height: 100vh;
  background: radial-gradient(
      ellipse at 20% 30%,
      rgba(26, 27, 58, 0.8) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 70%,
      rgba(122, 57, 255, 0.15) 0%,
      transparent 40%
    ),
    $color-deep-space;
  color: $color-text-primary;
  font-family: "Inter", "Noto Sans SC", system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: clamp(20px, 4vw, 80px) clamp(16px, 3vw, 40px);
  padding-top: 80px;
  overflow-x: hidden;

  /* 频率网格背景 */
  &::before {
    content: "";
    position: fixed;
    inset: 0;
    background-image: linear-gradient(
        rgba($color-ice-blue, 0.03) 1px,
        transparent 1px
      ),
      linear-gradient(90deg, rgba($color-ice-blue, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: grid-shift 40s linear infinite;
    opacity: 0.3;
    z-index: 0;
    pointer-events: none;
  }
}

.container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* ===== HERO区域重构 ===== */
.hero {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 36px;
  align-items: start;
  position: relative;

  /* 装饰性光晕 */
  &::before {
    content: "";
    position: absolute;
    top: -50px;
    left: -50px;
    width: 300px;
    height: 300px;
    background: radial-gradient(
      circle,
      rgba($color-violet, 0.1) 0%,
      transparent 70%
    );
    filter: blur(60px);
    z-index: -1;
    opacity: 0.5;
  }
}

/* 左侧头像卡片 */
.left-col {
  .avatar-card {
    background: $glass-bg;
    backdrop-filter: blur(12px) saturate(180%);
    border: 1px solid $glass-border;
    border-radius: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    position: relative;
    overflow: hidden;

    /* 卡片光泽效果 */
    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        135deg,
        rgba($color-ice-blue, 0.05) 0%,
        rgba($color-neon-pink, 0.02) 50%,
        transparent 100%
      );
      opacity: 0;
      transition: opacity 0.4s ease;
    }

    &:hover {
      transform: translateY(-8px) scale(1.02);
      border-color: rgba($color-ice-blue, 0.3);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6),
        0 0 40px rgba($color-violet, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);

      &::before {
        opacity: 1;
      }

      .avatar {
        filter: saturate(1.2) brightness(1.1);
        box-shadow: 0 0 40px rgba($color-ice-blue, 0.3),
          0 0 80px rgba($color-neon-pink, 0.1);
      }
    }
  }

  .avatar-wrap {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 16px;
    overflow: hidden;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        135deg,
        transparent 40%,
        rgba($color-ice-blue, 0.1) 60%,
        rgba($color-neon-pink, 0.05) 80%,
        transparent 100%
      );
      opacity: 0.5;
    }
  }

  .avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    filter: saturate(0.9) contrast(1.1);
  }

  .avatar-meta {
    .avatar-badge {
      display: inline-block;
      background: linear-gradient(
        135deg,
        rgba($color-violet, 0.15),
        rgba($color-neon-pink, 0.1)
      );
      border: 1px solid rgba($color-ice-blue, 0.2);
      color: $color-ice-blue;
      padding: 8px 16px;
      border-radius: 100px;
      font-size: 0.9rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-shadow: 0 0 10px rgba($color-ice-blue, 0.3);
    }
  }
}

/* 右侧信息面板 */
.right-col {
  .hero-panel {
    background: $glass-bg;
    backdrop-filter: blur(16px) saturate(180%);
    border: 1px solid $glass-border;
    border-radius: 20px;
    padding: 32px;
    position: relative;
    overflow: hidden;

    /* 装饰性晶体边角 */
    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 100px;
      height: 100px;
      background: linear-gradient(
        135deg,
        transparent 50%,
        rgba($color-ice-blue, 0.1) 100%
      );
      clip-path: polygon(100% 0, 0 0, 100% 100%);
    }

    /* 扫描线效果 */
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent,
        $color-holo-teal,
        transparent
      );
      animation: scanline 6s linear infinite;
      opacity: 0.3;
    }
  }

  .name {
    font-size: clamp(2.2rem, 4vw, 3.5rem);
    font-weight: 900;
    line-height: 1.1;
    margin: 0 0 8px 0;
    background: linear-gradient(
      135deg,
      $color-ice-blue,
      $color-holo-teal 30%,
      $color-neon-pink
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    position: relative;
    display: inline-block;

    /* 故障艺术效果 */
    &::before,
    &::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }

    &::before {
      animation: glitch-1 8s infinite;
      color: $color-neon-pink;
      z-index: -1;
    }

    &::after {
      animation: glitch-2 10s infinite;
      color: $color-holo-teal;
      z-index: -2;
    }
  }

  .jp {
    display: block;
    font-size: 1.1rem;
    color: $color-text-secondary;
    font-weight: 400;
    margin-top: 4px;
    letter-spacing: 0.3px;
    opacity: 0.9;
  }

  .subtitle {
    font-size: 1.4rem;

    font-weight: 600;
    margin: 12px 0;
    text-shadow: 0 0 20px rgba($color-holo-teal, 0.3);
    position: relative;
    display: inline-block;
    padding-left: 20px;
    /* 增强渐变效果 */
    background: linear-gradient(
      135deg,
      $color-ice-blue 0%,
      $color-neon-pink 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    &::before {
      content: "❖";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      color: $color-ice-blue;
      animation: spin 10s linear infinite;
    }
  }

  .lead {
    font-size: 1.1rem;
    line-height: 1.7;
    color: $color-text-secondary;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid rgba($color-ice-blue, 0.1);
    position: relative;

    &::first-letter {
      font-size: 1.4em;
      color: $color-ice-blue;
      font-weight: 700;
      float: left;
      line-height: 1;
      margin-right: 8px;
    }
  }
}

/* ===== 通用卡片样式重构 ===== */
.card {
  background: $glass-bg;
  backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid $glass-border;
  border-radius: 20px;
  padding: 32px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);

  /* 卡片内部光晕 */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 20% 80%,
      rgba($color-violet, 0.1) 0%,
      transparent 50%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-5px);
    border-color: rgba($color-ice-blue, 0.25);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5),
      0 0 40px rgba($color-violet, 0.15);

    &::before {
      opacity: 1;
    }

    .card-head h2::after {
      width: 100%;
    }
  }

  .card-head {
    margin-bottom: 24px;
    position: relative;

    h2 {
      font-size: 1.8rem;
      font-weight: 800;
      color: $color-ice-blue;
      margin: 0;
      display: inline-block;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 60px;
        height: 3px;
        background: linear-gradient(90deg, $color-ice-blue, $color-neon-pink);
        border-radius: 2px;
        transition: width 0.4s ease;
      }
    }
  }
}

/* ===== 个性卡片重构 ===== */
.personality {
  .traits {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      padding: 16px 0;
      border-bottom: 1px solid rgba($color-ice-blue, 0.08);
      color: $color-text-secondary;
      line-height: 1.6;
      position: relative;
      padding-left: 24px;
      transition: padding-left 0.3s ease;

      &::before {
        content: "✦";
        position: absolute;
        left: 0;
        top: 16px;
        color: $color-neon-pink;
        font-size: 0.9rem;
        opacity: 0.6;
      }

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        padding-left: 32px;
        color: $color-text-primary;

        &::before {
          opacity: 1;
          transform: scale(1.2);
        }
      }

      &[style*="font-weight: bold"] {
        color: $color-holo-teal;
        font-size: 1.1rem;
        margin-top: 8px;

        &::before {
          content: "❖";
          color: $color-holo-teal;
          opacity: 1;
        }
      }
    }
  }
}

/* ===== 共鸣状况卡片重构 ===== */
.overview {
  .two-col {
    display: flex;
    gap: 40px;
    align-items: flex-start;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 24px;
    }
  }

  .text-block {
    flex: 1;

    p {
      color: $color-text-secondary;
      line-height: 1.8;
      margin: 0;
      font-size: 1.05rem;

      &::first-line {
        color: $color-ice-blue;
        font-weight: 600;
      }
    }
  }
}

/* ===== 特殊主题区域重构 ===== */
.special-section {
  .content {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 36px;
    align-items: center;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }

  .img-area {
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    aspect-ratio: 1;

    &::before {
      content: "";
      position: absolute;
      inset: -1px;
      background: linear-gradient(
        135deg,
        $color-ice-blue,
        $color-neon-pink,
        $color-violet
      );
      opacity: 0.3;
      filter: blur(10px);
      z-index: -1;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  .text-block p {
    color: $color-text-secondary;
    line-height: 1.8;
    font-size: 1.05rem;
    margin: 0;
  }
}
/* 在CSS文件的末尾添加，大约在最后的大括号前 */

/* 隐藏细节卡片样式 */
#hidden-details {
  .details-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .detail-card {
    background: rgba(10, 12, 26, 0.6);
    border: 1px solid rgba($color-ice-blue, 0.15);
    border-radius: 16px;
    padding: 24px;
    display: flex;
    align-items: flex-start;
    gap: 20px;
    position: relative;
    transition: all 0.3s ease;
    overflow: hidden;

    &:hover {
      transform: translateX(5px);
      border-color: rgba($color-ice-blue, 0.3);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3),
        0 0 20px rgba($color-violet, 0.1);

      .detail-icon {
        transform: scale(1.1) rotate(5deg);
      }
    }

    &.detail-card-highlight {
      border: 1px solid rgba($color-neon-pink, 0.25);
      background: linear-gradient(
        135deg,
        rgba($color-neon-pink, 0.05),
        rgba(10, 12, 26, 0.7)
      );

      .detail-icon {
        background: rgba($color-neon-pink, 0.15);
      }
    }
  }

  .detail-icon {
    font-size: 2rem;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba($color-ice-blue, 0.1);
    border-radius: 12px;
    transition: all 0.3s ease;
    flex-shrink: 0;
  }

  .detail-content {
    flex: 1;
  }

  .detail-title {
    font-size: 1.3rem;
    font-weight: 700;
    color: $color-holo-teal;
    margin: 0 0 12px 0;
    position: relative;
    display: inline-block;

    &::after {
      content: "";
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 40px;
      height: 2px;
      background: linear-gradient(90deg, $color-holo-teal, transparent);
    }
  }

  .detail-text {
    color: $color-text-secondary;
    line-height: 1.7;
    font-size: 1.05rem;

    br {
      margin-bottom: 8px;
      display: block;
    }
  }

  .detail-number {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 28px;
    height: 28px;
    background: linear-gradient(135deg, $color-ice-blue, $color-neon-pink);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    font-weight: 700;
    color: $color-deep-space;
    box-shadow: 0 0 10px rgba($color-ice-blue, 0.3);
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  #hidden-details {
    .detail-card {
      flex-direction: column;
      gap: 16px;
      padding: 20px;
    }

    .detail-icon {
      align-self: center;
    }

    .detail-title {
      text-align: center;

      &::after {
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .detail-text {
      text-align: center;
    }
  }
}
/* ===== 时间线卡片重构 ===== */
.timeline {
  .tl-wrap {
    position: relative;
    padding: 20px 0 0 60px;

    @media (max-width: 768px) {
      padding-left: 30px;
    }
  }

  .vl {
    position: absolute;
    left: 30px;
    top: 40px;
    bottom: 20px;
    width: 3px;
    background: linear-gradient(
      to bottom,
      transparent,
      $color-ice-blue 20%,
      $color-neon-pink 80%,
      transparent
    );

    @media (max-width: 768px) {
      left: 15px;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -4px;
      width: 11px;
      height: 11px;
      background: $color-ice-blue;
      border-radius: 50%;
      box-shadow: 0 0 20px $color-ice-blue;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: -4px;
      width: 11px;
      height: 11px;
      background: $color-neon-pink;
      border-radius: 50%;
      box-shadow: 0 0 20px $color-neon-pink;
    }
  }

  .tl-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .tl-item {
    position: relative;
    margin-bottom: 32px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .tl-card {
    background: rgba(10, 12, 26, 0.6);
    border: 1px solid rgba($color-ice-blue, 0.15);
    border-radius: 16px;
    padding: 24px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: linear-gradient(to bottom, $color-ice-blue, $color-neon-pink);
    }

    &:hover {
      transform: translateX(8px);
      border-color: rgba($color-ice-blue, 0.3);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3),
        0 0 30px rgba($color-violet, 0.1);
    }
  }

  .tl-title {
    font-size: 1.3rem;
    font-weight: 700;
    color: $color-ice-blue;
    margin: 0 0 12px 0;
    display: flex;
    align-items: center;
    gap: 8px;

    &::before {
      content: "◈";
      color: $color-neon-pink;
      font-size: 0.9em;
    }
  }

  .tl-desc {
    color: $color-text-secondary;
    line-height: 1.7;
    margin: 0;
    font-size: 1.05rem;
  }
}

/* ===== 故事卡片重构 ===== */
.ll-stories {
  .card {
    border: 1px solid $glass-border;
    background: $glass-bg;
    backdrop-filter: blur(12px) saturate(180%);
    border-radius: 20px;
    overflow: hidden;
  }

  .card-head {
    background: linear-gradient(
      135deg,
      rgba($color-violet, 0.15),
      rgba($color-neon-pink, 0.1)
    );
    padding: 24px;
    border-bottom: 1px solid rgba($color-ice-blue, 0.1);

    .card-title {
      font-size: 1.8rem;
      font-weight: 800;
      color: $color-ice-blue;
      margin: 0;
      text-shadow: 0 0 20px rgba($color-ice-blue, 0.3);
    }
  }

  .card-body {
    padding: 32px;
    min-height: 400px;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
      padding: 24px;
      min-height: 300px;
    }
  }

  .story {
    flex: 1;
    display: flex;
    flex-direction: column;

    .story-head {
      font-size: 1.5rem;
      font-weight: 700;
      color: $color-holo-teal;
      margin: 0 0 20px 0;
      padding-bottom: 12px;
      border-bottom: 2px solid rgba($color-holo-teal, 0.2);
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100px;
        height: 2px;
        background: linear-gradient(90deg, $color-holo-teal, transparent);
      }
    }

    .story-content {
      color: $color-text-secondary;
      line-height: 1.8;
      flex: 1;
      overflow-y: auto;
      padding-right: 8px;

      /* 自定义滚动条 */
      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-track {
        background: rgba($color-ice-blue, 0.05);
        border-radius: 2px;
      }

      &::-webkit-scrollbar-thumb {
        background: linear-gradient(
          to bottom,
          $color-ice-blue,
          $color-neon-pink
        );
        border-radius: 2px;
      }
    }
  }

  .card-foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 32px;
    background: rgba(5, 6, 10, 0.5);
    border-top: 1px solid rgba($color-ice-blue, 0.1);

    @media (max-width: 768px) {
      padding: 16px 24px;
    }

    .nav-btn {
      background: linear-gradient(
        135deg,
        rgba($color-ice-blue, 0.1),
        rgba($color-neon-pink, 0.05)
      );
      border: 1px solid rgba($color-ice-blue, 0.2);
      color: $color-ice-blue;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: linear-gradient(
          135deg,
          rgba($color-ice-blue, 0.2),
          rgba($color-neon-pink, 0.1)
        );
        border-color: rgba($color-ice-blue, 0.4);
        transform: translateY(-2px);
        box-shadow: 0 5px 20px rgba($color-ice-blue, 0.2);
      }

      &:active {
        transform: translateY(0);
      }
    }

    .pager {
      color: $color-text-dim;
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: 1px;

      &::before,
      &::after {
        content: "◈";
        margin: 0 8px;
        color: $color-neon-pink;
        opacity: 0.6;
      }
    }
  }
}

/* ===== 浮动小人样式优化 ===== */
.floating-chibis {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;

  .chibi-img {
    position: absolute;
    width: 80px;
    height: auto;
    filter: drop-shadow(0 0 10px rgba($color-ice-blue, 0.3));
    user-select: none;
    pointer-events: auto;
    cursor: pointer;
    transition: filter 0.3s ease;

    &:hover {
      filter: drop-shadow(0 0 20px rgba($color-neon-pink, 0.5));
    }
  }
}

/* ===== 动画定义 ===== */
@keyframes grid-shift {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 50px 50px;
  }
}

@keyframes scanline {
  0% {
    transform: translateX(-100%) translateY(0);
  }
  100% {
    transform: translateX(100%) translateY(0);
  }
}

@keyframes glitch-1 {
  0%,
  95% {
    opacity: 0;
    transform: translate(0);
  }
  96% {
    opacity: 0.4;
    transform: translate(-3px, 2px);
  }
  97% {
    opacity: 0.2;
    transform: translate(3px, -2px);
  }
  98% {
    opacity: 0.5;
    transform: translate(-1px, 1px);
  }
  99% {
    opacity: 0;
    transform: translate(0);
  }
}

@keyframes glitch-2 {
  0%,
  95% {
    opacity: 0;
    transform: translate(0);
  }
  96% {
    opacity: 0.3;
    transform: translate(2px, -1px);
  }
  97% {
    opacity: 0.1;
    transform: translate(-2px, 2px);
  }
  98% {
    opacity: 0.4;
    transform: translate(1px, 1px);
  }
  99% {
    opacity: 0;
    transform: translate(0);
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

/* ===== 响应式设计 ===== */
@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 240px 1fr;
    gap: 28px;
  }
}

@media (max-width: 768px) {
  .megumi-page {
    padding: 60px 16px 40px;
  }

  .hero {
    grid-template-columns: 1fr;
    gap: 24px;

    .left-col {
      display: flex;
      justify-content: center;

      .avatar-card {
        max-width: 200px;
      }
    }
  }

  .card {
    padding: 24px;
  }

  .special-section .content {
    grid-template-columns: 1fr;

    .img-area {
      max-width: 200px;
      margin: 0 auto;
    }
  }

  .timeline .tl-wrap {
    padding-left: 40px;
  }
}

@media (max-width: 480px) {
  .hero-panel {
    padding: 24px !important;
  }

  .name {
    font-size: 2rem !important;
  }

  .card {
    padding: 20px;
  }

  .ll-stories .card-body {
    padding: 20px;
  }
}

/* 页面过渡动画 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 减少运动偏好 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>