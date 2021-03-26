const createVariable = appearance => ({
    appearance,
    name: appearance.replace(/[{}]/g, '')
})

const createWarning = (message, environment, value) => ({
    message,
    environment,
    value
})

const createEnvManifest = (environment, manifest) => ({
    environment,
    manifest
})

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

const createEnvironmentManifests = (template, environments, variables) => {
    const warnings = []
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
