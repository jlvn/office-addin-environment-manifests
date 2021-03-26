import {Environment, EnvironmentFile} from '../environments'

export interface UserConfig {
    inputTemplateManifestFilePath: string

    outputManifestFilePath: string,

    getOutputManifestFileName(environment: string): string

    inputEnvironmentFiles?: EnvironmentFile[]

    environmentResolver?(files: EnvironmentFile[] | unknown): Promise<Environment[]>
}

export interface Config {
    inputTemplateManifestFilePath: string

    outputManifestFilePath: string,

    getOutputManifestFileName(environment: string): string

    inputEnvironmentFiles: EnvironmentFile[]

    environmentResolver(files: EnvironmentFile[] | unknown): Promise<Environment[]>
}

export function tryReadConfig(config: UserConfig): Promise<Config>
