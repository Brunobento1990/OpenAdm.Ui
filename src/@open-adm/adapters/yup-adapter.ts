import * as yup from "yup";

export class YupAdapter {
    private shape: any;
    private message = "Este campo é obrigatório!";
    constructor() {
        this.shape = {};
    }

    string(fieldName: string, message?: string) {
        this.shape[fieldName] = yup.string().required(message ?? this.message);
        return this;
    }

    number(fieldName: string, message?: string, min?: number) {
        this.shape[fieldName] = yup
            .number()
            .typeError(message ?? this.message)
            .min(min ?? 1, message ?? this.message)
            .required(message ?? this.message);
        return this;
    }

    email(fieldName: string, message?: string) {
        this.shape[fieldName] = yup
            .string()
            .email("E-mail inválido")
            .required(message ?? this.message);
        return this;
    }

    object(obj: string, schema: any) {
        this.shape[obj] = schema;
        return this;
    }

    build() {
        return yup.object().shape(this.shape);
    }
}
