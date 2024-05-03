type Currency = "R$" | "US$";

export function formatMoney(
  value: string | number | undefined,
  currency?: Currency): string {
  if (!value) {
    return `${currency ?? 'R$'} 0,00`;
  }
  let newValue = value;
  let isNegative = false;
  if (typeof value === 'number') {
    isNegative = value < 0;
    newValue = value.toFixed(2);
  } else {
    newValue = value.trim();
    isNegative = newValue.includes('-');
  }
  const cleanValue = String(newValue).replace(/[^0-9]/g, '');
  const paddedValue = cleanValue.padStart(3, '0');
  const reais = paddedValue.slice(0, -2);
  const centavos = paddedValue.slice(-2);
  const formattedReais = Number(reais).toLocaleString('pt-BR');
  if (isNegative) return `${currency ?? 'R$'} -${formattedReais},${centavos}`;
  return `${currency ?? 'R$'} ${formattedReais},${centavos}`;
}

export function cleanFormatMoney(value?: string | number): number | undefined {
  if (!value) return undefined;
  if (value === '') return 0;
  if (typeof value === 'number') return value;
  value = value.replace(/[^0-9.,]/g, '');
  if (!value.includes(',')) return parseFloat(value);
  const splited = value.trim().split(',');
  return parseFloat(`${splited[0].replaceAll('.', '')}.${splited[1]}`);
}
