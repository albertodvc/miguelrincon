
const fs = require('fs')
const contentful = require('contentful-management')

var odb = JSON.parse(fs.readFileSync('scripts/db.json', 'utf8'))

var perfoes = JSON.parse(fs.readFileSync('scripts/perfoes.json', 'utf8'))
var groups = JSON.parse(fs.readFileSync('scripts/groups.json', 'utf8'))
var programs = JSON.parse(fs.readFileSync('scripts/programs.json', 'utf8'))



const client = contentful.createClient({
  accessToken: process.env.CTF_M_TOKEN
})


client.getSpace(process.env.CTF_SPACE_ID)
.then( space => createPerfoes(space, perfoes))
.then( result => {
  console.log('lets write', result)
})
.catch( err => console.log('JORROR', err))


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
      console.log('Entry created', entry.sys.id)
      group._id = entry.sys.id
      return group._id
    })
  }))
}

function createLocations(space, perfoes, locations, locations_perfoes) {
  _perfoes = perfoes.map(perfo => {
    return Object.assign({}, perfo, {
      location: locations_perfoes
        .filter( entry => entry.perfo_id === perfo.id)
        .map(location => locations.find(_location => _location.id == location.location_id))
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
  return Promise.all(_perfoes.map( (perfo) => {
    return space.createEntry('location', {
      fields: perfo.location
    })
    .then((entry) => {
      perfo.location_id = entry.sys.id
      delete perfo.location
      return perfo.location_id
    })
  }))
}

function createPrograms(space, programs) {
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
      return program._id
    })
  }))
}

function linkPerfoes(perfoes, groups, programs, groups_perfoes, perfoes_programs) {
  return perfoes.map(perfo => {

    return Object.assign({}, perfo, {
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

function createPerfoes(space, perfoes) {
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
    })
  }))
}
