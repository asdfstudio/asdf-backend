const db = require('../lib/db.js');

exports.visitors = (req, res) => {

    try {
      db.query('SELECT COUNT(DISTINCT ip_address) AS count FROM visitors', (err, result) => {
        if (err) {
          console.error('Error fetching visitor count:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
        const count = result[0] ? result[0].count : 0;
        res.json({ count });
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error.' });
    }
};
