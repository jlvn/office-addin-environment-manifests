import {Environment} from '../environments'

export interface Variable {
    appearance: string,
    name: string
}

export interface Warning {
    message: string,
    environment: string,
    value: string
}

export interface EnvironmentManifest {
    environment: string,
    manifest: string
}

export interface EnvironmentManifestResult {
    warnings: Warning[]
    envManifests: EnvironmentManifest[]
}

export function getTemplateManifestVariables(template: string): Variable[]

export function createEnvironmentManifests(template: string, environments: Environment[], variables: Variable[]): EnvironmentManifestResult[]
