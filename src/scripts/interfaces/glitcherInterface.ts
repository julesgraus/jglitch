export interface GlitcherInterface {
    step(stepAmount: number): void
}

export interface GlitcherOptions {
    [key: string]: unknown;
}
