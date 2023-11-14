import config from "./config/index.js";
import app from "./app.js";

const { port } = config;

app.listen(port, () => {
  console.log(`✅ Server running on port: ${port}`);
});
