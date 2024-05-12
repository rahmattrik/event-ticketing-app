'use client';
import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormik } from 'formik';
import React from 'react';
import { validationSchema } from './validationSchema';
import useRegister from '@/hooks/api/auth/useRegister';

const Register: React.FC = () => {
  const { register } = useRegister();
  const { values, errors, touched, handleChange, handleBlur,  handleSubmit} = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      referralCode: '',
    },
    validationSchema,
    onSubmit: (values) => {
      register(values)
    },
  });

  return (
    <main className="container mx-auto my-10 px-4">
      <div className="flex justify-center">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-primary">
              Sign Up Event War
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                {/* FIRST NAME */}
                <FormInput
                                  name="firstName"
                                  error={errors.firstName}
                                  isError={!!touched.firstName && !!errors.firstName}
                                  handleBlur={handleBlur}
                                  handleChange={handleChange}
                                  placeholder="First Name"
                                  type="name"
                                  value={values.firstName} 
                                  label={'First Name'}                
                />
                {/* FIRST NAME END */}

                {/* LAST NAME */}
                <FormInput
                                  name="lastName"
                                  error={errors.lastName}
                                  isError={!!touched.lastName && !!errors.lastName}
                                  handleBlur={handleBlur}
                                  handleChange={handleChange}
                                  placeholder="Last Name"
                                  type="name"
                                  value={values.lastName} 
                                  label={'Last Name'}                
                />
                {/* LAST NAME END */}

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

                {/* REFERRAL */}
                <FormInput
                                  name="referralCode"
                                  error={errors.referralCode}
                                  isError={!!touched.referralCode && !!errors.referralCode}
                                  handleBlur={handleBlur}
                                  handleChange={handleChange}
                                  placeholder="Referral Code"
                                  type="text"
                                  value={values.referralCode} 
                                  label={'Referral Code'}                
                />
                {/* REFERRAL END */}


              </div>
              <Button className="mt-6 w-full bg-slate-800 text-white">Register</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Register;
