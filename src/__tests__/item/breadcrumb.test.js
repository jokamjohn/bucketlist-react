import React from 'react';
import Enzyme from 'enzyme';

Enzyme.configure({adapter: new Adapter()});

import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Breadcrumb from '../../components/items/Breadcrumb'


const setUp = () => {
  return shallow(<Breadcrumb/>);
};

describe('Test Items Breadcrumb', () => {
  it('first li text is Home', () => {
    const wrapper = setUp();
    expect(wrapper.find('li').at(0).text()).toEqual('Home')
  });

  it('second li text is Buckets', () => {
    const wrapper = setUp();
    expect(wrapper.find('li').at(1).text()).toEqual('Buckets')
  });

  it('third li text is BucketItems', () => {
    const wrapper = setUp();
    expect(wrapper.find('li').at(2).text()).toEqual('BucketItems')
  });

  it('assert that the home href is / ', () => {
    const wrapper = setUp();
    expect(wrapper.find('a').at(0).props().href).toEqual('/')
  });

  it('assert that the buckets href is /buckets ', () => {
    const wrapper = setUp();
    expect(wrapper.find('a').at(1).props().href).toEqual('/buckets')
  });
});