import { useMemo } from 'react';
import useForm from 'react-hook-form';
import * as yup from 'yup';
import { schemas } from 'forms/formValidations';

type SchemasKeys = typeof schemas;

interface Props {
  key: keyof SchemasKeys;
}

export default function useFormBuilder({ key }: Props) {
  const FormSchema = useMemo(() => yup.object().shape(schemas[key]), [key]);
  return useForm({ validationSchema: FormSchema });
}
