'use client';

import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormik } from 'formik';

import React from 'react'
import { validationSchema } from './validationSchema';
import useLogin from '@/hooks/api/auth/useLogin';

const Login = () => {
    const { login } = useLogin();
    const { values, errors, touched, handleChange, handleBlur,  handleSubmit} = 
    useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema,
        onSubmit: (values) => {
          login(values);
        },
      });
  return (
    <main className="container mx-auto my-10 px-4">
      <div className="flex justify-center">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-primary">
              Login Event War
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                {/* EMAIL */}
                <FormInput
                                  name="email"
                                  error={errors.email}
                                  isError={!!touched.email && !!errors.email}
                                  handleBlur={handleBlur}
                                  handleChange={handleChange}
                                  placeholder="Email"
                                  type="email"
                                  value={values.email} 
                                  label={'Email'}                
                />
                {/* EMAIL END */}

                {/* PASSWORD */}
                <FormInput
                                  name="password"
                                  error={errors.password}
                                  isError={!!touched.password && !!errors.password}
                                  handleBlur={handleBlur}
                                  handleChange={handleChange}
                                  placeholder="Password"
                                  type="password"
                                  value={values.password} 
                                  label={'Password'}                
                />
                {/* PASSWORD END */}
              </div>
              <Button className="mt-6 w-full bg-slate-800 text-white">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default Login;