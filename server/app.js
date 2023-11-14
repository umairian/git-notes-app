import express from "express";
import expressLogger from "express-bunyan-logger";
import cors from "cors";
import router from "./routes/index.js";

// eslint-disable-next-line no-undef
process.on("uncaughtException", (e) => {
  console.log(e);
});

const app = express();

app.use(
  express.json({
    inflate: true, // Enables handling deflated (compressed) bodies; when disabled, deflated bodies are rejected.
    limit: "10mb", // Controls the maximum request body size. Default unit is number of bytes,
    strict: true, //	Enables only accepting arrays and objects
  })
);
app.use(
  express.urlencoded({
    inflate: true,
    limit: "10mb",
    extended: true,
  })
);
app.use(
  expressLogger({
    excludes: [
      "headers",
      "req",
      "user-agent",
      "short-body",
      "http-version",
      "req-headers",
      "res-headers",
      "body",
      "res",
    ], // remove extra details from log
  })
);
app.use(cors());

// routes
app.use("/api", router);

// catch 404 later
app.use((req, res) => {
  console.log(req.header);
  return res.status(404).send("Error 404, Route not found");
});

export default app;
