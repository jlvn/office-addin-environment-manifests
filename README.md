# Office Add-In environment manifests
Generate office Add-In manifest for different environments based on a template manifest

## How to use
### Create a config file
example:
```js
module.exports = {
    inputTemplateManifestFilePath: './manifest.xml',
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

### Create a template manifest file
In template manifest files you can define variables in the format: `{{[name of variable]}}`, for example: `{{URL}}`.
These variable names have to correlate to the environment variables in your .env file.
