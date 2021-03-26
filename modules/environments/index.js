const dotenv = require('dotenv')
const {fileToUtf8String, fromCwd} = require("../io");

const createEnvironment = (name, config = {}) => ({
    name,
    config
})

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
