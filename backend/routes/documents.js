const express = require('express');
const Document = require('../models/Document');
const auth = require('../middleware/auth');
const router = express.Router();

// Create document (protected)
router.post('/', auth, async (req, res) => {
  try {
    const doc = new Document({ ...req.body, createdBy: req.user.id });
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ message: 'Error creating document', error: err.message });
  }
});

// Get all documents (public)
router.get('/', async (req, res) => {
  try {
    const docs = await Document.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching documents' });
  }
});

// Get single document (public)
router.get('/:id', async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Document not found' });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching document' });
  }
});

// Update document (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const doc = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ message: 'Document not found' });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ message: 'Error updating document' });
  }
});

// Delete document (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const doc = await Document.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Document not found' });
    res.json({ message: 'Document deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting document' });
  }
});

module.exports = router; 