'use strict';

// const {link} = require("linkfs");
// const mock = require('mock-require');

const { Nuxt, Builder, Generator } = require('nuxt')

// Require Nuxt config
const config = require('./nuxt.config.js')
config.dev = false

// Create a new Nuxt instance
const nuxt = new Nuxt(config)

const builder = new Builder(nuxt)

const generateOptions = {
  init: true
}

const generator = new Generator(nuxt, builder)

const fs = require('fs');
var ncp = require('ncp').ncp;
const tmpDir = require('os').tmpdir();
var shell = require('shelljs');
const { exec } = require('child_process')
const repo = 'https://github.com/albertodvc/miguelrincon.git'
const repoPath = '/tmp/repo'
const p = '/var/task'

// const rewriteFs = () => {
//   // redirect paths
//   const linkedFs = link(fs, [
//     [`${__dirname}/.cache`, tmpDir+"/.cache"],
//     [`${__dirname}/public`, tmpDir+"/public"]
//   ]);

//   // those are missing in linkfs
//   linkedFs.ReadStream = fs.ReadStream;
//   linkedFs.WriteStream = fs.WriteStream;

//   // replace fs with linkfs globally
//   mock('fs', linkedFs);
// }

var cloneRepository = (repo) => {
   return new Promise((resolve, reject) => {
        exec(`git clone -b gh-pages --single-branch ${repo} ${repoPath}`, (error, stdout, stderr) => {
            if (error) {
                console.warn('Error cloning', error)
                reject(error)
            } else {
                console.log('Cloned', stdout)
                resolve(stdout)
            }
        })
   })
}

var installDependecies = () => {
    return new Promise((resolve, reject) => {
        ncp('./', `${repoPath}`, function (error) {
          if (error) {
            console.warn('Error Coping node_modules', error)
                reject(error)
          } else {
            console.log('Node modules installed!')
                console.log(shell.ls('-la', repoPath).map(file=>file.toString()))
                console.log(shell.ls('-la', '/tmp').map(file=>file.toString()))
                resolve()
          }
        });

   })
}

var render = () => {

    //return nuxt.generate()
   return new Promise((resolve, reject) => {
        exec(`npm run generate`, (error, stdout, stderr) => {
          if (error) {
              console.warn('Error rendering ###############', error, stdout, stderr)
              reject(stderr)
          } else {
              console.log('RENDERED!', error, stdout, stderr)
              resolve(stdout)
          }
      })
   })
}

exports.handler = (event, context, callback) => {
      console.log('lets rock friends')
      require("lambda-git")()
      // .then( () => cloneRepository(repo) )
      // .then(build)
      .then( (res) => generator.generate(generateOptions) )
      .then( (res) => {
        console.log('Rendering')
        return render()
      })
      .then( (res) => {
        console.log('Generator generated', res.errors)
        //console.log(shell.ls('-l').map(file=>file.toString()))
        callback(null, {body: "What an event"});
      })
      .catch((error) => {
        console.warn('HORROR!!!!!', error)
        return false
      });
}
