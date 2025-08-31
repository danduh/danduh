const fs = require('fs/promises');
const Parser = require('rss-parser');
const dotenv = require("dotenv");
dotenv.config();

const parser = new Parser({ customFields: { item: [['content:encoded', 'content']] } });

const FEED = process.env.MEDIUM_FEED_URL;
console.log(`Fetching feed ${FEED}`);

(async () => {
  const feed = await parser.parseURL(FEED);
  const items = (feed.items || []).map(it => {
    const html = it.content || '';
    const img = (html.match(/<img[^>]+src="([^">]+)"/i) || [])[1] || null;
    return {
      title: it.title,
      link: it.link,
      pubDate: it.pubDate,
      author: it.creator || '',
      image: img,
      excerpt: (html.replace(/<[^>]+>/g, '').slice(0, 350) + '…').replace(/\s+/g, ' ')
    };
  });
  await fs.mkdir('src/data', { recursive: true });
  await fs.writeFile('src/data/medium.json', JSON.stringify(items, null, 2));
  console.log(`Saved ${items.length} posts`);
})();
