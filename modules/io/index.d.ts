import {EnvironmentManifest} from '../manifests'
import {UserConfig} from "../config"

export function fileToUtf8String(path: string): Promise<string>

export function writeEnvManifestsTo(folder: string, getFilename: (environment: string) => string, envManifests: EnvironmentManifest[]): Promise<void>

export function fromCwd(path: string): string

export function requireConfig(path: string): Promise<UserConfig>
