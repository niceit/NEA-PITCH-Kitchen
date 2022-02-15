class ApiServiceError {
    name = 'ApiServiceError';
    domain = 'com.otlopwebapp';
    code;
    message;
    stack;
    validationFailures = [];

    constructor (message, code, domain, name, validationFailures, stack) {
        this.message = message
        this.domain = domain
        this.code = code
        this.name = name
        this.validationFailures = validationFailures
        this.stack = stack
    }

    static fromApiError (apiError) {
        const response = apiError.response || null
        const errResponse = response ? (response.data.error || null) : null

        if (errResponse) {
            return new ApiServiceError(errResponse.message,
                errResponse.code,
                errResponse.domain,
                errResponse.exception,
                errResponse.validation_failures,
                errResponse.trace)
        } else {
            return new ApiServiceError(`ApiService ${apiError}`)
        }
    }
}

export {
    ApiServiceError
}
