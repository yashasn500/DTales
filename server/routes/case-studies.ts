import { Router } from "express";
import pool from "../db";

const router = Router();

// Get all case studies
router.get("/", async (_req, res) => {
  const { rows } = await pool.query(
    "SELECT * FROM case_studies ORDER BY created_at DESC"
  );
  res.json(rows);
});

// Get a single case study by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    "SELECT * FROM case_studies WHERE id = $1",
    [id]
  );
  if (!rows.length) return res.status(404).json({ message: "Case study not found" });
  res.json(rows[0]);
});

// Create case study
router.post("/", async (req, res) => {
  const { title, client, content, cover_image_url, published } = req.body;

  const { rows } = await pool.query(
    `INSERT INTO case_studies
     (title, client, content, cover_image_url, published)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING *`,
    [
      title,
      client ?? null,
      content,
      cover_image_url ?? null,
      !!published,
    ]
  );

  res.status(201).json(rows[0]);
});

// Update a case study by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, client, content, cover_image_url, published } = req.body;
  const { rows } = await pool.query(
    `UPDATE case_studies
     SET title = $1,
         client = $2,
         content = $3,
         cover_image_url = $4,
         published = $5,
         updated_at = now()
     WHERE id = $6
     RETURNING *`,
    [title, client, content, cover_image_url, published, id]
  );
  res.json(rows[0]);
});

// Delete a case study by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM case_studies WHERE id = $1", [id]);
  res.status(204).send();
});

module.exports = router;

