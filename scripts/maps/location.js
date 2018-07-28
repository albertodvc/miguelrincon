export default (location) => {
  return {
    fields: {
      loc:
        { 'en-US': { lon: Number(location.lng), lat: Number(location.lat) } },
      country: location.country,
      address: location.address,
      region: location.region,
      sub_region: location.sub_region,
      city: location.city
    }
  }
}
