export function base64ToUint8Array(base64: string) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

export function generatePdfFromBase64(base64String: string) : Promise<string> {
    const bytes = base64ToUint8Array(base64String);

    return new Promise((resolve, reject) => {
        try {
            const blob = new Blob([bytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            resolve(url);
        } catch (error) {
            reject(error);
        }
    });
}