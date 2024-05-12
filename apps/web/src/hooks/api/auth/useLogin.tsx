'use client';

import { axiosInstance } from '@/lib/axios';
import { useAppDispatch } from '@/redux/hooks';
import { loginAction } from '@/redux/slice/userSlice';
import { User } from '@/types/user.type';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface LoginArgs extends Omit<User, 'id' | 'firstName' | 'lastName'> {
    password: string;
} 

interface LoginResponse {
    message: string,
    data: User,
    token: string,
}

const useLogin = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const login = async (payload: LoginArgs) => {
        try {
            const { data } = await axiosInstance.post<LoginResponse>(
                "/auth/login", 
                payload,
            );
            
            dispatch(loginAction(data.data));
            localStorage.setItem('token', data.token);
            router.replace('/');
        } catch (error) {
            //FIX ME: change alert to be toast
            if (error instanceof AxiosError) {
                alert(error.response?.data);
            }
        }
    }

  return { login };
}

export default useLogin;