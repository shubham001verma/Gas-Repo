const Block = require('../models/blockModel');

// Get all blocks for a society
exports.getBlocksBySociety = async (req, res) => {
  try {
    const blocks = await Block.find({ society: req.params.societyId });
    res.json(blocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Create a new block
exports.createBlock = async (req, res) => {
  const { name, society } = req.body;

  try {
    // Check if a block with the same name already exists in the specified society
    const existingBlock = await Block.findOne({ name, society });
    
    if (existingBlock) {
      return res.status(400).json({ error: 'This block name is already registered in the selected society' });
    }

    // If the block doesn't exist, create a new one
    const newBlock = new Block({ name, society });
    await newBlock.save();

    res.status(201).json(newBlock);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


// Get all blocks
exports.getAllBlocks = async (req, res) => {
  try {
    const blocks = await Block.find().populate('society');
    res.status(200).json(blocks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a single block by ID
exports.getBlockById = async (req, res) => {
  const { id } = req.params;

  try {
    const block = await Block.findById(id).populate('society');
    if (!block) return res.status(404).json({ error: 'Block not found' });
    res.status(200).json(block);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


// Update a block by ID
exports.updateBlock = async (req, res) => {
  const { name, society } = req.body;

  try {
    // Check if a block with the same name already exists in the society
    const existingBlock = await Block.findOne({ name, society, _id: { $ne: req.params.id } });

    if (existingBlock) {
      return res.status(400).json({ error: 'This block name is already registered in the selected society' });
    }

    // Proceed with the update if no duplicate block name is found
    const block = await Block.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!block) {
      return res.status(404).json({ message: 'Block not found' });
    }

    res.status(200).json(block);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};



exports.getTotalBlocks = async (req, res) => {
  try {
    const totalBlocks = await Block.countDocuments();
    res.json({ totalBlocks });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching total blocks' });
  }
};

// Delete a block by ID
exports.deleteBlock = async (req, res) => {
  try {
    const { id } = req.params;
    const block = await Block.findByIdAndDelete(id);
    
    if (!block) {
      return res.status(404).json({ message: 'Block not found' });
    }
    
    res.status(200).json({ message: 'Block deleted successfully' });
  } catch (error) {
    console.error('Error deleting block:', error); // Log the error
    res.status(500).json({ message: 'Server error' });
  }
};
