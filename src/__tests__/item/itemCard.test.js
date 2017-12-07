import React from 'react';
import Enzyme from 'enzyme';

Enzyme.configure({adapter: new Adapter()});

import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ItemCard} from "../../components/items/ItemCard";

const setUp = (isEditing, updating, deleting) => {
  const props = {
    onChange: () => {
    },
    onUpdate: () => {
    },
    onEditing: () => {
    },
    onDelete: () => {
    },
    onCancel: () => {
    },
    modifiedAt: '',
    name: 'item',
    description: 'description',
    isEditing: isEditing,
    updating: updating,
    deleting: deleting,
  };
  return shallow(<ItemCard {...props}/>);
};

describe('Test for Item Card component', () => {
  it('h4 value text is item', () => {
    const wrapper = setUp(false, false, false);
    expect(wrapper.find('h4').text()).toEqual('item')
  });

  it('input has a value of item when editing is true', () => {
    const wrapper = setUp(true, false, false);
    expect(wrapper.find('input').props().value).toEqual('item')
  });

  it('input has a name of name', () => {
    const wrapper = setUp(true, false, false);
    expect(wrapper.find('input').props().name).toEqual('name')
  });

  it('simulate the onChange on the input', () => {
    const wrapper = setUp(true, false, false);
    expect(wrapper.find('input').simulate('change'))
  });

  it('p value text is description', () => {
    const wrapper = setUp(false, false, false);
    expect(wrapper.find('p').text()).toEqual('description')
  });

  it('text area has a name of description ', () => {
    const wrapper = setUp(true, false, false);
    expect(wrapper.find('textarea').props().name).toEqual('description')
  });

  it('text area has a value of description ', () => {
    const wrapper = setUp(true, false, false);
    expect(wrapper.find('textarea').props().value).toEqual('description')
  });

  it('text area has 5 rows', () => {
    const wrapper = setUp(true, false, false);
    expect(wrapper.find('textarea').props().rows).toEqual('5')
  });

  it('simulate onChange on the text area', () => {
    const wrapper = setUp(true, false, false);
    expect(wrapper.find('textarea').simulate('change'))
  });

  it('edit button has text of Edit when updating and isEditing are false', () => {
    const wrapper = setUp(false, false, false);
    expect(wrapper.find('button').at(0).text()).toEqual('Edit')
  });

  it('edit button has text of Editing when updating is true and isEditing is false', () => {
    const wrapper = setUp(false, true, false);
    expect(wrapper.find('button').at(0).text()).toEqual('Updating')
  });

  it('delete button has text of Delete when updating and isEditing are false', () => {
    const wrapper = setUp(false, false, false);
    expect(wrapper.find('button').at(1).text()).toEqual('Delete')
  });

  it('delete button has text of Deleting when updating is true and isEditing is false', () => {
    const wrapper = setUp(false, false, true);
    expect(wrapper.find('button').at(1).text()).toEqual('Deleting')
  });

  it('update button has Update text', () => {
    const wrapper = setUp(true, false, false);
    expect(wrapper.find('button').at(0).text()).toEqual('Update')
  });

  it('cancel button has Cancel text', () => {
    const wrapper = setUp(true, false, false);
    expect(wrapper.find('button').at(1).text()).toEqual('Cancel')
  });
});