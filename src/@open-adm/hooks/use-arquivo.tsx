interface resultRecorteBase64 {
    base64: string;
    contentType: string;
}

export function useArquivo() {
    function recortarBase64(base64p: string): resultRecorteBase64 {
        const indexBase64 = base64p.indexOf(",") + 1;
        const indexContentTypeInicio = base64p.indexOf("/") + 1;
        const indexContentTypeFim = base64p.indexOf(";");
        const base64 = base64p.slice(indexBase64);
        const contentType = base64p.slice(
            indexContentTypeInicio,
            indexContentTypeFim
        );
        return {
            base64,
            contentType,
        };
    }

    function resolveUploadImagem(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    }

    function base64ToUint8Array(base64: string) {
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    }

    function generatePdfFromBase64(base64String: string): Promise<string> {
        const bytes = base64ToUint8Array(base64String);

        return new Promise((resolve, reject) => {
            try {
                const blob = new Blob([bytes], { type: "application/pdf" });
                const url = URL.createObjectURL(blob);
                resolve(url);
            } catch (error) {
                reject(error);
            }
        });
    }

    function formatarBase64(base64: string) {
        return `data:image/png;base64,${base64}`;
    }

    return {
        recortarBase64,
        resolveUploadImagem,
        generatePdfFromBase64,
        formatarBase64,
    };
}
