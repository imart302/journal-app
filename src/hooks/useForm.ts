import React, { ChangeEvent, useState } from 'react';

export interface IFormField {
  name: string;
  value: string;
  valid?: boolean; 
  validation? : (value: string) => boolean;
}

export interface IUseFormSte {
  fields: IFormField[];
}

export interface IUseFormProps {
  fields: IFormField[];
}

export const useForm = (props: IUseFormProps) => {
  const [state, setState] = useState<IUseFormSte>({ fields: props.fields });

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setState( (current) => ({
      fields: current.fields.map((field) => {
        if (field.name === name) {
          return {
            ...field,
            value,
            valid: field.validation?.(value)
          };
        } else {
          return field;
        }
      }),
    }));
  };

  const field = (key: string): IFormField | null => {
    const f = state.fields.find((field) => field.name == key);
    if (f) return f;
    else return null;
  };

  return {
    formFields: state.fields,
    onInputChange,
    field,
  };
};
