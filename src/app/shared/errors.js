export class IvalidParamsError extends Error {
    constructor(message) {
        super(message);
        this.name = "IvalidParamsError";
    }
}

export class ServerError extends Error {
    constructor(message) {
        super(message);
        this.name = "ServerError";
    }
}

export class UnknownError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnknownError";
    }
}
