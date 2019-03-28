
const fs = require('fs')
const contentful = require('contentful-management')

var odb = JSON.parse(fs.readFileSync('scripts/mysql.json', 'utf8'))

var space
const publish = true

const client = contentful.createClient({
  accessToken: process.env.MR_CTF_M_TOKEN
})

client.getSpace(process.env.MR_CTF_SPACE_ID)
.then( _space => {
  space = _space
  console.log('POPULATING ...')
  return loadDB(odb)

})
.catch( err => console.log('JORROR', err))


function loadDB(db) {
  return createGroups(db.groups)
  .then( () => createPrograms(db.programs))
  .then( () => createLocations(db.perfoes, db.locations, db.locations_perfoes))
  .then( () => linkPerfoes(db.perfoes, db.groups, db.programs, db.groups_perfoes, db.perfoes_programs))
  .then( () => linkRecords(db.records, db.groups, db.groups_records))
  .then( () => createPerfoes(db.perfoes))
  .then( () => createRecords(db.records))
  .then( () => {
    console.log('Everything imported')
  })
}

function fixLocale(items){
  if (items.length != 2) {
    items.push(Object.assign({}, items[0], {language_id: (items[0].language_id == '1')? '2': '1' }))
  }
  return items
}


function createGroups(groups) {
  return Promise.all(groups.map( (group, idx, groups) => {
    return space.createEntry('group', {
      fields: {
        name:
          {'en-US': group.name},
        link:
          {'en-US': group.link},
        info:
          {'en-US': group.director}
      }
    })
    .then((entry) => {
      group._id = entry.sys.id
      if (publish)
        return entry.publish()
      return group._id
    })
  }))
}

function createLocations(perfoes, locations, locations_perfoes) {
  perfoes.map(perfo => {
    return Object.assign(perfo, {
      location: fixLocale(locations_perfoes
        .filter( entry => entry.perfo_id === perfo.id)
        .map(location => locations.find(_location => _location.id == location.location_id)))
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

  return Promise.all(perfoes.map( (perfo) => {
    return space.createEntry('location', {
      fields: perfo.location
    })
    .then((entry) => {
      perfo.location_id = entry.sys.id
      delete perfo.location
      if (publish)
        return entry.publish()
      return perfo.location_id
    })
  }))
}

function createPrograms(programs) {
  return Promise.all(programs.map( program => {
    return space.createEntry('program', {
      fields: {
        name:
          {'en-US': program.name},
        author:
          {'en-US': program.author}
      }
    })
    .then((entry) => {
      program._id = entry.sys.id
      if (publish)
        return entry.publish()
      return program._id
    })
  }))
}

function linkPerfoes(perfoes, groups, programs, groups_perfoes, perfoes_programs) {
  return perfoes.map(perfo => {

    return Object.assign(perfo, {
      group_id: groups
        .find( group => {
          return group.id === groups_perfoes.find( entry => entry.perfo_id === perfo.id).group_id
        })._id,
      program_id: programs
        .find( program => {
          return program.id === perfoes_programs.find( entry => entry.perfo_id === perfo.id).program_id
        })._id
      })
  })
}

function createPerfoes(perfoes) {
  return Promise.all(perfoes.map( perfo => {
    return space.createEntry('performance', {
      fields: {
        "date": {'en-US': new Date(perfo.date)},
        "name": {'en-US': perfo.name},
        "link": {'en-US': perfo.link},
        "place": {'en-US': perfo.place},
        "info": {'en-US': perfo.info},
        "location": {'en-US': {
          sys: {
            id: perfo.location_id,
            type: 'Link',
            linkType: 'Entry'
          }
        }},
        "group": {'en-US': {
          sys: {
            id: perfo.group_id,
            type: 'Link',
            linkType: 'Entry'
          }
        }},
        "program": {'en-US': {
          sys: {
            id: perfo.program_id,
            type: 'Link',
            linkType: 'Entry'
          }
        }}
      }
    }).then( (entry) => {
      if (publish)
        return entry.publish()
    })
  }))
}


function linkRecords(records, groups, groups_records) {
  return records.map( record => {
    return Object.assign(record, {
      group_id: groups
        .find( group => {
          return group.id === groups_records.find( entry => entry.record_id === record.id).group_id
        })._id
      })
  })
}

function createRecords(records) {
  return Promise.all(records.map( (record, idx, records) => {
    return space.createUpload({
      file: fs.readFileSync('scripts/img/'+record.img),
      contentType: 'image/jpeg',
      fileName: record.img
    })
    .then( upload => {
      return space.createAsset({
        fields: {
          title: {
            'en-US': record.title,
            'es-ES': record.title
          },
          file: {
            'en-US': {
              fileName: record.img,
              contentType: 'image/jpeg',
              uploadFrom: {
                sys: {
                  type: 'Link',
                  linkType: 'Upload',
                  id: upload.sys.id
                }
              }
            },
            'es-ES': {
              fileName: record.img,
              contentType: 'image/jpeg',
              uploadFrom: {
                sys: {
                  type: 'Link',
                  linkType: 'Upload',
                  id: upload.sys.id
                }
              }
            }
          }
        }
      })
    })
    .then(asset => asset.processForAllLocales())
    .then(asset => asset.publish())
    .then( asset => {
      return space.createEntry('record', {
        fields: {
          title: {'en-US': record.title},
          subtitle: {'en-US': record.subtitle},
          date: {'en-US': new Date(record.date)},
          itunes: {'en-US': record.itunes},
          spotify: {'en-US': record.spotify},
          amazon: {'en-US': record.amazon},
          colaboration: {'en-US': (record.colaboration === '1')? true : false},
          group: {'en-US': {
            sys: {
              id: record.group_id,
              type: 'Link',
              linkType: 'Entry'
            }
          }},
          image: {'en-US': {
            sys: {
              id: asset.sys.id,
              type: 'Link',
              linkType: 'Asset'
            }
          }}
        }
      })
    })
    .then( (entry) => {
      console.log( 'uploaded', record)
      if (publish)
        return entry.publish()
    })
    .catch( (err) => console.log('error', err, record.img))
  }))
}
