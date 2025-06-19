export function palavraNoPlural(palavraSingular: string, palavraPluralParams: string, quantidade: number) {
    return `${quantidade > 1 ? palavraPluralParams : palavraSingular}`
}