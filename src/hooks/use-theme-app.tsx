export function useThemeApp(fontSize?: number, color?: string) {


    return {
        backgroudcolor: {
            primary: 'rgb(28, 37, 54)',
            secundary: 'rgba(255, 255, 255, 0.04)'
        },
        color: {
            primary: 'rgb(255, 255, 255)',
            secundary: 'rgb(99, 102, 241)'
        },
        configFont: {
            fontSize: fontSize ?? 14,
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
            fontWeight: 600,
            color:color ?? 'rgb(255, 255, 255)'
        },
        configFontEscuro: {
            fontSize: fontSize ?? 14,
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
            fontWeight: 600,
            color: color ??'rgb(99, 102, 241)'
        }
    }
}