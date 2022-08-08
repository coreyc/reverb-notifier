export default `query Core_Marketplace_CombinedMarketplaceSearch($query: String, $currency: String, $priceMax: String, $priceMin: String, $decades: [String], $yearMax: String, $yearMin: String, $sortSlug: String, $limit: Int, $offset: Int, $categorySlugs: [String], $brandSlugs: [String], $conditionSlugs: [String], $onSale: Boolean, $holidaySale: Boolean, $handmade: Boolean, $freeShipping: Boolean, $freeExpeditedShipping: Boolean, $acceptsOffers: Boolean, $acceptsGiftCards: Boolean, $preferredSeller: Boolean, $acceptsPaymentPlans: Boolean, $itemRegion: String, $shippingRegionCode: [String], $showOnlySold: Boolean, $showSold: Boolean, $traitValues: [String], $itemState: [String], $itemCity: [String], $shopSlug: String, $curatedSetSlugs: [String], $saleSlugs: [String], $cspSlug: String, $sort: reverb_search_ListingsSearchRequest_Sort, $combinedShipping: Boolean, $acceptsAffirm: Boolean, $terminateEarly: Boolean, $fallbackToOr: Boolean, $withProximityFilter: Input_reverb_search_ProximityFilterRequest, $localPickup: Boolean, $minSaleDiscountPercent: String, $useExperimentalQuery: Boolean, $boostedItemRegionCode: String, $bestMatchSignalsV2ExperimentGroup: Int, $likelihoodToSellExperimentGroup: Int, $ecsBoostExperimentGroup: Int, $useExperimentalRecall: Boolean, $mpTotalPriceExperimentGroup: Int, $useTotalPrice: Boolean, $countryOfOrigin: [String], $contexts: [reverb_search_Context], $autodirects: reverb_search_Autodirects, $excludeLocalPickupOnly: Boolean) {
  listingsSearch(input: {query: $query, currency: $currency, priceMax: $priceMax, priceMin: $priceMin, decades: $decades, yearMax: $yearMax, yearMin: $yearMin, sortSlug: $sortSlug, traitValues: $traitValues, limit: $limit, offset: $offset, categorySlugs: $categorySlugs, brandSlugs: $brandSlugs, conditionSlugs: $conditionSlugs, onSale: $onSale, holidaySale: $holidaySale, handmade: $handmade, freeShipping: $freeShipping, freeExpeditedShipping: $freeExpeditedShipping, acceptsOffers: $acceptsOffers, acceptsGiftCards: $acceptsGiftCards, preferredSeller: $preferredSeller, acceptsPaymentPlans: $acceptsPaymentPlans, itemRegion: $itemRegion, shippingRegionCodes: $shippingRegionCode, showOnlySold: $showOnlySold, showSold: $showSold, itemState: $itemState, itemCity: $itemCity, shopSlug: $shopSlug, curatedSetSlugs: $curatedSetSlugs, saleSlugs: $saleSlugs, cspSlug: $cspSlug, sort: $sort, combinedShipping: $combinedShipping, acceptsAffirm: $acceptsAffirm, terminateEarly: $terminateEarly, fallbackToOr: $fallbackToOr, withProximityFilter: $withProximityFilter, localPickup: $localPickup, minSaleDiscountPercent: $minSaleDiscountPercent, useExperimentalQuery: $useExperimentalQuery, boostedItemRegionCode: $boostedItemRegionCode, bestMatchSignalsV2ExperimentGroup: $bestMatchSignalsV2ExperimentGroup, likelihoodToSellExperimentGroup: $likelihoodToSellExperimentGroup, ecsBoostExperimentGroup: $ecsBoostExperimentGroup, useExperimentalRecall: $useExperimentalRecall, mpTotalPriceExperimentGroup: $mpTotalPriceExperimentGroup, useTotalPrice: $useTotalPrice, countryOfOrigin: $countryOfOrigin, contexts: $contexts, autodirects: $autodirects, excludeLocalPickupOnly: $excludeLocalPickupOnly}) {
    total
    offset
    limit
    listings {
      ...ListingCardFields
      ...Item2WatchBadgeData
      ...InOtherCartsCardData
      ...ShopFields
    }
  }
}

fragment ListingCardFields on Listing {
  id
  listingType
  condition {
    conditionSlug
  }
  pricing {
    buyerPrice {
      display
      currency
      amount
      amountCents
    }
    originalPrice {
      display
    }
    ribbon {
      display
    }
  }
  shipping {
    shippingPrices {
      shippingMethod
      carrierCalculated
      destinationPostalCodeNeeded
      rate {
        amount
        amountCents
        currency
        display
      }
    }
    freeExpeditedShipping
    localPickupOnly
    localPickup
  }
  shop {
    returnPolicy {
      usedReturnWindowDays
      newReturnWindowDays
    }
    address {
      locality
      region
      country {
        countryCode
        name
      }
    }
  }
  priceRecommendation {
    priceMiddle {
      amountCents
      currency
    }
  }
  currency
  ...ListingShippingDisplayData
}

fragment ListingShippingDisplayData on Listing {
  shop {
    freeDomesticShippingRate {
      regionCode
      freeShippingThreshold {
        amountCents
        currency
      }
    }
  }
  shipping {
    freeExpeditedShipping
    localPickupOnly
    shippingPrices {
      shippingMethod
      carrierCalculated
      destinationPostalCodeNeeded
      rate {
        amount
        amountCents
        currency
        display
      }
    }
  }
}

fragment Item2WatchBadgeData on Listing {
  id
}

fragment ShopFields on Listing {
  shop {
    address {
      locality
      countryCode
      region
    }
  }
}

fragment InOtherCartsCardData on Listing {
  id
  otherBuyersWithListingInCartCounts
}`
