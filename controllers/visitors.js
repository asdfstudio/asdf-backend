const db = require('../lib/db.js');
const ip = require('ip');

exports.visitors = (req, res) => {
    try {
      db.query('SELECT COUNT(*) AS count, id, ip_address, timestamp FROM visitors GROUP BY id, ip_address, timestamp', (err, result) => {
        if (err) {
          console.error('Error fetching visitor count:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
        res.json(result);
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error.' });
    }
};

exports.getTopPortfolios = (req, res) => {
  try {
    const sql = `
    SELECT
      p.name AS portfolio_name,
      COUNT(DISTINCT pv.visitor_ip) AS visitor_count,
      SUM(pv.time_spent) AS total_time_spent
    FROM portfolio p
    LEFT JOIN portfolio_visits pv ON p.id = pv.portfolio_id
    GROUP BY p.name
    ORDER BY visitor_count DESC;
  `;
    db.query(
      sql,
      (err, results) => {
        if (err) {
          console.error('Error getting top portfolios:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }

        //   function formatTime(milliseconds) {
        //     const seconds = Math.floor(milliseconds / 1000);
        //     if (seconds < 60) {
        //         return `${seconds} seconds`;
        //     } else {
        //         const minutes = Math.floor(seconds / 60);
        //         const remainingSeconds = seconds % 60;
        //         if (minutes < 30) {
        //             return `${minutes} minutes and ${remainingSeconds} seconds`;
        //         } else {
        //             const hours = Math.floor(minutes / 60);
        //             const remainingMinutes = minutes % 60;
        //             return `${hours} hours and ${remainingMinutes} minutes`;
        //         }
        //     }
        //     return seconds;
        // }
        
        // const processedData = results.map(item => ({
        //     ...item,
        //     "total_time_spent": formatTime(item.total_time_spent)
        // }));
    
        // res.json(processedData);

      function millisecondsToMinutes(milliseconds) {
          return Math.floor(milliseconds / 60000);
      }
      
      const processedData = results.map(item => ({
          ...item,
          "total_time_spent": millisecondsToMinutes(item.total_time_spent)
      }));
  
      res.json(processedData);
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};


exports.portfolioVisitors = (req, res) => {
  try {
    const portfolioId = req.body.portfolioId;

    db.query(
      'SELECT COUNT(DISTINCT visitor_ip) AS visitorCount FROM portfolio_visits WHERE portfolio_id = ?',
      [portfolioId],
      (err, result) => {
        if (err) {
          console.error('Error calculating visitor count:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
  
        const visitorCount = result[0] ? result[0].visitorCount : 0;
        res.json({ visitorCount });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.setPortfoliovisitors = (req, res) => {
  try {
    const { portfolioId, entranceTime } = req.body;
    // const visitorIp = ip.address();
    // let clientIP = req.ip;
    const visitorIp = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    db.query(
      'INSERT INTO portfolio_visits (portfolio_id, visitor_ip, entrance_time) VALUES (?, ?, ?)',
      [portfolioId, visitorIp, entranceTime],
      (err) => {
        if (err) {
          console.error('Error recording entrance:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
        res.json(portfolioId);
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.exitPortfoliovisitors = (req, res) => {
  try {
    const { portfolioId, entranceTime, exitTime } = req.body;
    // const visitorIp = ip.address();
    const visitorIp = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const timeSpent = new Date(exitTime) - new Date(entranceTime);

    db.query(
      'INSERT INTO portfolio_visits (portfolio_id, visitor_ip, entrance_time, exit_time, time_spent) VALUES (?, ?, ?, ?, ?)',
      [portfolioId, visitorIp, entranceTime, exitTime, timeSpent],
      (err) => {
        if (err) {
          console.error('Error recording exit:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
  
        res.status(200).end();
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.portfolioTimeSpent = (req, res) => {
  try {
    const portfolioId = req.body.portfolioId;

    db.query(
      'SELECT SUM(time_spent) AS totalSpentTime FROM portfolio_visits WHERE portfolio_id = ?',
      [portfolioId],
      (err, result) => {
        if (err) {
          console.error('Error calculating total time spent:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
  
        const totalSpentTime = result[0] ? result[0].totalSpentTime : 0;
        res.json({ totalSpentTime });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};