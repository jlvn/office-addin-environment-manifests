const {fileToUtf8String, writeEnvManifestsTo, fromCwd, tryRequire} = require('./modules/io')
const {getTemplateManifestVariables, createEnvironmentManifests} = require('./modules/manifests')
const {tryReadConfig} = require('./modules/config')
const {createEnvironment} = require('./modules/environments')
const chalk = require('chalk')

const {
    USER_CONFIG_FILE_PATH
} = process.env

const generateEnvironmentManifests = async userConfig => {
    const {
        inputTemplateManifestFilePath,
        environmentResolver,
        inputEnvironmentFiles,
        getOutputManifestFileName,
        outputManifestFilePath
    } = await tryReadConfig(userConfig)
    const template = await fileToUtf8String(inputTemplateManifestFilePath)
    const variables = getTemplateManifestVariables(template)
    const environments = await environmentResolver(inputEnvironmentFiles)
    const {envManifests, warnings} = createEnvironmentManifests(template, environments, variables)
    await writeEnvManifestsTo(fromCwd(outputManifestFilePath), getOutputManifestFileName, envManifests)
    return warnings
}

(async () => {
    try {
        const userConfig = await tryRequire(fromCwd(USER_CONFIG_FILE_PATH || './environmentManifests.config.js'))
        const warnings = await generateEnvironmentManifests(userConfig)
        for (const warning of warnings) {
            console.warn(`${chalk.bgYellow.black(' WARNING ')} ${chalk.yellow(`${warning.message} '${warning.value}', in environment: '${warning.environment}'`)}`)
        }
    } catch (e) {
        console.error(e)
    }
})()

module.exports = {
    generateEnvironmentManifests,
    createEnvironment
}
