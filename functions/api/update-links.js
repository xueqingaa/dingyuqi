export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    // 1. 这里加上了 musicUrl
    const { password, titleText, sub1, sub2, notice, bgUrl, musicUrl, userPassword } = body;

    const correct = context.env.ADMIN_PASSWORD;
    if (!correct) return new Response("Server config error", { status: 500 });

    // 验证密码，如果只是检查密码（checkOnly），直接返回成功
    if (password !== correct) {
        return new Response(JSON.stringify({ success: false, message: "Unauthorized" }), { 
            status: 401,
            headers: { "Content-Type": "application/json" }
        });
    }
    
    if (body.checkOnly) return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" }
    });

    const kv = context.env.SUB_KV;

    // 2. 确保这里每一个变量都被写入 KV 数据库
    if (titleText !== undefined) await kv.put("titleText", titleText.trim());
    if (sub1 !== undefined) await kv.put("sub1", sub1.trim());
    if (sub2 !== undefined) await kv.put("sub2", sub2.trim());
    if (notice !== undefined) await kv.put("notice", notice.trim());
    if (bgUrl !== undefined) await kv.put("bgUrl", bgUrl.trim());
    
    // 关键：这一行必须加上，否则保存不了音乐链接
    if (musicUrl !== undefined) await kv.put("musicUrl", musicUrl.trim());
    
    if (userPassword !== undefined && userPassword.trim()) {
        await kv.put("userPassword", userPassword.trim());
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response("Bad request", { status: 400 });
  }
}
