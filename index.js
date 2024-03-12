import express from 'express';
import ejs from 'ejs';
import axios from 'axios';
import bodyParser from 'body-parser';

const port = 3000;
const app = express();
const BASE_URL_API = 'https://deckofcardsapi.com/api/deck';

let deck_id;
let cards;
let remaining;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index.ejs', {deck_id : deck_id, cards : cards, remaining : remaining});
});

app.get('/new', async (req, res) => {
    const deck = await axios.get(`${BASE_URL_API}/new`)
    .then((res)=> {
        deck_id = res.data.deck_id;
        cards = undefined;
        remaining = res.data.remaining;
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
    res.redirect('/');
});

app.get('/shuffle', async (req, res) => {
    const id = (deck_id) ? deck_id : 'new';
    const deck = await axios.get(`${BASE_URL_API}/${id}/shuffle/?deck_count=1`)
    .then((res)=> {
        deck_id = res.data.deck_id;
        cards = undefined;
        remaining = res.data.remaining;
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
    res.redirect('/');
});

app.get('/draw', async (req, res) => {
    const deck = await axios.get(`${BASE_URL_API}/${deck_id}/draw/?count=1`)
    .then((res)=> {
        deck_id = res.data.deck_id;
        cards = res.data.cards;
        remaining = res.data.remaining;
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
    res.redirect('/');
});

app.listen(port,() => {
    console.log(`server start listening on port ${port} ...`);
});