import React from 'react';
import Enzyme from 'enzyme';

Enzyme.configure({adapter: new Adapter()});

import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Modal} from "../../components/items/Modal";

const setUp = saving => {
  const props = {
    onSubmit: () => {
    },
    onChange: () => {
    },
    saving: saving
  };
  return shallow(<Modal {...props}/>)
};

describe('Test Item creation Modal', () => {
  it('should assert that modal title is Add New Item', () => {
    const wrapper = setUp(false);
    expect(wrapper.find('h5').text()).toEqual('Add New Item')
  });

  it('should have one form', () => {
    const wrapper = setUp(false);
    expect(wrapper.find('form').length).toEqual(1)
  });

  it('input has a placeholder with text Item Name', () => {
    const wrapper = setUp(false);
    expect(wrapper.find('input').at(0).props().placeholder).toEqual('Item Name')
  });

  it('input has a name of name', () => {
    const wrapper = setUp(false);
    expect(wrapper.find('input').at(0).props().name).toEqual('name')
  });

  it('input field is required', () => {
    const wrapper = setUp(false);
    expect(wrapper.find('input').at(0).props().required).toBeTruthy()
  });

  it('simulate the onChange on the input', () => {
    const wrapper = setUp(false);
    expect(wrapper.find('input').at(0).simulate('change'))
  });

  it('text area has a name of description', () => {
    const wrapper = setUp(false);
    expect(wrapper.find('textarea').props().name).toEqual('description')
  });

  it('text area has a placeholder with text Item Description', () => {
    const wrapper = setUp(false);
    expect(wrapper.find('textarea').props().placeholder).toEqual('Item Description')
  });

  it('text area has 5 rows', () => {
    const wrapper = setUp(false);
    expect(wrapper.find('textarea').props().rows).toEqual('5')
  });

  it('simulate onChange on the text area', () => {
    const wrapper = setUp(false);
    expect(wrapper.find('textarea').simulate('change'))
  });

  it('submit button text is save when saving is false', () => {
    const wrapper = setUp(false);
    expect(wrapper.find('input').at(1).props().value).toEqual('Save')
  });

  it('submit button text is saving when saving is true', () => {
    const wrapper = setUp(true);
    expect(wrapper.find('input').at(1).props().value).toEqual('Saving')
  });
});