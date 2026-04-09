const express = require("express");
const Skill = require("../models/skill");
const router = express.Router();

// GET all skills
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1 });
    res.json({
      success: true,
      count: skills.length,
      data: skills,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST - Create skill
router.post("/", async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json({
      success: true,
      message: "Skill added successfully",
      data: skill,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// PUT - Update skill
router.put("/:id", async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!skill) {
      return res.status(404).json({ success: false, error: "Skill not found" });
    }
    res.json({
      success: true,
      message: "Skill updated successfully",
      data: skill,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
