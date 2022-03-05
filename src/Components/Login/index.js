import React, { useState, useEffect } from 'react';
import { loginUser, useAuthState, useAuthDispatch } from '../../Context';
import { useHistory } from 'react-router-dom';
import Error from '../Error/error';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, errorMessage } = useAuthState();
  const dispatch = useAuthDispatch();
  const history = useHistory();

  function openUserRegistration() {
    history.push('/register');
  }

  const handleLogin = (e) => {
    e.preventDefault();

    loginUser(dispatch, { username: email, password: password }).then(
      (value) => {
        history.push('/restaurant');
      }
    );
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
                <div className="form-group">
                  <button
                    type="submit"
                    className="form-control btn btn-primary rounded submit px-3"
                    onClick={handleLogin}
                    disabled={loading}
                  >
                    Login
                  </button>
                </div>
                <div className="form-group d-md-flex">
                  <div className="w-50 text-md-right">
                    {errorMessage ? <Error message={errorMessage} /> : null}
                  </div>
                  <div className="w-100 text-md-right">
                    <a href="#" onClick={() => openUserRegistration()}>
                      Sign Up
                    </a>
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

export default Login;
