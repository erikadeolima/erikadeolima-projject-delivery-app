import React, { useState } from 'react';
import { requestPost } from '../../API/requests';
import AdminBtn from '../../components/Header/AdminBtn';
// import Register from './Register';
// import { getFilteredUsers } from '../../../back-end/src/api/services/admin.service';
import Header from '../../components/Header/Header';

export default function AdminManage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [error, setError] = useState(false);

  const rolesList = ['administrator', 'seller', 'customer'];
  // const users = getFilteredUsers();
  // console.log(users);

  const handleRegister = async () => {
    requestPost('/admin/manage', { email, password, name, role })
      .then((data) => console.log(data))
      .catch(() => setError(true));
  };

  const validationInputs = () => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const bool = !(password.length >= +'6' && emailRegex
      .test(email) && name.length >= +'12');
    return bool;
  };
  return (
    <section>
      <Header
        FirstNavigationLink={ AdminBtn }
        SecondNavegationLink={ null }
        userDataTestId="customer_products__element-navbar-user-full-name"
      />
      <h4>Cadastrar novo usuário</h4>
      <form>
        <label htmlFor="name">
          Nome
          <input
            onChange={ (e) => setName(e.target.value) }
            value={ name }
            type="text"
            data-testid="admin_manage__input-name"
            placeholder=""
            id="name"
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            onChange={ (e) => setEmail(e.target.value) }
            value={ email }
            type="text"
            data-testid="admin_manage__input-email"
            placeholder="email@trybeer.com.br"
            id="email"
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            onChange={ (e) => setPassword(e.target.value) }
            value={ password }
            type="password"
            data-testid="admin_manage__input-password"
            placeholder="*****"
            id="password"
          />
        </label>
        <select
          data-testid="admin_manage__select-role"
          name="role"
          id="role"
          value={ role }
          onChange={ (e) => setRole(e.target.value) }
        >
          {rolesList
            .map((elem) => (
              <option
                key={ elem }
                value={ elem }
                data-testid="admin_manage__select-role-options"
              >
                {elem}
              </option>))}
        </select>
        <button
          onClick={ () => handleRegister() }
          disabled={ validationInputs() }
          type="button"
          data-testid="admin_manage__button-register"
        >
          Cadastrar
        </button>
      </form>
      { error && (
        <p data-testid="admin_manage__element-invalid-register">
          O nome ou o email já existem
        </p>) }
      <h2> Lista de Usuários </h2>
      <table />
    </section>
  );
}