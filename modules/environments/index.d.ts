export interface Environment {
    name: string,
    config: object
}

export interface EnvironmentFile {
    name: string,
    path: string
}

export function createEnvironment(name: string, config: object): Environment

export function resolveEnvironmentFiles(files: EnvironmentFile[]): Environment[]
