export class IvalidParamsError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ServerError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class UnknownError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
