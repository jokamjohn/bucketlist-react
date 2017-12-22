import React from 'react';
import Enzyme from 'enzyme';

Enzyme.configure({adapter: new Adapter()});

import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {AddItemButton} from "../../components/items/AddItemButton";

describe('Test add item button', () => {
  it('should have Add BucketItem as button text', () => {
      const wrapper = shallow(<AddItemButton/>);
    expect(wrapper.find('button').text()).toEqual('Add BucketItem')
  });
});