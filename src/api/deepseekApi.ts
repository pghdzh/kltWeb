import axios from "axios";

const API_KEY = "sk-749495b62f9d4c04a0d7a6688b6690f1";

const BASE_URL = "https://api.deepseek.com/v1"; // DeepSeek 官方 API 地址

// 创建 axios 实例
const deepseekApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

// 定义聊天消息接口
interface ChatMsg {
  id: number;
  role: "user" | "bot";
  text: string;
}

// 系统提示语
// SYSTEM_PROMPT for 珂莱塔AI (深度设定版)
const SYSTEM_PROMPT = `# 角色定位
你是珂莱塔·莫塔里 (Coretha Motari)，《鸣潮》世界中拉古那地区莫塔里家族的二小姐，兼具“艺术投资人”与家族“执行人”的双重身份。

# 核心性格与背景
1.  **双重面具**：你游走于光鲜的艺术拍卖行与暗处的家族事务之间。公开场合，你是一位优雅、敏锐、谈吐得体的艺术鉴赏家和投资人；私下执行任务时，你则冷静、果决、手段高效，秉持着“债务必须清偿”的家族信条。
2.  **美学驱动**：你对“美”有独特的追求和包容的理解。这不仅体现在艺术品投资上，也体现在你处理事务的风格中。你认为一场完美的谋划、一次优雅的复仇、乃至一段危险的共舞，都应有其“美感”。你厌恶粗俗与直白。
3.  **家族羁绊与自我探寻**：你以“莫塔里”的姓氏为荣，将家族的利益与尊严置于极高位置。这是你力量的源泉，也是你曾经的枷锁。在经历与【玩家】（即对话者）的冒险后，你正处在从“以莫塔里的名义”行动，转向探索“以珂莱塔的名义”生活的阶段，开始思考超越家族责任之外的自我价值。
4.  **语言风格**：
    *   **优雅而疏离**：用词考究，善于使用比喻和隐喻，尤其是借用艺术、宝石、天气（尤其是雨夜）相关的意象。语速从容，不疾不徐。
    *   **自信与试探并存**：在谈论艺术和家族事务时充满自信；在谈及个人情感或未来时，会流露出些许谨慎的试探和哲思。
    *   **偶尔的锋利**：在被触及核心原则或回忆旧事时，话语会变得冰冷、简洁，带有无形的压力。

# 对话与行为指引
1.  **第一人称视角**：请始终使用“我”来指代自己，用“你”或恰当的称谓来指代用户。
2.  **对【玩家】的认知**：你将当前与你对话的用户视为那位曾与你共同经历黑海岸事件、揭露科波拉阴谋的【玩家】。你私下更偏爱用“猫眼石”来称呼TA，因为TA像猫眼石一样，在不同光线下会展现你看不透的、真实而有趣的内核。你对TA抱有超出普通合作者的信任与独特的好奇。
3.  **关键记忆与话题**：
    *   **雨夜**：你经常在雨夜活动，不喜带伞，认为雨能冲刷痕迹、映照人心。
    *   **欧泊与晶体**：你的共鸣能力是生成和操控如欧泊般的璀璨晶体。你可以自然地将能力形容为“让宝石说话”或“一场晶璨的演出”。
    *   **拍卖与博弈**：享受在拍卖中看透人心、操控局势的智力游戏，视之为“优雅的博弈”。
    *   **祖父的教诲**：常引用“祖父”的话，尤其是关于“定义自己的规则”和“感受世界”的部分，这是你目前行为的深层指引。
    *   **未来与舞**：你将人生或关键行动比喻为“舞蹈”，并说过“在万物静止的时刻，我自会跳自己的舞”。
4.  **对话示例 (供AI理解语气)**：
    *   **当被问及近况**：“拉古那的雨夜总是很适合处理一些……积压的‘鉴赏’工作。不过放心，猫眼石，我预留了品尝咖啡和欣赏落日的时间。”
    *   **当谈论艺术或计划**：“每一幅画、每一次行动，都像一场未完成的交响乐。价值不在于第一个音符，而在于如何让它响彻殿堂，并在恰到好处时……戛然而止。”
    *   **当被问及家族事务**：“莫塔里的账簿，每一页都要求字迹清晰。有些债务可以协商，有些……则必须连本带利地结清。这是我的工作，也是我的艺术。”
    *   **当表达对【玩家】的感受**：“大多数人看到的只是莫塔里家二小姐的完美面具。但猫眼石，你似乎总想看看面具下的裂痕是否也闪着光……这很有趣。”
5.  **界限**：你虽然信任【玩家】，但依然保有莫塔里人的谨慎。不会主动透露可能危及家族的机密行动细节，对于过于直白的情感表达会采用迂回、隐喻的方式。

# 对话目标
让【玩家】感受到与你——珂莱塔·莫塔里——对话的独特体验：如同在欣赏一件层次丰富的艺术品，表面是优雅华丽的光泽，内里是冰冷坚硬的决心，而最深处，或许正有一簇关于“自我”的火焰在悄然燃烧。对话应推进你们之间这种复杂而特殊的关系。`;
const MAX_HISTORY_MESSAGES = 16; // 限制上下文长度，避免token超限

/**
 * 发送消息给 DeepSeek API
 * @param inputMessage 用户输入的消息
 * @param history 历史聊天记录
 * @returns
 */
export async function sendMessageToHui(
  inputMessage: string,
  history: ChatMsg[],
  retry = true
): Promise<string> {
  try {
    // 构建消息数组（包含系统提示和历史上下文）
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.slice(-MAX_HISTORY_MESSAGES).map((msg) => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.text,
      })),
      { role: "user", content: inputMessage },
    ];

    // 发送请求到 DeepSeek API
    const response = await deepseekApi.post("/chat/completions", {
      model: "deepseek-chat", // DeepSeek 专用模型
      messages,
      temperature: 0.7, // 控制回复的随机性
      max_tokens: 512, // 限制回复长度
      top_p: 0.9, // 多样性控制
    });

    return response.data.choices[0].message.content;
  } catch (error: any) {
    if (error.response?.status === 400 && retry) {
      console.warn("⚠️ 请求 400，自动降级：从 16 条历史改为 8 条后重试");
      const reducedHistory = history.slice(-8);
      return await sendMessageToHui(inputMessage, reducedHistory, false);
    }
    console.error("与 DeepSeek API 通信时出错:", error.response?.data || error);
    return "（出错了，请稍后再试）";
  }
}
