const db = require('../lib/db.js');

exports.getUsers = (req, res) => {
  
  const query = `
    SELECT
        id,
        name,
        email,
        role,
        registered,
        last_login
    FROM
        users
    ORDER BY
        registered DESC;`;
    
    db.query(query, (err, results) => {
      if (err) {
          res.status(500).json({ error: 'Error fetching user' });
          return;
      }

      const users = results.map((row) => ({
          id: row.id,
          name: row.name,
          email: row.email,
          role: row.role,
          registered: row.registered,
          last_login: row.last_login
      }));

      res.status(200).json({ users });
  });
};

exports.deleteUserById = (req, res) => {
  const { userId } = req.body.userId;

  const deleteUserQuery = 'DELETE FROM blog_post WHERE id = ?';

    db.query(deleteUserQuery, [userId], (deleteErr, deleteResult) => {
        if (deleteErr) {
            return res.status(400).send({
                message: deleteErr,
            });
        }

        return res.status(200).send({
            message: 'User deleted!',
        });
    });
};

exports.promoteToAdmin = (req, res) => {
    const {userId, newRole} = req.body;
  
    const updateUserRoleQuery = 'UPDATE users SET role = ? WHERE id = ?';
  
    db.query(updateUserRoleQuery, [newRole, userId], (updateErr, updateResult) => {
      if (updateErr) {
        return res.status(400).json({ error: 'Error updating user role' });
      }
  
      if (updateResult.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      return res.status(200).json({ message: 'Add user Successfully' });
    });
  };