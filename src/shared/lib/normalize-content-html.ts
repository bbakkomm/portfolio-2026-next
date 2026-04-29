const HOST = process.env.NEXT_PUBLIC_IMAGE_URL ?? "";

export function normalizeContentHtml(html: string): string {
  if (!html) return html;
  return html.replace(
    /<img(\s+[^>]*?)src=(["'])(.*?)\2/gi,
    (_m, pre, q, src) => {
      let next = src.trim();
      if (!/^(https?:)?\/\//i.test(next)) {
        next = `${HOST.replace(/\/$/, "")}/${next.replace(/^\//, "")}`;
      }
      if (next.includes(" ")) {
        next = next.replace(/ /g, "%20");
      }
      return `<img${pre}src=${q}${next}${q}`;
    }
  );
}
