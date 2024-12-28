import { useFormik } from "formik";

interface propsUseFormikAdapter {
  initialValues?: any;
  validationSchema?: any;
  onSubmit: (value: any) => void;
}

export function useFormikAdapter<T = any>(props: propsUseFormikAdapter) {
  const formik = useFormik({
    initialValues: props.initialValues ?? {},
    validationSchema: props.validationSchema,
    onSubmit: props.onSubmit,
  });

  function setValue(value: Partial<T>) {
    formik.setValues({
      ...formik.values,
      ...value,
    });
  }

  function onChange(id: string, newValue?: any) {
    formik.setValues({
      ...formik.values,
      [id]: newValue
    })
  }

  return {
    setValue,
    onSubmit: formik.submitForm,
    value: (key: string) => formik.values[key],
    onBlur: formik.handleBlur,
    onChange,
    helperText: (key: string): any => formik.touched[key] && formik.errors[key],
    error: (key: string) => !!(formik.touched[key] && formik.errors[key]),
    values: formik.values as T
  };
}
