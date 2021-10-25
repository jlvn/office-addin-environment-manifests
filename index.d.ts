export interface Environment {
    name: string,
    config: object
}

export interface EnvironmentFile {
    name: string,
    path: string
}

export interface UserConfig {
    inputTemplateManifestFilePath: string
    outputManifestFilePath: string,
    getOutputManifestFileName(environment: string): string
    inputEnvironmentFiles?: EnvironmentFile[]
    environmentResolver?(files: EnvironmentFile[] | any): Promise<Environment[]>
}

export interface Warning {
    message: string,
    environment: string,
    value: string
}

export function generateEnvironmentManifests(userConfig: UserConfig): Promise<Warning[]>
export function createEnvironment(name: string, config: object): Environment
