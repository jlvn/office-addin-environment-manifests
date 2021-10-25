const dotenv = require('dotenv')
const {fileToUtf8String, fromCwd} = require('../io')

/***
 * @typedef {{name: string, config: Object}} Environment
 */

/***
 * @typedef {{name: string, path: string}} EnvironmentFile
 */

/***
 *
 * @param name {string}
 * @param config {Object}
 * @return Environment
 */
const createEnvironment = (name, config = {}) => ({
    name,
    config
})

/***
 * @param files {EnvironmentFile[]}
 * @return {Promise<Environment[]>}
 */
const resolveEnvironmentFiles = async files => {
    const environments = []

    if (!files) {
        return environments
    }

    for (const {name, path} of files) {
        try {
            const content = await fileToUtf8String(fromCwd(path))
            environments.push(createEnvironment(name, dotenv.parse(content)))
        } catch (error) {
            environments.push(createEnvironment(name))
        }
    }
    return environments
}

module.exports = {
    createEnvironment,
    resolveEnvironmentFiles
}
