import React, { memo, useState } from 'react';
import { NextPage } from 'next';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ILoginAndRegister } from '../types/types';
import InputField from './InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginValidation } from '../validation/validation';


const LoginForm: NextPage = memo(() => {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const methods = useForm<ILoginAndRegister>({
    resolver: yupResolver(LoginValidation)
  })

  const onSubmit: SubmitHandler<ILoginAndRegister> = async ({password, email}) => {
    if (isLogin) {
    } else {
      
    }
  }

  return (
    <FormProvider {...methods}>
      <form className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
            onSubmit={methods.handleSubmit(onSubmit)}>
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <InputField name='email' placeholder='Email' type='email'/>
          <InputField name='password' placeholder='Password' type='password'/>
        </div>
        <button
          type="submit"
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
          onClick={() => setIsLogin(true)}
        >
          Sign In
        </button>
        <div className="text-[gray]">
          New to Netflix?{' '}
          <button
            type="submit"
            className="text-white hover:underline"
            onClick={() => setIsLogin(false)}
          >
            Sign up now
          </button>
        </div>
      </form>
    </FormProvider>
  );

});

export default LoginForm;