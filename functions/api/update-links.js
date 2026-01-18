export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const { password, titleText, sub1, sub2, sub3, notice, bgUrl, musicUrl, userPassword } = body;

    const correct = context.env.ADMIN_PASSWORD;
    if (password !== correct) {
      return new Response(JSON.stringify({ success: false, message: "Unauthorized" }), { status: 401 });
    }

    if (body.checkOnly) return new Response(JSON.stringify({ success: true }));

    const kv = context.env.SUB_KV;

    if (titleText !== undefined) await kv.put("titleText", titleText.trim());
    if (sub1 !== undefined) await kv.put("sub1", sub1.trim());
    if (sub2 !== undefined) await kv.put("sub2", sub2.trim());
    if (sub3 !== undefined) await kv.put("sub3", sub3.trim());
    if (notice !== undefined) await kv.put("notice", notice.trim());
    if (bgUrl !== undefined) await kv.put("bgUrl", bgUrl.trim());
    if (musicUrl !== undefined) await kv.put("musicUrl", musicUrl.trim());
    if (userPassword !== undefined) await kv.put("userPassword", userPassword.trim());

    return new Response(JSON.stringify({ success: true }));
  } catch (e) {
    return new Response(JSON.stringify({ success: false, message: "Bad Request" }), { status: 400 });
  }
}
