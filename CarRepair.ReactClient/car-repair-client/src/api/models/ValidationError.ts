export class ValidationError {
    constructor(public type: string, public title: string, public status: number, public traceId: string, public errors: Map<string, string[]>) { }
}