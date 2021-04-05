import { ValidationError } from "./models/ValidationError";

export class ErrorHandler {
    public static showError(status: number){
        
    }
    public static logError(error: ValidationError){
        console.log(error)
    }
}