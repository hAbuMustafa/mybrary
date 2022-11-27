const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').parse();
}

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use('/', indexRouter);

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

const indexRouter = require('./routes');
app.listen(process.env.PORT || 3030);
