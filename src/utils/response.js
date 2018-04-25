'use strict'

class Response {
    success(res, message, statusCode = 200) {
        return this.resposta(res, { message: message }, statusCode);
    }
    
    failure(res, message, statusCode = 500) {
        return this.resposta(res, { message: message }, statusCode);
    }
    
    send(res, data, statusCode = 200) {
        return this.res.status(statusCode).send(data);
    }
}

module.exports = Response;
