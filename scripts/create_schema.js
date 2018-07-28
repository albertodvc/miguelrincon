
const fs = require('fs')
const contentful = require('contentful-management')

var odb = JSON.parse(fs.readFileSync('scripts/db.json', 'utf8'))


const client = contentful.createClient({
  accessToken: ''
})

perfoes = odb.perfoes.map(perfo => {
  return Object.assign({}, perfo, {
    location: odb.locations_perfoes
      .filter( entry => entry.perfo_id === perfo.id)
      .map(location => odb.locations.find(_location => _location.id == location.location_id))
      .reduce((acc, item) => {
        ['country', 'address', 'region', 'sub_region', 'city'].reduce( (acc, attr) => {
          acc[attr] = acc[attr] || {}
          acc[attr][(item.language_id === '1')? 'es-ES' : 'en-US'] = item[attr]
          return acc
        }, acc)
        acc.loc = { 'en-US': { lon: Number(item.lng), lat: Number(item.lat) } }
        return acc
      }, {})
    })
})

client.getSpace(process.env.CTF_SPACE_ID)
.then((space) => {
  return Promise.all(perfoes.map( (perfo) => {
    return space.createEntry('location', {
      fields: perfo.location
    })
    .then((entry) => {
      perfo.location_id = entry.sys.id
      delete perfo.location
      return perfo.location_id
    })
  }))
})
// .then((space) => {
//   space.createEntry('location', {
//     fields: {
//       loc:
//         { 'en-US': { lon: -5.996822199999997, lat: 37.3986209 } },
//       country:{
//         'en-US': 'Wild wild country',
//         'es-ES': 'Las americas'
//       },
//       address:{
//         'en-US': 'The rajanishpur',
//         'es-ES': 'La calle ancha'
//       },
//       region:{
//         'en-US': 'The regional',
//         'es-ES': 'Trajes rejionales'
//       },
//       sub_region:{
//         'en-US': 'The SUB regional',
//         'es-ES': 'Avalorios'
//       },
//       city:{
//         'en-US': 'Huelva york',
//         'es-ES': 'Huelva ciudad de vida y de muerte'
//       }
//     }
//   })
// })
.then((result) => {
  console.log('lets write', result)
  fs.writeFileSync('scripts/perfoes.json', JSON.stringify(perfoes, null, 4))
})

// .then((space) => space.getContentType('test'))
//.then((contentType) => console.log(contentType))



// .then((space) => space.getEntries({
//   'content_type': 'test'
// }))
// .then((contentType) => console.log(contentType.items[0].fields.loc))



// .then((space) => {
//   return Promise.all(odb.groups.map( (group, idx, groups) => {
//     return space.createEntry('group', {
//       fields: {
//         name:
//           {'en-US': group.name},
//         link:
//           {'en-US': group.link},
//         info:
//           {'en-US': group.director}
//       }
//     })
//     .then((entry) => {
//       console.log('Entry created', entry.sys.id)
//       group._id = entry.sys.id
//       return group._id
//     })
//   }))
// })
// .then((result) => {
//   console.log('lets write', result)
//   fs.writeFileSync('scripts/groups.json', JSON.stringify(odb.groups, null, 4))
// })
.catch( err => console.log('JORROR', err))
//.catch(console.error)

