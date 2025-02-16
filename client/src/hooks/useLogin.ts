import { useState } from 'react';
import axios from 'axios';

interface LoginResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

interface LoginError {
    message: string;
}

const useLogin = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<LoginError | null>(null);
    const [data, setData] = useState<LoginResponse | null>(null);

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post<LoginResponse>('/api/login', { email, password });
            setData(response.data);
        } catch (err) {
            setError({ message: 'An error occurred' });
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error, data };
};
const useSignup = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<LoginError | null>(null);
    const [data, setData] = useState<LoginResponse | null>(null);

    const signup = async (name: string, email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post<LoginResponse>('/api/signup', { name, email, password });
            setData(response.data);
        } catch (err) {
            setError({ message: 'An error occurred' });
        } finally {
            setLoading(false);
        }
    };

    return { signup, loading, error, data };
};
export default useSignup;