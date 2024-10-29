const express = require('express')
const router = express.Router()
const {handleGenerateNewShortURL,
    handleGetAnalytics,
    handelGetShorUrl,
} = require('../controllers/url.js')

router.post('/',handleGenerateNewShortURL)
router.get('/analytics/:shortId',handleGetAnalytics)
router.get('/:shortId',handelGetShorUrl)

module.exports = router














