'use strict';

class ValidationContract {
    constructor() {
        var _errors = [];
        
        this.addError = (message) => {
            _errors.push({ message: message });
        }

        this.errors = () => {
            return _errors;
        }

        this.clear = () => {
            _errors = [];
        }
    }

    isRequired(value, message) {
        if (!value || value.length <= 0)
            this.addError(message);
    }

    hasMinLen(value, min, message) {
        if (!value || value.length < min)
            this.addError(message);
    }

    hasMaxLen(value, max, message) {
        if (!value || value.length > max)
            this.addError(message);
    }

    isFixedLen(value, len, message) {
        if (value.length != len)
            this.addError(message);
    }

    isEmail(value, message) {
        var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
        if (!reg.test(value))
            this.addError(message);
    }

    isValid() {
        return this.errors().length == 0;
    }
}

module.exports = ValidationContract;
