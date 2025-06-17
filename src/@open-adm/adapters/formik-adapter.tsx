import { useFormik } from 'formik';

interface propsUseFormikAdapter {
  initialValues?: any;
  validationSchema?: any;
  onSubmit?: (value: any) => void;
}

export interface IFormikAdapter<T = any> {
  setValue: (value: Partial<T>) => void;
  onSubmit: () => Promise<any>;
  value: (key: string) => any;
  onBlur: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  onChange: (id: string, newValue?: any) => Promise<void>;
  helperText: (key: string) => any;
  error: (key: string) => boolean;
  values: T;
  limpar: () => void;
  limparFiltros: (valoresPadrao: Partial<T>) => void;
  helperTextObj: (obj: string, key: string) => string | undefined;
  errorObject: (obj: string, key: string) => boolean;
  setError: (field: string, mensagem?: string) => void;
  setErroObject: (obj: string, field: string, mensagem?: string) => void;
  restartErros: () => void;
}

export function useFormikAdapter<T = any>(
  props: propsUseFormikAdapter,
): IFormikAdapter<T> {
  const formik = useFormik({
    initialValues: props.initialValues ?? {},
    validationSchema: props.validationSchema,
    onSubmit: props.onSubmit!,
  });

  function setValue(value: any) {
    formik.setValues({
      ...formik.values,
      ...value,
    });
  }

  async function onChange(id: string, newValue?: any) {
    if (id?.includes('.')) {
      const ids = id.split('.');
      let valorFinal = newValue;
      for (let i = ids.length - 1; i > 0; i--) {
        const currentValues = ids
          .slice(0, i)
          .reduce(
            (acc, key) => formik.values[key] || acc[key] || {},
            formik.values,
          );

        valorFinal = {
          ...currentValues,
          [ids[i]]: valorFinal,
        };
      }

      await formik.setValues({
        ...formik.values,
        [ids[0]]: valorFinal,
      });
      return;
    }

    await formik.setValues({
      ...formik.values,
      [id]: newValue,
    });
  }

  async function limpar() {
    await formik.setValues(props.initialValues ?? {});
    formik.setErrors({});
    formik.setTouched({}, false);
  }

  function limparFiltros(valoresPadrao: Partial<T>) {
    formik.setValues(valoresPadrao);
    formik.setErrors({});
    formik.setTouched({}, false);
  }

  function helperTextObj(obj: string, key: string): string | undefined {
    const touched = formik.touched[obj] as any;
    const errors = formik.errors[obj] as any;

    if (touched && errors) {
      return touched[key] && errors[key];
    }
    return '';
  }

  function errorObject(obj: string, key: string): boolean {
    const touched = formik.touched[obj] as any;
    const errors = formik.errors[obj] as any;

    if (touched && errors) {
      return !!(touched[key] && errors[key]);
    }
    return false;
  }

  function setError(field: string, mensagem?: string) {
    formik.touched[field] = true;
    formik.setFieldError(field, mensagem ?? 'Este campo é obrigatório!');
  }

  function setErroObject(obj: string, field: string, mensagem?: string) {
    const touched = formik.touched[obj] as any;
    const errors = formik.errors[obj] as any;

    if (touched && errors) {
      touched[field] = true;
      errors[field] = mensagem ?? 'Este campo é obrigatório!';
    } else {
      formik.touched[obj] = {
        [field]: true,
      };
      formik.errors[obj] = {
        [field]: mensagem ?? 'Este campo é obrigatório!',
      };
    }
  }

  function restartErros() {
    formik.setErrors({});
    formik.setTouched({}, false);
  }

  return {
    setValue,
    onSubmit: formik.submitForm,
    value: (key: string) => formik.values[key],
    onBlur: formik.handleBlur,
    onChange,
    helperText: (key: string): any =>
      formik.touched[key] && formik.errors[key],
    error: (key: string) => !!(formik.touched[key] && formik.errors[key]),
    values: formik.values as T,
    limpar,
    limparFiltros,
    helperTextObj,
    errorObject,
    setError,
    setErroObject,
    restartErros,
  };
}