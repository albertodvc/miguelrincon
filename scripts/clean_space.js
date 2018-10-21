const contentful = require('contentful-management')

const client = contentful.createClient({
  accessToken: process.env.CTF_M_TOKEN
})

client.getSpace(process.env.CTF_SPACE_ID)
.then((space) => space.getEntries({'limit': 1000}))
.then( (response) => response.items )
.then((items) => Promise.all(items.map( (item) => {
  if (item.isPublished()) {
    return item.unpublish().then( (_item) => _item.delete())
  } else
    return item.delete()

})))
.then( () => console.log('DONE'))
.catch(console.error)

