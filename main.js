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
          body: JSON.stringify({ prompt })
        });
        const result = await response.text();
        extensionAPI.sendMessage(result);
      } catch (error) {
        extensionAPI.sendMessage("❌ 熔合失败：" + error.message);
      }
    }
  });
}
