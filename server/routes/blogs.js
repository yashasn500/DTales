const { Router } = require("express");
const pool = require("../db");

const router = Router();

/**
 * Generate a URL-safe slug from a title
 */
function generateSlug(title) {
  if (!title) return "untitled";
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Ensure slug is unique by appending a counter if needed
 */
async function ensureUniqueSlug(baseSlug, excludeId = null) {
  let slug = baseSlug;
  let counter = 1;
  
  while (true) {
    const query = excludeId
      ? "SELECT id FROM blogs WHERE slug = $1 AND id != $2"
      : "SELECT id FROM blogs WHERE slug = $1";
    const params = excludeId ? [slug, excludeId] : [slug];
    
    const { rows } = await pool.query(query, params);
    
    if (rows.length === 0) {
      return slug;
    }
    
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

router.get("/", async (_req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM blogs ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

router.get("/public", async (_req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM blogs WHERE published = true ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch public blogs" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      "SELECT * FROM blogs WHERE id = $1",
      [id]
    );
    if (!rows.length) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, slug, content, cover_image_url, published } = req.body;
    
    // Generate slug from title if not provided, or use provided slug
    const baseSlug = slug || generateSlug(title);
    const uniqueSlug = await ensureUniqueSlug(baseSlug);
    
    const { rows } = await pool.query(
      `INSERT INTO blogs (title, slug, content, cover_image_url, published)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING *`,
      [title, uniqueSlug, content, cover_image_url, published]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create blog" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, content, cover_image_url, published } = req.body;
    
    // Generate slug from title if not provided, or use provided slug
    const baseSlug = slug || generateSlug(title);
    const uniqueSlug = await ensureUniqueSlug(baseSlug, id);
    
    const { rows } = await pool.query(
      `UPDATE blogs SET
       title = $1,
       slug = $2,
       content = $3,
       cover_image_url = $4,
       published = $5,
       updated_at = NOW()
       WHERE id = $6
       RETURNING *`,
      [title, uniqueSlug, content, cover_image_url, published, id]
    );
    if (!rows.length) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update blog" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM blogs WHERE id = $1", [id]);
    if (!result.rowCount) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

module.exports = router;

