// functions/api/update-links.js
export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const { password, sub1, sub2 } = body;

    // 从环境变量读取管理员密码（必须在 dashboard 设置）
    const correctPassword = context.env.ADMIN_PASSWORD;

    if (!correctPassword) {
      return new Response("Server configuration error", { status: 500 });
    }

    if (password !== correctPassword) {
      return new Response("Unauthorized", { status: 401 });
    }

    const kv = context.env.SUB_KV;

    // 只更新有值的字段
    if (sub1 !== undefined && sub1.trim() !== "") {
      await kv.put("sub1", sub1.trim());
    }
    if (sub2 !== undefined && sub2.trim() !== "") {
      await kv.put("sub2", sub2.trim());
    }

    return new Response(
      JSON.stringify({ success: true, message: "Links updated" }),
      {
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (e) {
    return new Response("Bad request or server error", { status: 400 });
  }
}
