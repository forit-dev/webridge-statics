export default async (request, context) => {
  const url = new URL(request.url);
  const path = url.pathname;
  const filePath = `/thanksad/json${path.replace('/thanksad/safe/json', '')}`;
  const fullUrl = `https://hilarious-belekoy-fe60c8.netlify.app${filePath}`; // ← デプロイ先の URL に合わせて調整

  try {
    const res = await fetch(fullUrl, { cf: { cacheEverything: false } });
    if (res.status === 200) {
      return context.rewrite(filePath);
    }
  } catch (e) {
    // 通信エラーなどは fallback
  }

  return context.rewrite('/thanksad/json/empty.json');
};