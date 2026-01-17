// functions/api/get-links.js
export async function onRequestGet(context) {
  const kv = context.env.SUB_KV;

  // 从 KV 中读取，如果没有则用默认值
  const sub1 = await kv.get("sub1") || "https://default-sub1.example.com";
  const sub2 = await kv.get("sub2") || "https://default-sub2.example.com";

  return new Response(
    JSON.stringify({ sub1, sub2 }),
    {
      headers: { "Content-Type": "application/json" }
    }
  );
}
