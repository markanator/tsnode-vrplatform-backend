require("dotenv").config();
import server from "./app";

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`\n=== Server listening on  http://localhost:${PORT} ===\n`);
});
