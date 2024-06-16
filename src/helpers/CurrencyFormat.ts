export function formatCurrency(amount: number, locale: string = 'es-MX', currency: string = 'MXN'): string {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(amount);
}