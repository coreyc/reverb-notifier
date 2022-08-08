const trackedListings = {}

export const checkNotAlreadyTracked = (listingId) => !trackedListings[listingId]
export const updateTrackedListings = (listings) => listings.forEach(({listingId}) => trackedListings[listingId] = new Date())
