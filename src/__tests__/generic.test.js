import React from 'react';
import Enzyme from 'enzyme';

Enzyme.configure({adapter: new Adapter()});

import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ErrorAlert} from "../components/ErrorAlert";

test('Test Error Alert Component', () => {
  const wrapper = shallow(<ErrorAlert message="This is an error alert"/>);
  const div = wrapper.find('div');
  expect(div.text()).toEqual("This is an error alert");
  expect(div.props().className).toEqual("alert alert-warning");
  expect(div.props().role).toEqual('alert')
});

