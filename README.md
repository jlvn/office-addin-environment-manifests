# Office Add-In environment manifests
Generate office Add-In manifest files for different environments based on a template manifest file.

## How to use
There are two main ways to use this package:
1. As a command line interface
2. As a function in your bundler configuration/application

### Configuration
To use this package properly a configuration has to be supplied.
This configuration is expected to have the following format.
```typescript
interface Environment {
    name: string // Friendly environment name.
    config: object // A key value map of environment variables.
}

interface EnvironmentFile {
    name: string // Friendly environment name.
    path: string // .env file path.
}

interface UserConfig {
    inputTemplateManifestFilePath: string // A filepath to the template manifest file.
    outputManifestFilePath: string // A folder to write the resulting environment manifest files to.
    getOutputManifestFileName(environmentName: string): string // A function for the resulting in environment manifest filenames.
    inputEnvironmentFiles?: EnvironmentFile[] // A array corresponding to the location of the .env files with their friendly name (Optional).
    environmentResolver?(files: EnvironmentFile[] | any): Promise<Environment> // A function to resolve Environments asynchronimously (Optional).
}
```

### Command line usage
For command line usage a config file is needed.
The default location for this config file is `./environmentManifests.config.js`. 
You can however specify another location by setting the `USER_CONFIG_FILE_PATH` environment variable.

#### Creating a config file
This package uses a javascript module as a config format. This config has to adhere to the following format (see [configuration](#configuration) for more information):
```typescript
module.exports = {} as UserConfig
```

#### Config example predefined .env environment files
```js
module.exports = {
    inputTemplateManifestFilePath: './manifest.template.xml',
    outputManifestFilePath: './manifests/',
    getOutputManifestFileName: environment => `manifest.${environment}.xml`,
    inputEnvironmentFiles: [
        {
            name: 'development',
            path: './.env.development'
        },
        {
            name: 'test',
            path: './.env.test'
        }
    ]
}
```

### Function usage
To use this package as a function you simply import it in your program.

#### example usage
See [configuration](#configuration) for more information.
```js
const config = {
    inputTemplateManifestFilePath: './manifest.template.xml',
    outputManifestFilePath: './manifests/',
    getOutputManifestFileName: environment => `manifest.${environment}.xml`,
    inputEnvironmentFiles: [
        {
            name: 'development',
            path: './.env.development'
        },
        {
            name: 'test',
            path: './.env.test'
        }
    ]
}

// This function will return a promise of a warning array.
const warnings = await generateEnvironmentManifests(config)
console.log(warnings)
```

### Creating a template manifest file
A template manifest file is a UTF-8 formatted text file.
This package does not parse nor validate the "manifest" files it simply replaces environment variables with a given syntax.

#### Variable Syntax
In template manifest files you can define variables in the format: `{{[name of variable]}}`.
These variable names have to correlate to the environment variables in your .env file.

### Generating a environment manifest files
Let's say we have the following .env file for the development environment:
```dotenv
URL=https://domain.internal/
```

and we have the following .env file for the test environment:
```dotenv
URL=https://support.github.com/
```

We create the following template "manifest" file (please use a valid Office Add-in Manifest file):
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<OfficeApp>
    <SupportUrl DefaultValue="{{URL}}"/>
</OfficeApp>
```

If we execute the package it will produce 2 separate manifest files for the development and test environment using the environment variables respectively:
##### development
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<OfficeApp>
    <SupportUrl DefaultValue="https://domain.internal/"/>
</OfficeApp>
```

##### test
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<OfficeApp>
    <SupportUrl DefaultValue="https://support.github.com/"/>
</OfficeApp>
```
