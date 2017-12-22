import React from 'react';
import Enzyme from 'enzyme';

Enzyme.configure({adapter: new Adapter()});

import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BucketSearchForm} from "../../components/bucket/BucketSearchForm";

const setUp = searching => {
  const props = {
    onSubmit: () => {
    },
    onChange: () => {
    },
    searching: searching,
  };
  return shallow(<BucketSearchForm {...props}/>)
};

describe('Test Bucket Search Form', () => {
  it('first input element placeholder text is Search', () => {
    const wrapper = setUp(false);
    expect(wrapper.find('input').at(0).props().placeholder).toEqual('Search')
  });

  it('simulate first input element onChange', () => {
    const wrapper = setUp(false);
    expect(wrapper.find('input').at(0).simulate('change'))
  });

  it('assert submit input element text is Search when searching is false', () => {
    const wrapper = setUp(false);
    expect(wrapper.find('input').at(1).props().value).toEqual('Search')
  });

  it('assert submit input element text is Searching when searching is true', () => {
    const wrapper = setUp(true);
    expect(wrapper.find('input').at(1).props().value).toEqual('Searching')
  });
});