import React from 'react';
import Enzyme from 'enzyme';

Enzyme.configure({adapter: new Adapter()});

import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Navbar from "../components/Navbar";
import {NavLink} from "react-router-dom";

const setUp = (isAuthenticated = false) => {
  const props = {
    isAuthenticated,
  };
  return shallow(<Navbar {...props}/>)
};

describe('Tests for the Navbar', () => {
  test('Home nav link ', () => {
    const wrapper = setUp();
    const navLink = wrapper.find(NavLink).at(0);
    expect(navLink.props().to).toEqual("/");
    expect(navLink.props().className).toEqual("navbar-brand");
  });

  test('when is authenticated is false', () => {
    const wrapper = setUp();
    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('ul').length).toEqual(1);
    expect(wrapper.find('li').length).toEqual(3);
    expect(wrapper.find(NavLink).length).toEqual(4);
    expect(wrapper.find(NavLink).at(1).props().to).toEqual("/");
    expect(wrapper.find(NavLink).at(2).props().to).toEqual("/login");
    expect(wrapper.find(NavLink).at(3).props().to).toEqual("/signup");
  });

  test('when is authenticated is false', () => {
    const wrapper = setUp(true);
    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('ul').length).toEqual(1);
    expect(wrapper.find('li').length).toEqual(4);
    expect(wrapper.find(NavLink).length).toEqual(5);
    expect(wrapper.find(NavLink).at(1).props().to).toEqual("/");
    expect(wrapper.find(NavLink).at(2).props().to).toEqual("/buckets");
    expect(wrapper.find(NavLink).at(3).props().to).toEqual("/auth/password/reset");
    expect(wrapper.find(NavLink).at(4).props().to).toEqual("/logout");
  });

  test('toggle button' , () => {
    const wrapper = setUp();
    const button = wrapper.find('button');
    const props = button.props();
    expect(props.className).toEqual("navbar-toggler");
    expect(props.type).toEqual("button");
  });

  test('span', () => {
    const wrapper = setUp();
    expect(wrapper.find('span').props().className).toEqual("navbar-toggler-icon")
  });
});