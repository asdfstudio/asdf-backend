const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const authRouter = require('./routes/authRouter.js');
const portfolio = require('./routes/portfolio.js');

app.use('/api', authRouter);
app.use("/api", portfolio);

app.listen(PORT, () => console.log('Server running on port ' + PORT));
