const express = require('express');
const { automateLumaForm } = require('../services/selenium');

const router = express.Router();

// POST /api/luma/submit
router.post('/submit', async (req, res) => {
  const { link, userData } = req.body;

  if (!link || !userData) {
    return res.status(400).json({ error: 'Luma link and user data are required.' });
  }

  try {
    const result = await automateLumaForm(link, userData);
    res.status(200).json({ message: 'Form submitted successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit the form.', details: error.message });
  }
});

module.exports = router;
