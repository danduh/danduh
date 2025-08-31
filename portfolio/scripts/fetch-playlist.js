// Node 18+ has global fetch
const fs = require("fs/promises");
const dotenv = require("dotenv");
dotenv.config();

const API_KEY = process.env.YT_API_KEY;
const PLAYLIST_ID = process.env.YT_PLAYLIST_ID;

async function fetchAll(playlistId) {
  let pageToken = "";
  const items = [];
  do {
    const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
    url.search = new URLSearchParams({
      part: "snippet,contentDetails",
      playlistId,
      maxResults: "50",
      key: API_KEY,
      ...(pageToken ? { pageToken } : {}),
    }).toString();
    const res = await fetch(url);
    const json = await res.json();
    if (json.error) throw new Error(JSON.stringify(json.error));
    for (const it of json.items || []) {
      items.push({
        id: it.contentDetails.videoId,
        title: it.snippet.title,
        description: it.snippet.description,
        publishedAt:
          it.contentDetails.videoPublishedAt || it.snippet.publishedAt,
        thumbnails: it.snippet.thumbnails,
      });
    }
    pageToken = json.nextPageToken || "";
  } while (pageToken);
  return items;
}

(async () => {
  const items = await fetchAll(PLAYLIST_ID);
  await fs.mkdir("src/data", { recursive: true });
  await fs.writeFile("src/data/videos.json", JSON.stringify(items, null, 2));
  console.log(`Saved ${items.length} videos to src/data/videos.json`);
})();
