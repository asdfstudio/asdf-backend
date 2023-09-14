const db = require('../lib/db.js');
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

exports.createBlog = (req, res) => {
  const { title, desc } = req.body;
  const coverImage = req.file?.filename;
  const blogId = uuid.v4();
  const userId = '52e455d2-ef79-4b0d-8d6f-16662549977a';
  db.query(
    'INSERT INTO blog_post (id, `title`, `desc`, `coverImage`, `created_by`, `upload_time`, `views`) VALUES (?, ?, ?, ?, ?, now(), DEFAULT);',
      [blogId, title, desc, coverImage, userId],
      (err, result) => {
      if (err) {
          return res.status(400).send({
          message: err,
          });
      }
      return res.status(201).send({
          message: 'Blog Added!',
          blogId: blogId,
      });
      }
  );
};

exports.updateBlog = (req, res) => {
  const { blogId, title, desc } = req.body;
  const coverImageUpdate = req.file?.filename;

  db.query('SELECT * FROM blog_post WHERE id = ? LIMIT 1', [blogId], (err, rows) => {
      if (err) {
          return res.status(500).send({ message: 'Internal Server Error' });
      }

      if (rows.length === 0) {
          return res.status(404).send({ message: 'Blog post not found' });
      }

      if (coverImageUpdate) {
          const oldCoverImage = rows[0].coverImage;

          if (oldCoverImage) {
              const oldCoverImagePathToDelete = path.join(__dirname, "../uploads", oldCoverImage);
              fs.unlink(oldCoverImagePathToDelete, (unlinkErr) => {
                  if (unlinkErr) {
                      console.error('Error deleting old cover image:', unlinkErr);
                  }
              });
          }

          const updateQuery = 'UPDATE blog_post SET title = ?, `desc` = ?, `coverImage` = ?, upload_time = now() WHERE id = ?';
          db.query(updateQuery, 
            [title, desc, coverImageUpdate, blogId], 
            (updateErr, updateResult) => {
            if (updateErr) {
                return res.status(400).send({
                    message: updateErr,
                });
            }
            return res.status(200).send({
                message: 'Blog post updated!',
                blogId: blogId,
            });
        });
      } else {
          const updateQuery = 'UPDATE blog_post SET title = ?, `desc` = ?, upload_time = now() WHERE id = ?';
          db.query(
            updateQuery, 
            [title, desc, blogId], 
            (updateErr, updateResult) => {
              if (updateErr) {
                  return res.status(400).send({
                      message: updateErr,
                  });
              }
              return res.status(200).send({
                  message: 'Blog post updated!',
                  blogId: blogId,
              });
          });
      }
  });
};


exports.getBlogs = (req, res) => {
  
  const query = `
    SELECT
        blog_post.id,
        blog_post.title,
        blog_post.desc,
        blog_post.coverImage,
        blog_post.upload_time,
        blog_post.views,
        users.name AS created_by
    FROM
        blog_post
    LEFT JOIN
        users
    ON
        blog_post.created_by = users.id
    ORDER BY
        blog_post.upload_time DESC;`;
    
    db.query(query, (err, results) => {
      if (err) {
          res.status(500).json({ error: 'Error fetching blog posts' });
          return;
      }

      const blogs = results.map((row) => ({
          id: row.id,
          title: row.title,
          desc: row.desc,
          coverImage: row.coverImage,
          upload_time: row.upload_time,
          views: row.views,
          created_by: row.created_by,
      }));

      res.status(200).json({ blogs });
  });
};

exports.deleteBlogById = (req, res) => {
  const { blogId } = req.body.blogId;

  const selectCoverImageQuery = 'SELECT coverImage FROM blog_post WHERE id = ? LIMIT 1';
  const deleteBlogQuery = 'DELETE FROM blog_post WHERE id = ?';

  db.query('SELECT * FROM blog_post WHERE id = ? LIMIT 1', [blogId], (err, rows) => {
      if (err) {
          return res.status(500).send({ message: 'Internal Server Error' });
      }

      if (rows.length === 0) {
          return res.status(404).send({ message: 'Blog post not found' });
      }

      db.query(selectCoverImageQuery, [blogId], (coverImageErr, coverImageResults) => {
          if (coverImageErr) {
              return res.status(500).send({ message: 'Internal Server Error' });
          }

          if (coverImageResults.length > 0) {
              const coverImage = coverImageResults[0].coverImage;

              if (coverImage) {
                  const coverImagePathToDelete = path.join(__dirname, "../uploads", coverImage);
                  fs.unlink(coverImagePathToDelete, (unlinkErr) => {
                      if (unlinkErr) {
                          console.error('Error deleting cover image:', unlinkErr);
                      }
                  });
              }
          }

          db.query(deleteBlogQuery, [blogId], (deleteErr, deleteResult) => {
              if (deleteErr) {
                  return res.status(400).send({
                      message: deleteErr,
                  });
              }

              return res.status(200).send({
                  message: 'Blog post deleted!',
              });
          });
      });
  });
};