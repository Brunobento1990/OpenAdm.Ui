export function removerItemDeArrayPorIndex<T>(
    index: number,
    array: T[],
): T[] {
    return [
        ...(array.slice(0, index) ?? []),
        ...(array.slice(index + 1) ?? []),
    ];
}