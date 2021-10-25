/***
 * @typedef {{appearance: string, name: string}} Variable
 */

/***
 * @typedef {{message: string, environment: string, value: string}} Warning
 */

/***
 * @typedef {{
 *      environment: string,
 *      manifest: string
 *}} EnvironmentManifest
 */

/***
 * @typedef {{
 *      warnings: Warning[],
 *      envManifests: EnvironmentManifest[]
 * }} EnvironmentManifestResult
 */

/***
 * @param appearance {string}
 * @return Variable
 */
const createVariable = appearance => ({
    appearance,
    name: appearance.replace(/[{}]/g, '')
})

/***
 * @param message {string}
 * @param environment {string}
 * @param value {string}
 * @return Warning
 */
const createWarning = (message, environment, value) => ({
    message,
    environment,
    value
})

/***
 * @param environment {string}
 * @param manifest {string}
 * @return EnvironmentManifest
 */
const createEnvManifest = (environment, manifest) => ({
    environment,
    manifest
})

/***
 * @param manifest {string}
 * @return Variable[]
 */
const getTemplateManifestVariables = manifest => {
    const matches = manifest.match(/({{[A-Za-z0-9_]*}})+/g)
    if (!matches) {
        return []
    }
    const variableMap = {}
    for (const match of matches) {
        if (variableMap[match]) {
            continue
        }
        variableMap[match] = createVariable(match)
    }
    return Object.values(variableMap)
}

/***
 * @param template {string}
 * @param environments {Environment[]}
 * @param variables {Variable[]}
 * @return EnvironmentManifestResult
 */
const createEnvironmentManifests = (template, environments, variables) => {
    /***
     * @type {Warning[]}
     */
    const warnings = []
    /***
     * @type {EnvironmentManifest[]}
     */
    const envManifests = []

    for (const env of environments) {
        let manifest = template
        for (const variable of variables) {
            const value = env.config[variable.name]
            if (!value) {
                warnings.push(createWarning("Missing value for variable", env.name, variable.name))
                continue
            }
            const regex = new RegExp(variable.appearance, 'g')
            manifest = manifest.replace(regex, value)
        }
        envManifests.push(createEnvManifest(env.name, manifest))
    }

    return {
        warnings,
        envManifests
    }
}

module.exports = {
    getTemplateManifestVariables,
    createEnvironmentManifests
}
