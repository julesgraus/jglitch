export interface GlitcherInterface<T> {
    step(stepAmount: number): void
}

export interface GlitcherOptions {
    [key: string]: unknown;
}
