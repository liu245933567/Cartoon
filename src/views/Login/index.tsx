import React from 'react';
import NormalPage from '@components/NormalPage';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { bindActionCreators } from 'redux';
import { IGlobalReduceState } from '@redux/reducers/global';
import { requestLoginRegister } from '@redux/actions/user';
import { AppState } from '@redux/reducers';

type IProps = AppState &
  IGlobalReduceState & {
    requestLoginRegister: typeof requestLoginRegister;
  };

type IState = {
  /** 密码登录信息 */
  passwordLogin: {
    phoneNo: string;
    password: string;
  };
};
class Login extends React.Component<IProps, IState> {
  readonly state = {
    /** 密码登录信息 */
    passwordLogin: {
      phoneNo: '',
      password: ''
    }
  };
  @autobind
  private loginRegister() {
    const { passwordLogin } = this.state;

    this.props.requestLoginRegister(passwordLogin);
  }

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
                  value={passwordLogin.phoneNo}
                  placeholder="请输入手机号"
                  onChange={({ target }) => {
                    this.setState({
                      passwordLogin: {
                        phoneNo: target.value,
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
                  placeholder="请输入密码"
                  type="password"
                  onChange={({ target }) => {
                    this.setState({
                      passwordLogin: {
                        phoneNo: passwordLogin.phoneNo,
                        password: target.value
                      }
                    });
                  }}
                ></input>
              </div>
            </div>
          </div>

          <div className="login-btn" onClick={this.loginRegister}>
            登录 / 注册
          </div>
        </div>
      </NormalPage>
    );
  }
}

export default connect(
  (state: AppState) => state.global,
  (dispatch) =>
    bindActionCreators(
      {
        requestLoginRegister
      },
      dispatch
    )
)(Login);
