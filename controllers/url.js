const shortid = require('shortid');
const URL = require('../models/url.js')

async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'Url is Requires'})

    const shortID = shortid()
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory:[],
        createdBy: req.user._id
    })
  res.redirect('/')
console.log('Generating new short URL...')
async function handleGenerateNewShortURL(req,res){
    console.log('Received request to generate new short URL')
    const body = req.body;
    if(!body.url) {
        console.error('Error: URL is required')
        return res.status(400).json({error: 'Url is Requires'})
    }

    const shortID = shortid()
    console.log(`Generated short ID: ${shortID}`)
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory:[]
    })
    console.log('New short URL created successfully')
    res.redirect('/')
    console.log('Redirecting to homepage')

    return res.render('home',{
      id:shortID,
    })

}
console.log('Setting up analytics endpoint...')
async function handleGetAnalytics(req,res){
    console.log('Received request for analytics')
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    console.log(`Analytics for ${shortId}: ${result.visitHistory.length} clicks`)
    return res.json({totalClicks:result.visitHistory.length, analytics: result.visitHistory})
}
console.log('Setting up short URL redirect endpoint...')
async function handelGetShorUrl(req,res){
    console.log('Received request to redirect short URL')
    const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        }
      },
    }
  );

  console.log(`Redirecting to ${entry.redirectURL}`)
  res.redirect(entry.redirectURL);
}
    return res.render('home',{
      id:shortID,
    })

}
async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalClicks:result.visitHistory.length, analytics: result.visitHistory})
}
async function handelGetShorUrl(req,res){
    const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        }
      },
    }
  );

  res.redirect(entry.redirectURL);
}




module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handelGetShorUrl,
}