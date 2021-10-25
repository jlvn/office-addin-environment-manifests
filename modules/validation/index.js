/***
 * @typedef {{
 *      key: string,
 *      value: any | Function | Promise<any>,
 *      validator: function(value: any): Promise<any>,
 *      defaultValue?: any,
 *      optional?: boolean
 * }} Validation
 */

/***
 * @typedef {{
 *      result: object,
 *      errors: string[]
 * }} ValidationResult
 */

/***
 *
 * @param validations {Validation[]}
 * @return {Promise<ValidationResult>}
 */
const validate = validations => new Promise(resolve => {
    const totalErrors = []
    const totalResult = {}
    const promises = validations.map(({key, value, validator, defaultValue, optional}) => {
        return validator(value).then(result => {
            totalResult[key] = result
        }, error => {
            totalResult[key] = defaultValue
            if (!optional) {
                totalErrors.push(error)
            }
        })
    })
    Promise.all(promises).then(() => resolve({
        result: totalResult,
        errors: totalErrors
    }))
})

module.exports = {
    validate
}
