export async function onRequestGet(context) {
  const kv = context.env.SUB_KV;

  const data = {
    titleText: await kv.get("titleText") || "XUE CF代理",
    sub1: await kv.get("sub1") || "",
    sub2: await kv.get("sub2") || "",
    sub3: await kv.get("sub3") || "", 
    notice: await kv.get("notice") || "",
    bgUrl: await kv.get("bgUrl") || "",
    musicUrl: await kv.get("musicUrl") || "",
    userPassword: await kv.get("userPassword") || "88888888"
  };

  return new Response(JSON.stringify(data), {
    headers: { 
      "Content-Type": "application/json",
      "Cache-Control": "no-cache" 
    }
  });
}
