

const express = require('express');
const {
  createBlock,
  getAllBlocks,
  getBlockById,
  updateBlock,
  deleteBlock,
  getBlocksBySociety,
  getTotalBlocks,
  
} = require('../Controller/blockController');
const router = express.Router();

// Create a new block
router.post('/createblocks', createBlock);

// Get all blocks
router.get('/allblocks', getAllBlocks);
router.get('/getblockbysocity/:societyId', getBlocksBySociety);

// Get a single block by ID
router.get('/singleblocks/:id', getBlockById);
router.get('/countblocks', getTotalBlocks);
// Update a block by ID
router.put('/updateblocks/:id', updateBlock);

// Delete a block by ID
router.delete('/deleteblocks/:id', deleteBlock);

module.exports = router;
