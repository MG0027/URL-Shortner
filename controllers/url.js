const shortid = require('shortid');
const URL = require('../models/url');
async function handleGenerateShortUrl(req,res){
  const body = req.body;
  console.log(body);
  if(!body.url) return res.status(400).json({error: 'url is req'});
 const shortID = shortid.generate()
 console.log(shortID);
 await URL.create({ 
  shortID,
  redirectURL: body.url,
  visitedHistory: [],
  createdBy: req.user._id,
 })
 return res.render('home', {id:shortID});
}

async function handleGetAnalytics(req,res){
  const shortID = req.params.shortID;
  const result = await URL.findOne({shortID})
  return res.json({totalclicks: result.visitedHistory.length,
    analytics: result.visitedHistory,
  })

}

module.exports= {handleGenerateShortUrl, handleGetAnalytics};