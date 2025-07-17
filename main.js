export function initExtension(extensionAPI) {
  extensionAPI.registerSlashCommand({
    name: "/熔合",
    description: "使用记忆熔炉生成剧情",
    parameters: [
      { name: "prompt", type: "string", description: "剧情提示文本" }
    ],
    onCommand: async ({ prompt }) => {
      try {
        const response = await fetch("http://localhost:8800/fuse", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              { role: "user", content: prompt }
            ]
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP错误 ${response.status}`);
        }

        const data = await response.json();

        if (data.reply) {
          extensionAPI.sendMessage(data.reply);
        } else if (data.error) {
          extensionAPI.sendMessage("❌ 熔合失败：" + data.error);
        } else {
          extensionAPI.sendMessage("❌ 熔合失败：未知错误");
        }
      } catch (error) {
        extensionAPI.sendMessage("❌ 熔合失败：" + error.message);
      }
    }
  });
}

