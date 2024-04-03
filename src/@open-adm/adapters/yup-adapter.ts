import * as yup from 'yup';

export class YupAdapter {
    private shape: any
    private message: string = 'Este campo é obrigatório!';
    constructor() {
        this.shape = {};
    }

    string(fieldName: string, message?: string) {
        this.shape[fieldName] = yup.string().required(message ?? this.message);
        return this;
    }

    email(fieldName: string, message?: string) {
        this.shape[fieldName] = yup.string().email("E-mail inválido").required(message ?? this.message);
        return this;
    }

    build() {
        return yup.object().shape(this.shape);
    }
}