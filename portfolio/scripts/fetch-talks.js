const fs = require("fs/promises");
const dotenv = require("dotenv");
dotenv.config();

const TALKS_URL = process.env.TALKS_URL;

(async () => {
  const talks = await fetch(TALKS_URL);
  const talksData = await talks.json();
  await fs.mkdir("src/data", { recursive: true });
  await fs.writeFile(
    "src/data/sessions.json",
    JSON.stringify(talksData.sessions, null, 2)
  );
  await fs.writeFile(
    "src/data/events.json",
    JSON.stringify(talksData.events, null, 2)
  );
})();
