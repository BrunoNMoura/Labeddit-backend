import { BaseError } from "./BaseError";

export class UnauthorizedError extends BaseError {
    constructor(
        message: string = "only admins can access this feature"
    ) {
        super(401, message)
    }
}