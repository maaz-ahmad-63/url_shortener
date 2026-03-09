import Url from '../model/url.js';   
import shortid from 'shortid';

export const shortUrl = async (req, res) => {
    // Logic to shorten the URL goes here
    const originalUrl = req.body.longUrl;
    const shortCode = shortid.generate();

    const shortUrl = `http://localhost:3000/${shortCode}`;

    // Save the original URL and the shortened URL to the database
    const newUrl = new Url({
        originalUrl,
        shortUrl
    });
    await newUrl.save();

    res.render('index.ejs', { shortUrl });
};


export const getOriginalUrl= async (req, res) => {
    const shortCode = req.params.shortCode;
   //find on database
    const originalUrl = await Url.findOne({ shortUrl: `http://localhost:3000/${shortCode}` });
    if (originalUrl) {
        res.redirect(originalUrl.originalUrl);
    } else {
        res.status(404).json({ message: 'URL not found' });
    }
     res.json({originalUrl });

};
