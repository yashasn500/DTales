import { Router } from "express";
import pool from "../db";

const router = Router();

/**
 * GET /api/blogs
 * Get all blogs (admin)
 */
router.get("/", async (_req, res) => {
  const { rows } = await pool.query(
    "SELECT * FROM blogs ORDER BY created_at DESC"
  );
  res.json(rows);
});

/**
 * GET /api/blogs/public
 * Get published blogs (public)
 */
router.get("/public", async (_req, res) => {
  const { rows } = await pool.query(
    "SELECT * FROM blogs WHERE published = true ORDER BY created_at DESC"
  );
  res.json(rows);
});

/**
 * POST /api/blogs
 * Create blog
 */
router.post("/", async (req, res) => {
  const { title, slug, content, cover_image_url, published } = req.body;

  const { rows } = await pool.query(
    `INSERT INTO blogs (title, slug, content, cover_image_url, published)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING *`,
    [title, slug, content, cover_image_url ?? null, !!published]
  );

  res.status(201).json(rows[0]);
});

/**
 * GET /api/blogs/:id
 * Get single blog by ID
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const { rows } = await pool.query(
    "SELECT * FROM blogs WHERE id = $1",
    [id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: "Blog not found" });
  }

  res.json(rows[0]);
});

/**
 * PUT /api/blogs/:id
 * Update blog by ID
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, slug, content, cover_image_url, published } = req.body;

  const { rows } = await pool.query(
    `UPDATE blogs
     SET title = $1,
         slug = $2,
         content = $3,
         cover_image_url = $4,
         published = $5,
         updated_at = now()
     WHERE id = $6
     RETURNING *`,
    [title, slug, content, cover_image_url, published, id]
  );

  res.json(rows[0]);
});

export = router;

