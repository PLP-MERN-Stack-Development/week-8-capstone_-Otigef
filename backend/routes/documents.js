const express = require('express');
const { body, validationResult } = require('express-validator');
const Document = require('../models/Document');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/documents
// @desc    Create a new document
// @access  Private
router.post('/', [
  auth,
  body('title').notEmpty().trim().withMessage('Title is required'),
  body('content').notEmpty().trim().withMessage('Content is required'),
  body('category').optional().trim(),
  body('tags').optional().isArray()
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { title, content, category, tags } = req.body;
    
    const document = new Document({
      title,
      content,
      category,
      tags: tags || [],
      createdBy: req.user._id,
      author: req.user.name
    });

    await document.save();

    res.status(201).json({
      message: 'Document created successfully',
      document
    });

  } catch (error) {
    console.error('Create document error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/documents
// @desc    Get all documents
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    
    const query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const documents = await Document.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Document.countDocuments(query);

    res.json({
      documents,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });

  } catch (error) {
    console.error('Get documents error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/documents/:id
// @desc    Get document by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.json({ document });

  } catch (error) {
    console.error('Get document error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/documents/:id
// @desc    Update document
// @access  Private
router.put('/:id', [
  auth,
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('content').optional().trim().notEmpty().withMessage('Content cannot be empty'),
  body('category').optional().trim(),
  body('tags').optional().isArray()
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Check if user owns the document or is admin
    if (document.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this document' });
    }

    const { title, content, category, tags } = req.body;
    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (category !== undefined) updateData.category = category;
    if (tags !== undefined) updateData.tags = tags;

    const updatedDocument = await Document.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Document updated successfully',
      document: updatedDocument
    });

  } catch (error) {
    console.error('Update document error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/documents/:id
// @desc    Delete document
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Check if user owns the document or is admin
    if (document.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this document' });
    }

    await Document.findByIdAndDelete(req.params.id);

    res.json({ message: 'Document deleted successfully' });

  } catch (error) {
    console.error('Delete document error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 