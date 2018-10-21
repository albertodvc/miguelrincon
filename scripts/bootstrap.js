const data = require('./content-model.json')
const contentfulImport = require('contentful-import')

const options = {
  content: data,
  spaceId: process.env.CTF_SPACE_ID,
  managementToken: process.env.CTF_M_TOKEN,
}

contentfulImport(options)
.then(() => {
  console.log('Data imported successfully')
})
.catch((err) => {
  console.log('Oh no! Some errors occurred!', err)
})
