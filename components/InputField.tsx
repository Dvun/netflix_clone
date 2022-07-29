import React, { memo } from 'react';
import { NextPage } from 'next';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

interface Props {
  name: string
  placeholder: string
  type?: string
}

const InputField: NextPage<Props> = memo(({name, placeholder, type}) => {
  const {register, formState: {errors}} = useFormContext()

  return (
    <label htmlFor="" className="inline-block w-full">
      <input
        type={type}
        placeholder={placeholder}
        className="input"
        {...register(name)}
      />
      <ErrorMessage name={name} errors={errors} render={({message}) =>
        <p className='p-1 text-[13px] font-light text-orange-500'>
          {message}
        </p>}
      />
    </label>
  );
});

export default InputField;