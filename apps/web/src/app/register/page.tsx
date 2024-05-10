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
  const formik = useFormik({
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
            <form onSubmit={formik.handleSubmit}>
              <div className="grid w-full items-center gap-4">
                {/* FIRST NAME */}
                <FormInput
                                  name="firstName"
                                  error={formik.errors.firstName}
                                  isError={!!formik.touched.firstName && !!formik.errors.firstName}
                                  handleBlur={formik.handleBlur}
                                  handleChange={formik.handleChange}
                                  placeholder="First Name"
                                  type="name"
                                  value={formik.values.firstName} 
                                  label={'First Name'}                
                />
                {/* FIRST NAME END */}

                {/* LAST NAME */}
                <FormInput
                                  name="lastName"
                                  error={formik.errors.lastName}
                                  isError={!!formik.touched.lastName && !!formik.errors.lastName}
                                  handleBlur={formik.handleBlur}
                                  handleChange={formik.handleChange}
                                  placeholder="Last Name"
                                  type="name"
                                  value={formik.values.lastName} 
                                  label={'Last Name'}                
                />
                {/* LAST NAME END */}

                {/* EMAIL */}
                <FormInput
                                  name="email"
                                  error={formik.errors.email}
                                  isError={!!formik.touched.email && !!formik.errors.email}
                                  handleBlur={formik.handleBlur}
                                  handleChange={formik.handleChange}
                                  placeholder="Email"
                                  type="email"
                                  value={formik.values.email} 
                                  label={'Email'}                
                />
                {/* EMAIL END */}

                {/* PASSWORD */}
                <FormInput
                                  name="password"
                                  error={formik.errors.password}
                                  isError={!!formik.touched.password && !!formik.errors.password}
                                  handleBlur={formik.handleBlur}
                                  handleChange={formik.handleChange}
                                  placeholder="Password"
                                  type="password"
                                  value={formik.values.password} 
                                  label={'Password'}                
                />
                {/* PASSWORD END */}

                {/* REFERRAL */}
                <FormInput
                                  name="referralCode"
                                  error={formik.errors.referralCode}
                                  isError={!!formik.touched.referralCode && !!formik.errors.referralCode}
                                  handleBlur={formik.handleBlur}
                                  handleChange={formik.handleChange}
                                  placeholder="Referral Code"
                                  type="text"
                                  value={formik.values.referralCode} 
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
