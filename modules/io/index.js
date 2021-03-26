const fs = require('fs/promises')
const paths = require('path')

const fromCwd = path => paths.resolve(process.cwd(), path)

const requireConfig = path => new Promise((resolve, reject) => {
    try {
        const module = require(path);
        resolve(module)
    } catch (e) {
        reject(e)
    }
})

const fileToUtf8String = path => fs.readFile(path).then(data => data.toString('utf-8'))

const writeEnvManifestsTo = (folder, getFilename, envManifests) => envManifests.map(({environment, manifest}) => fs.writeFile(paths.resolve(folder, getFilename(environment)), manifest))

module.exports = {
    fileToUtf8String,
    writeEnvManifestsTo,
    fromCwd,
    requireConfig
}
