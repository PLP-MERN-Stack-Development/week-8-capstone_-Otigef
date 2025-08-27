const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  category: {
    type: String,
    enum: ['government', 'legal', 'business', 'education', 'health', 'personal', 'other'],
    default: 'other'
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [50, 'Tag cannot be more than 50 characters']
  }],
  language: {
    type: String,
    default: 'en',
    enum: ['en', 'sw', 'fr']
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Creator ID is required']
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  views: {
    type: Number,
    default: 0
  },
  fileUrl: {
    type: String,
    trim: true
  },
  fileSize: {
    type: Number
  },
  fileType: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
documentSchema.index({ title: 'text', content: 'text' });
documentSchema.index({ category: 1, createdAt: -1 });
documentSchema.index({ createdBy: 1, createdAt: -1 });
documentSchema.index({ tags: 1 });

// Virtual for formatted creation date
documentSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Virtual for document preview
documentSchema.virtual('preview').get(function() {
  return this.content.length > 150 
    ? this.content.substring(0, 150) + '...' 
    : this.content;
});

// Pre-save middleware to clean up tags
documentSchema.pre('save', function(next) {
  if (this.tags) {
    // Remove duplicates and empty tags
    this.tags = [...new Set(this.tags.filter(tag => tag.trim()))];
  }
  next();
});

// Static method to get documents by category
documentSchema.statics.findByCategory = function(category) {
  return this.find({ 
    category, 
    isPublic: true, 
    isPublished: true,
    status: 'published'
  }).sort({ createdAt: -1 });
};

// Static method to search documents
documentSchema.statics.search = function(searchTerm) {
  return this.find({
    $and: [
      { isPublic: true, isPublished: true, status: 'published' },
      {
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { content: { $regex: searchTerm, $options: 'i' } },
          { tags: { $in: [new RegExp(searchTerm, 'i')] } }
        ]
      }
    ]
  }).sort({ createdAt: -1 });
};

// Instance method to increment views
documentSchema.methods.incrementViews = async function() {
  this.views += 1;
  return await this.save();
};

module.exports = mongoose.model('Document', documentSchema); 