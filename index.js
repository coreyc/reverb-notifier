import 'dotenv/config.js'
import axios from 'axios'
import AWS from 'aws-sdk'
import query from './query.js'
import {checkNotAlreadyTracked, updateTrackedListings} from './data-store.js'

const {REVERB_AUTH_HEADER, FROM_ADDRESS, TO_ADDRESS} = process.env
AWS.config.update({region: 'us-east-1'})
const ses = new AWS.SES()

const searchTerm = 'Korg Opsix 37-Key Altered FM Synthesizer'

const buildEmailBody = (listingsToEmail) => listingsToEmail.map(({priceReadable, url}) => `Price: $${priceReadable} - ${url}`).join('\r\n')

const buildParams = (listingsToEmail = [], searchTerm) => ({
  Destination: {
    ToAddresses: [
      TO_ADDRESS
    ]
  },
  Message: {
    Body: {
      Text: {
        Data: buildEmailBody(listingsToEmail),
      }
    },
    Subject: {
      Data: `New item(s) found for ${searchTerm}`,
    }
  },
  Source: FROM_ADDRESS,
})

const getVariables = (searchTerm) => ({
  'aggs': [
    'CATEGORY_SLUGS',
    'BRAND_SLUGS',
    'CONDITION_SLUGS',
    'DECADES',
    'CURATED_SETS',
    'COUNTRY_OF_ORIGIN'
  ],
  'brandSlugs': [],
  'shouldntLoadBumps': false,
  'shouldntLoadSuggestions': false,
  'query': searchTerm,
  'sortSlug': 'price|asc',
  'limit': 0,
  'offset': 0,
  'categorySlugs': [],
  'conditionSlugs': [],
  'shippingRegionCode': [],
  'traitValues': [],
  'itemState': [],
  'itemCity': [],
  'curatedSetSlugs': [],
  'saleSlugs': [],
  'fallbackToOr': true,
  'withProximityFilter': {
    'proximity': false
  },
  'useExperimentalQuery': true,
  'boostedItemRegionCode': 'US',
  'bestMatchSignalsV2ExperimentGroup': 0,
  'likelihoodToSellExperimentGroup': 1,
  'useExperimentalRecall': true,
  'usingListView': false,
  'ecsBoostExperimentGroup': 1,
  'countryOfOrigin': [],
  'boostByBumpRate': false,
  'bumpLimit': 15,
  'bumpOffset': 0,
  'mpTotalPriceExperimentGroup': 0,
  'contexts': [],
  'autodirects': 'STANDARDIZED',
  'sort': 'NONE'
})

const getListingUrl = (listingId) => `https://reverb.com/item/${listingId}`

const formatListings = (listings) => {
  return listings.map((listing) => ({
    id: listing.id,
    listingType: listing.listingType,
    condition: listing.condition.conditionSlug,
    price: listing.pricing.buyerPrice.amountCents,
    priceReadable: listing.pricing.buyerPrice.amount,
    shippingRegion: listing.shop.address.countryCode,
    shippingCost: listing.shipping.shippingPrices[0] && listing.shipping.shippingPrices[0].rate.amountCents,
    shippingReadable: listing.shipping.shippingPrices[0] && listing.shipping.shippingPrices[0].rate.amount,
    url: getListingUrl(listing.id)
  }))
}

const formatSearchResults = (results, listings) => {
  const _listings = formatListings(listings)

  return {
    listings: _listings
  }
}

setInterval(async () => {
  const {data} = await axios({
    method: 'POST',
    url: 'https://rql.reverb.com/graphql',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': REVERB_AUTH_HEADER,
    },
    data: JSON.stringify({
      query,
      variables: getVariables(searchTerm),
    })
  })
  // console.log(JSON.stringify(data))
  
  const listings = formatListings(data.data.listingsSearch.listings)
    .filter((listing) => listing.shippingRegion === 'US' && listing.shippingCost !== undefined)
    .sort((a, b) => a.price - b.price)
  
  const listingsMatchingPriceCriteria = listings.filter(({price, listingId}) => price <= 60000 && checkNotAlreadyTracked(listingId))
  console.log(listingsMatchingPriceCriteria)
  
  if (listingsMatchingPriceCriteria.length) {
    updateTrackedListings(listingsMatchingPriceCriteria)
    const sendEmailResult = await ses.sendEmail(buildParams(listingsMatchingPriceCriteria, 'Korg Opsix')).promise()
    console.log(sendEmailResult)
  }
}, 5000)
