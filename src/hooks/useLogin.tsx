import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormInfoType } from '../types';

export function useLogin() {
  const initialValues = {
    email: '',
    password: '',
  };

  const navigate = useNavigate();

  const [formInfo, setFormInfo] = useState<FormInfoType>(initialValues);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFormInfo({
      ...formInfo,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email: formInfo.email }));
    navigate('/meals');
  };

  const loginVerify = () => {
    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3,4}$/;
    if (formInfo.email && formInfo.password.length > 6) {
      return (regex.test(formInfo.email));
    }
  };

  return {
    formInfo,
    handleChange,
    handleSubmit,
    loginVerify,
  };
}
