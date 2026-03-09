import express from 'express';
import mongoose from 'mongoose';
import { shortUrl,getOriginalUrl} from './controller/Url.js';

const app = express();
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb+srv://maazbinayaz5555_db_user:IMSlTR6oCW5lH7rj@cluster0.0g8m1ow.mongodb.net/', {
    "dbName": "Node_JS_Mastery",
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs',{shortUrl: null});
});
app.post('/shorten', shortUrl);

app.get('/:shortCode', getOriginalUrl); 

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});