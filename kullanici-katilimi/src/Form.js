import React, { useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    terms: false,
  });

  const [errorMessages, setErrorMessages] = useState({});

  const [users, setUsers] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Lütfen isim giriniz'),
        email: Yup.string().email('Geçersiz email').required('Lütfen email giriniz'),
        password: Yup.string().min(6, 'Şifre en az 6 karakter olmalı').required('Lütfen şifre giriniz'),
        terms: Yup.boolean().oneOf([true], 'Kullanım şartlarını kabul etmelisiniz'),
      });

      await schema.validate(formData, { abortEarly: false });
      setErrorMessages({});

      const response = await axios.post('https://reqres.in/api/users', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setUsers((prevUsers) => [...prevUsers, response.data]);
      setFormData({ name: '', email: '', password: '', terms: false });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = {};
        err.inner.forEach((e) => {
          errors[e.path] = e.message;
        });
        setErrorMessages(errors);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name">İsim:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          {errorMessages.name && <div>{errorMessages.name}</div>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          {errorMessages.email && <div>{errorMessages.email}</div>}
        </div>
        <div>
          <label htmlFor="password">Şifre:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          {errorMessages.password && <div>{errorMessages.password}</div>}
        </div>
        <div>
          <label htmlFor="terms">
            <input type="checkbox" id="terms" name="terms" checked={formData.terms} onChange={(e) => setFormData({ ...formData, terms: e.target.checked })} />
            Kullanım Şartları
          </label>
          {errorMessages.terms && <div>{errorMessages.terms}</div>}
        </div>
        <button type="submit">Gönder</button>
      </form>

      <h2>Kullanıcılar</h2>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
};

export default Form;
