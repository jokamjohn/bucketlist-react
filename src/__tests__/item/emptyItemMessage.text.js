import React from 'react';
import Enzyme from 'enzyme';

Enzyme.configure({adapter: new Adapter()});

import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {EmptyItemsMessage} from "../../components/items/EmptyBucketMessage";

describe('Test Empty item message component', () => {
  it('should show the right text when there are no items', () => {
    const wrapper = shallow(<EmptyItemsMessage/>);
    expect(wrapper.find('p').text()).toEqual('This Bucket has no items, consider adding items.')
  });
});