import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthState, useAuthDispatch } from '../../Context';
import Error from '../Error/error';
import AuthService from '../../services/auth.service';
import UserRole from '../../Config/role';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Register() {
  const [isAdmin, setIsAdmin] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState();
  const { loading, errorMessage } = useAuthState();
  const history = useHistory();
  const dispatch = useAuthDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch({ type: 'REQUEST_LOGIN' });

    if (password !== password2) {
      // TODO: errorMessage is null! becasue of this using another variable error
      dispatch({ type: 'REGISTER_ERROR', error: "Password doesn't match" });

      setError("Password doesn't match");
    } else {
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
          dispatch({ type: 'REGISTER_ERROR', error: e.message });
          setError(e.message);
        });
    }
  };

  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5">
            <div className="login-wrap p-4 p-md-5">
              <div className="icon d-flex align-items-center justify-content-center">
                <FontAwesomeIcon icon={faUser} color="white" />
              </div>
              <h3 className="text-center mb-4">Sign In</h3>
              <form action="#" className="login-form">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control rounded-left"
                    placeholder="Username"
                    required
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control rounded-left"
                    placeholder="email"
                    required
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="form-group d-flex">
                  <input
                    type="password"
                    className="form-control rounded-left"
                    placeholder="Password"
                    required
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="form-group d-flex">
                  <input
                    type="password"
                    className="form-control rounded-left"
                    placeholder="Confirm Password"
                    required
                    id="password2"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="form-group d-flex pl-4">
                  <input
                    id="role"
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    disabled={loading}
                  />
                  I'm Admin
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="form-control btn btn-primary rounded submit px-3"
                    onClick={handleRegister}
                    disabled={loading}
                  >
                    Login
                  </button>
                </div>
                <div className="form-group d-md-flex">
                  <div className="w-50 text-md-right">
                    {error ? <Error message={error} /> : null}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
