require('dotenv').config();
const express = require('express');
const cors = require('cors');
const blogroute = require('./routes/blogroute');
const app = express();

app.use(cors({
  origin:"https://blog-app-manikant69.vercel.app/",
  credentials:true,
}));

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');


app.use((req, res, next) => {
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; font-src 'self' https://blog-app-manikant69.vercel.app; script-src 'self'; style-src 'self';"
    );
    next();
  });

app.use('/', blogroute);

const port = process.env.PORT || 4000;

app.listen(port, ()=>{
    console.log(`server is running at http://localhost:${port}`);
})
