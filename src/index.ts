type TocItem = {
  anchor: string;
  level: number;
  text: string;
};

function showdownToc({ toc }: { toc: TocItem[] }) {
  return () => [
    {
      type: 'output',
      filter(source: string) {
        if (toc) {
          const regex = /<h([1-6]).*?id="([^"]*?)".*?>(.+?)<\/h[1-6]>/g;
          source.replace(regex, (_, level, anchor, text) => {
            text = text.replace(/<[^>]+>/g, '');
            toc.push({ anchor, level, text });
            return '';
          });
        }
        return source;
      },
    },
  ];
}

export default showdownToc;
