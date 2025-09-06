
import 'dotenv/config';
import express from 'express';
import webRouter from './router/wed';
const app = express();

// config view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// config request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

webRouter(app);
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
  console.log('🛠 Views folder:', __dirname + '/views');
});
