import React from 'react';
import NormalPage from '@components/NormalPage';
import { NoticeBar, Modal } from 'antd-mobile';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { bindActionCreators } from 'redux';
import { IGlobalReduceState } from '@redux/reducers/global';
import { requestLoginRegister } from '@redux/actions/user';
import { AppState } from '@redux/reducers';
import { RouteComponentProps } from 'react-router-dom';
import classnames from 'classnames';
import { REG_PHONE, REG_PASSWORD } from '@regExps/index';

type IProps = AppState &
  RouteComponentProps &
  IGlobalReduceState & {
    requestLoginRegister: typeof requestLoginRegister;
  };

type IState = {
  /** 密码登录信息 */
  passwordLogin: {
    phoneNo: string;
    password: string;
  };
  /** 密码是否处于明文状态 */
  lookPassword: boolean;
};

class Login extends React.Component<IProps, IState> {
  readonly state = {
    /** 密码登录信息 */
    passwordLogin: {
      phoneNo: '',
      password: ''
    },
    /** 密码是否处于明文状态 */
    lookPassword: false
  };
  @autobind
  private loginRegister() {
    const { passwordLogin } = this.state;

    if (!passwordLogin.phoneNo || !passwordLogin.password) {
      Modal.alert('哦吼~', '老铁，信息没输全~');
    } else if (!REG_PHONE.test(passwordLogin.phoneNo)) {
      Modal.alert('哦吼~', '这是手机号？');
    } else if (!REG_PASSWORD.test(passwordLogin.password)) {
      Modal.alert(
        '密码规则',
        '至少8-16个字符，至少1个大写字母，1个小写字母和1个数字'
      );
    } else {
      this.props.requestLoginRegister(passwordLogin, () => {
        this.props.history.goBack();
      });
    }
  }

  render() {
    const { passwordLogin, lookPassword } = this.state;

    console.log(passwordLogin);
    return (
      <NormalPage headerText="密码登录">
        <div className="Login-Page-Wrapper">
          {/* <div className="login-type-title">密码登录</div> */}
          <NoticeBar marqueeProps={{ loop: true }}>
            老夫聊发少年狂，左牵黄，右擎苍，锦帽貂裘，千骑卷平冈。为报倾城随太守，亲射虎，看孙郎。酒酣胸胆尚开张，鬓微霜，又何妨？持节云中，何日遣冯唐？会挽雕弓如满月，西北望，射天狼。
          </NoticeBar>

          <div className="login-form">
            <div className="form-item">
              <div className="form-item-left">
                <i className="form-item-left-icon form-item-left-icon-phone"></i>
              </div>
              <div className="form-item-input">
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
              <div className="form-item-left">
                <i className="form-item-left-icon form-item-left-icon-password"></i>
              </div>
              <div className="form-item-input">
                <input
                  value={passwordLogin.password}
                  placeholder="请输入密码"
                  type={lookPassword ? 'text' : 'password'}
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
              {passwordLogin.password.length > 5 && (
                <div
                  className="form-item-right"
                  onClick={() => this.setState({ lookPassword: !lookPassword })}
                >
                  <i
                    className={`form-item-right-icon form-item-right-icon-${
                      lookPassword ? 'open' : 'close'
                    }`}
                  ></i>
                </div>
              )}
            </div>
          </div>
          <div
            className={classnames('login-btn', {
              'login-btn-canclick':
                passwordLogin.password && passwordLogin.phoneNo
            })}
            onClick={this.loginRegister}
          >
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
