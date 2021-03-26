import {UserConfig} from "./modules/config";
import {Warning} from "./modules/manifests";

export function generateEnvironmentManifests(userConfig: UserConfig): Promise<Warning[]>;
export { createEnvironment } from "./modules/environments";
