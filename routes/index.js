const fs = require('fs');
const path = require('path');

router.get('/api/animals', (req, res) => {
  const filePath = path.join(__dirname, '../public/data/animals.json');
  fs.readFile(filePath, 'utf8', (err, jsonData) => {
    if (err) {
      console.error('Error reading animals.json:', err);
      return res.status(500).json({ error: 'Failed to load data' });
    }
    res.json(JSON.parse(jsonData));
  });
});


module.exports = router;


