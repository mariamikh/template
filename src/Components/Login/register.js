import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import AuthService from '../../services/auth.service';
import UserRole from '../../Config/role';
import styles from './login.module.css';

export default function Register() {
  const [isAdmin, setIsAdmin] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState();
  const history = useHistory();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== password2) setError("Password doesn't match");
    else {
      AuthService.register({
        userName: userName,
        password: password,
        role: isAdmin ? UserRole.Admin.name : UserRole.Regular.name,
        email: email,
      })
        .then((value) => {
          history.push('/login');
        })
        .catch((e) => {
          setError(e.message);
        });
    }
  };

  return (
    <div className="container register">
      <div className={{ width: 200 }}>
        <h5> Register User</h5>
        <form>
          <div className={styles.loginForm}>
            <div className={styles.loginFormItem}>
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>{' '}
            <div className={styles.loginFormItem}>
              <label htmlFor="email">email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.loginFormItem}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.loginFormItem}>
              <label htmlFor="password2">Confirm Password</label>
              <input
                type="password"
                id="password2"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>
            <div className={styles.loginFormItem}>
              <div class="form-check">
                <input
                  id="role"
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
                <label class="form-check-label" for="role">
                  I'm Admin
                </label>
              </div>
            </div>
          </div>

          {error ? <Alert variant="danger">{error}</Alert> : ''}

          <button
            type="submit"
            className="btn btn-secondary "
            onClick={handleRegister}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
