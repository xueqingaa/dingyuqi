export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const { password, titleText, sub1, sub2, notice, bgUrl, userPassword } = body;

    const correct = context.env.ADMIN_PASSWORD;
    if (!correct) return new Response("Server config error", { status: 500 });

    if (password !== correct) return new Response("Unauthorized", { status: 401 });

    const kv = context.env.SUB_KV;

    if (titleText !== undefined) await kv.put("titleText", titleText.trim());
    if (sub1 !== undefined) await kv.put("sub1", sub1.trim());
    if (sub2 !== undefined) await kv.put("sub2", sub2.trim());
    if (notice !== undefined) await kv.put("notice", notice.trim());
    if (bgUrl !== undefined) await kv.put("bgUrl", bgUrl.trim());
    if (userPassword !== undefined && userPassword.trim()) await kv.put("userPassword", userPassword.trim());

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response("Bad request", { status: 400 });
  }
}