import React from 'react';
import NormalPage from '@components/NormalPage';

type IState = {
  /** 密码登录信息 */
  passwordLogin: {
    phone: string;
    password: string;
  };
};
class Login extends React.Component<{}, IState> {
  readonly state = {
    /** 密码登录信息 */
    passwordLogin: {
      phone: '',
      password: ''
    }
  };
  render() {
    const { passwordLogin } = this.state;

    console.log(passwordLogin);
    return (
      <NormalPage>
        <div className="Login-Page-Wrapper">
          <div className="login-type-title">密码登录</div>

          <div className="login-form">
            <div className="form-item">
              <div className="form-item-left">账号</div>
              <div className="form-item-right">
                <input
                  value={passwordLogin.phone}
                  placeholder='请输入手机号'
                  onChange={({ target }) => {
                    this.setState({
                      passwordLogin: {
                        phone: target.value,
                        password: passwordLogin.password
                      }
                    });
                  }}
                ></input>
              </div>
            </div>

            <div className="form-item">
              <div className="form-item-left">密码</div>
              <div className="form-item-right">
                <input
                  value={passwordLogin.password}
                  placeholder='请输入密码'
                  type="password"
                  onChange={({ target }) => {
                    this.setState({
                      passwordLogin: {
                        phone: passwordLogin.phone,
                        password: target.value
                      }
                    });
                  }}
                ></input>
              </div>
            </div>
          </div>

          <div className="login-btn">
          登录 / 注册
          </div>
        </div>
      </NormalPage>
    );
  }
}

export default Login;
