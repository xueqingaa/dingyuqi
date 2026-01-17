export async function onRequestGet(context) {
  const kv = context.env.SUB_KV;

  const data = {
    titleText: await kv.get("titleText") || "XUE CF代理",
    sub1: await kv.get("sub1") || "123",
    sub2: await kv.get("sub2") || "456",
    notice: await kv.get("notice") || "马到成功",
    bgUrl: await kv.get("bgUrl") || "",
    userPassword: await kv.get("userPassword") || "88888888"
  };

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
}