export function maskPhone(value?: string): string | undefined {
    if (!value) return undefined;

    if (typeof value != 'string') return '';
    const digits = value.replace(/\D/g, '')

    const match = digits.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    if (!match) return '';
    return match[1] ? `(${match[1]}` + (match[2] ? `) ${match[2]}` + (match[3] ? `-${match[3]}` : '') : '') : '';
}

export function clearMaskCnpj(cnpj?: string): string | undefined {
    if (!cnpj) return undefined;

    return cnpj.replaceAll('.', '')
        .replaceAll('-', '')
        .replaceAll('/', '')
        .replaceAll(' ', '');
}

export function clearMaskCpf(cpf?: string): string | undefined {
    if (!cpf) return undefined;

    return cpf.replaceAll('.', '')
        .replaceAll('-', '')
        .replaceAll(' ', '');
}

export function clearMaskPhone(telefone?: string): string | undefined {
    if (!telefone) return undefined;

    return telefone.replaceAll('(', '')
        .replaceAll(')', '')
        .replaceAll('-', '')
        .replaceAll(' ', '')
}

export function maskCNPJ(cnpj?: string): string {

    if (!cnpj) return '';

    return cnpj
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
}

export function maskCPF(cpf?: string): string {

    if (!cpf) return '';

    return cpf
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
}