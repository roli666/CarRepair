import { ResponseObject } from "./ResponseObject";

interface Error {
  [key: string]: string[];
}
export class ValidationError extends ResponseObject {
  constructor(
    public type: string = "",
    public title: string = "",
    public status: number = 0,
    public traceId: string = "",
    public errors: Error = {}
  ) {
    super();
  }

  hasErrors(): boolean {
    return this.getErrorLength() !== 0;
  }

  getErrorLength(): number {
    return Object.keys(this.errors).length;
  }

  getErrors(): string[] {
    return Object.values(this.errors).flat();
  }
}
