/**
 * Generates a BEM class name
 */
export const bemClass = function (block: string, element: string|null = null, modifier:string|null = null) {
    let className = block
    if(element) className += '__' + element
    if(modifier) className += '--' + modifier
    return className;
}
