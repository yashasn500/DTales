require("dotenv").config();

const express = require("express");
const cors = require("cors");

const blogsRouter = require("./routes/blogs");
const caseStudiesRouter = require("./routes/case-studies");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/blogs", blogsRouter);
app.use("/api/case-studies", caseStudiesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("✅ Backend running on port", PORT);
});
