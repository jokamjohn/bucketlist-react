import React from 'react';
import Enzyme from 'enzyme';

Enzyme.configure({adapter: new Adapter()});

import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {LoginCard} from "../../components/auth/LoginCard";
import {DEFAULT_LOADER_COLOR} from "../../utilities/Constants";

const setUp = (password, loading) => {
  const props = {
    loading,
    password,
    onSubmit: () => {
    },
    onChange: () => {
    },
  };
  return shallow(<LoginCard {...props}/>)
};

describe('Test Login Card', () => {
  it('loader component is rendered', () => {
    const wrapper = setUp('123456', true);
    expect(wrapper.find('Loader').props().color).toEqual(DEFAULT_LOADER_COLOR)
  });

  it('assert h4 has text Login', () => {
    const wrapper = setUp('123', false);
    expect(wrapper.find('h4').text()).toEqual('Login')
  });

  it('email input', () => {
    const wrapper = setUp('123', false);
    const input = wrapper.find('input').at(0);
    expect(input.props().name).toEqual('email');
    expect(input.props().type).toEqual('email');
    expect(input.props().required).toEqual(true);
    expect(input.simulate('change'));
  });

  it('password input', () => {
    const wrapper = setUp('123', false);
    const input = wrapper.find('input').at(1);
    expect(input.props().name).toEqual('password');
    expect(input.props().type).toEqual('password');
    expect(input.props().required).toEqual(true);
    expect(input.simulate('change'));
  });

  it('submit button', () => {
    const wrapper = setUp('123', false);
    const input = wrapper.find('input').at(2);
    expect(input.props().type).toEqual('submit');
    expect(input.props().value).toEqual('Log In');
  });
});
