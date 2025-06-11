export default async (request, context) => {
  const url = new URL(request.url);
  const path = url.pathname;
  // 実ファイルのパスを組み立て
  const filePath = `thanksad/json${path.replace('/thanksad/json', '')}`;

  try {
    // ファイルの存在チェック
    const res = await context.rewrite(`/thanksad/json${path.replace('/thanksad/json', '')}`);
    if (res.status === 200) {
      return res;
    }
  } catch (e) {
    // 何もしない（次へ）
  }
  // 存在しない場合はempty.jsonを返す
  return context.rewrite('/thanksad/json/empty.json');
};
