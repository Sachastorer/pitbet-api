import { Exception } from '@adonisjs/core/exceptions'

export default class CustomException extends Exception {
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}
