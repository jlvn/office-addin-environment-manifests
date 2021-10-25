const fs = require('fs/promises')
const paths = require('path')

/***
 * @param path {string}
 * @return {string}
 */
const fromCwd = path => paths.resolve(process.cwd(), path)

/***
 * @param path {string}
 * @return {Promise<object>}
 */
const tryRequire = path => new Promise((resolve, reject) => {
    try {
        const module = require(path)
        resolve(module)
    } catch (e) {
        reject(e)
    }
})

/***
 * @param path {string}
 * @return {Promise<string>}
 */
const fileToUtf8String = path => fs.readFile(path).then(data => data.toString('utf-8'))

/***
 * @param folder {string}
 * @param getFilename {function(string): string}
 * @param envManifests {EnvironmentManifest[]}
 * @return {Promise<void>[]}
 */
const writeEnvManifestsTo = (folder, getFilename, envManifests) => envManifests.map(({environment, manifest}) =>
    fs.mkdir(folder, {recursive: true}).then(() => fs.writeFile(paths.resolve(folder, getFilename(environment)), manifest)))

module.exports = {
    fileToUtf8String,
    writeEnvManifestsTo,
    fromCwd,
    tryRequire
}
