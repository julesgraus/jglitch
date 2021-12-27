/**
 * Generates a BEM class name
 */
export const bemClass = function (block: string, element: string|null = null, modifier:string|null = null) {
    let className = block
    if(element) className += '__' + element
    if(modifier) className += '--' + modifier
    return className;
}

/**
 * Generate a random integer from and through the given min and max value
 */
export function getRandomIntInclusive(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

/**
 * Returns a debounced function
 */
export const debounce = (functionToDebounce: Function, delay = 300) => {
    let timeoutId: number;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => functionToDebounce.apply(this, args), delay);
    };
};
