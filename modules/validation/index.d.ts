export interface ValidationResult {
    result: object
    errors: string[]
}

export interface Validation {
    key: string
    value: unknown | Function | Promise<unknown>
    validator: (value: unknown) => Promise<unknown>
    defaultValue: unknown
    optional: boolean
}

export function validate(validations: Validation[]): Promise<ValidationResult>
