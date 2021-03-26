const {resolveEnvironmentFiles} = require("../environments");
const {validate} = require("../validation");

const validateFunction = value => value instanceof Function ? Promise.resolve(value) : Promise.reject('value is not a function')

const validateString = value => typeof value === typeof "" ? Promise.resolve(value) : Promise.reject('value is not a string')

const validatePromise = value => value ? Promise.resolve(value) : Promise.reject('promise is falsely')

const validateEnvironment = ({name, config}) => name && config && typeof config === typeof {} ?
    Promise.resolve({name, config}) :
    Promise.reject('resulting environment is not a valid environment (should be: {name: string, config: object})')

const validateEnvironments = value => new Promise((resolve, reject) => validatePromise(value)
    .then(getEnvironments => getEnvironments())
    .then(environments => {
        if (!typeof environments instanceof Array) {
            return reject('resulting environments are not an array')
        }
        const map = environments.map(environment => validateEnvironment(environment).catch(err => reject(err)))
        Promise.all(map).then(() => resolve(environments))
    }, reject)
)

const validateEnvironmentFiles = files => new Promise((resolve, reject) => {
    if (typeof files instanceof Array)  {
        return reject('environment files are not an array')
    }

    for(const {name, path} of files) {
        if (!name || !path) {
            return reject('environment file is not a valid environment file (should be: {name: string, string: path})')
        }
    }

    resolve(files)
})

const tryReadConfig = ({
    inputTemplateManifestFilePath,
    outputManifestFilePath,
    getOutputManifestFileName,
    inputEnvironmentFiles,
    environmentResolver
}) => new Promise((resolve, reject) => validate([
        {
            key: 'inputTemplateManifestFilePath',
            value: inputTemplateManifestFilePath,
            validator: validateString
        },
        {
            key: 'outputManifestFilePath',
            value: outputManifestFilePath,
            validator: validateString
        },
        {
            key: 'getOutputManifestFileName',
            value: getOutputManifestFileName,
            validator: validateFunction
        },
        {
            key: 'inputEnvironmentFiles',
            value: inputEnvironmentFiles,
            validator: validateEnvironmentFiles,
            defaultValue: [],
            optional: true
        },
        {
            key: 'environmentResolver',
            value: environmentResolver,
            validator: validatePromise,
            defaultValue: resolveEnvironmentFiles,
            optional: true
        }
    ]).then(({result, errors}) => {
        if (errors.length > 0) {
            reject(errors)
        }
        resolve(result)
    }))

module.exports = {
    tryReadConfig,
    validateEnvironments
}
