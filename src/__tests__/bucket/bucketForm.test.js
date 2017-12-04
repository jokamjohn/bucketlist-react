import React from 'react';
import Enzyme from 'enzyme';

Enzyme.configure({adapter: new Adapter()});

import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BucketForm} from "../../components/bucket/BucketForm";

const setup = (saving) => {
  const props = {
    onSubmit: () => {
    },
    onChange: () => {
    },
    saving: saving
  };
  return shallow(<BucketForm {...props}/>);
};

describe("Test BucketForm component that creates a Bucket", () => {
  it('renders one form', () => {
    const wrapper = setup(false);
    expect(wrapper.find('form').length).toBe(1)
  });

  it('renders two input elements', () => {
    const wrapper = setup(false);
    expect(wrapper.find('input').length).toBe(2)
  });

  it('submit input renders Create Bucket text', () => {
    const wrapper = setup(false);
    expect(wrapper.find('input').at(1).props().value).toEqual("Create Bucket")
  });

  it('submit input renders Saving Bucket text when saving is true', () => {
    const wrapper = setup(true);
    expect(wrapper.find('input').at(1).props().value).toEqual("Saving Bucket")
  });

  it('first input element has a placeholder with Travel text', () => {
    const wrapper = setup(false);
    expect(wrapper.find('input').at(0).props().placeholder).toEqual("Travel")
  });

  it('simulate first input onChange', () => {
    const wrapper = setup(false);
    expect(wrapper.find('input').at(0).simulate('change'));
  });

});
