export function convertDate(date?: string): string | undefined {
    if (!date) {
        return undefined;
    }
    const newDateSplit = date.split("-");
    if (newDateSplit.length !== 3) {
        return date;
    }
    return `${newDateSplit[0]}-${newDateSplit[2]}-${newDateSplit[1]}`;
}