import React from 'react';
import Enzyme from 'enzyme';

Enzyme.configure({adapter: new Adapter()});

import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ResetPasswordCard} from "../../components/auth/ResetPasswordCard";
import {ErrorAlert} from "../../components/ErrorAlert";

const setUp = (newPassword = '', newPasswordConf = '', oldPassword = '') => {
  const props = {
    onSubmit: () => {
    },
    onPasswordChange: () => {
    },
    newPassword,
    newPasswordConf,
    oldPassword
  };
  return shallow(<ResetPasswordCard {...props}/>)
};

describe('Test Reset Password Card', () => {
  it('assert h4 text is Password Reset', () => {
    const wrapper = setUp();
    expect(wrapper.find('h4').text()).toEqual('Password Reset')
  });

  it('assert error alert message when passwords length are less than the minimum length', () => {
    const wrapper = setUp();
    expect(wrapper.find(ErrorAlert).props().message).toEqual('Password must be a minimum of 5 characters')
  });

  it('assert new passwords do not match', () => {
    const wrapper = setUp('123456', '1234567');
    expect(wrapper.find(ErrorAlert).at(1).props().message).toEqual('Passwords do not match')
  });

  it('old password input field', () => {
    const wrapper = setUp();
    let input = wrapper.find('input');
    expect(input.at(0).props().type).toEqual('password');
    expect(input.at(0).props().className).toEqual('form-control');
    expect(input.at(0).props().placeholder).toEqual('Password');
    expect(input.at(0).props().name).toEqual('oldPassword');
    expect(input.at(0).props().required).toEqual(true);
    expect(input.at(0).simulate('change', {target: '123456'}))
  });

  it('new password input field', () => {
    const wrapper = setUp();
    let input = wrapper.find('input');
    expect(input.at(1).props().type).toEqual('password');
    expect(input.at(1).props().className).toEqual('form-control');
    expect(input.at(1).props().placeholder).toEqual('Password');
    expect(input.at(1).props().name).toEqual('newPassword');
    expect(input.at(1).props().required).toEqual(true);
    expect(input.at(1).simulate('change', {target: '1234567'}))
  });

  it('new password confirmation input field', () => {
    const wrapper = setUp();
    let input = wrapper.find('input');
    expect(input.at(2).props().type).toEqual('password');
    expect(input.at(2).props().className).toEqual('form-control');
    expect(input.at(2).props().placeholder).toEqual('Password');
    expect(input.at(2).props().name).toEqual('newPasswordConfirmation');
    expect(input.at(2).props().required).toEqual(true);
    expect(input.at(2).simulate('change', {target: '1234567'}))
  });

  it('submit button', () => {
    const wrapper = setUp();
    expect(wrapper.find('.btn.btn-primary').text()).toEqual('Reset Password')
  });
});