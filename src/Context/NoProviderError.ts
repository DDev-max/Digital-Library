export class NoProviderError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'NoProviderError'
    }
}