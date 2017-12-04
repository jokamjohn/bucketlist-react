import React from 'react';
import Enzyme from 'enzyme';

Enzyme.configure({adapter: new Adapter()});

import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BucketCard} from "../components/bucket/BucketCard";

const setUp = (editing, updating, deleting) => {
  const props = {
    onChange: () => {
    },
    onSave: () => {
    },
    onEditing: () => {
    },
    onDelete: () => {
    },
    onCancel: () => {
    },
    name: 'bucket',
    isEditing: editing,
    updating: updating,
    deleting: deleting,
    id: 1,
  };
  return shallow(<BucketCard {...props}/>)
};

describe('Test Bucket Card component', () => {
  it('card-body input element value is bucket', () => {
    const wrapper = setUp(true, false, false);
    expect(wrapper.find('input').props().value).toEqual('bucket')
  });

  it('simulate the input element onChange', () => {
    const wrapper = setUp(true, false, false);
    expect(wrapper.find('input').at(0).simulate('change'))
  });

  it('h4 contains Link component', () => {
    const wrapper = setUp(false, false, false);
    expect(wrapper.find('h4').text()).toEqual("<Link />")
  });

  it('first button text is Edit when editing and updating are false', () => {
    const wrapper = setUp(false, false, false);
    expect(wrapper.find('button').at(0).text()).toEqual('Edit')
  });

  it('first button text is Updating when editing is false and updating true', () => {
    const wrapper = setUp(false, true, false);
    expect(wrapper.find('button').at(0).text()).toEqual('Updating')
  });

  it('first button text is Update when editing is true', () => {
    const wrapper = setUp(true, false, false);
    expect(wrapper.find('button').at(0).text()).toEqual('Update')
  });

  it('second button text is Delete when editing and updating are false', () => {
    const wrapper = setUp(false, false, false);
    expect(wrapper.find('button').at(1).text()).toEqual('Delete')
  });

  it('second button text is Deleting when deleting is true, editing and updating are false', () => {
    const wrapper = setUp(false, false, true);
    expect(wrapper.find('button').at(1).text()).toEqual('Deleting')
  });

  it('second button text is Cancel when editing is true', () => {
    const wrapper = setUp(true, false, false);
    expect(wrapper.find('button').at(1).text()).toEqual('Cancel')
  });

  //TODO Test modifiedAt text when a new formatDate() is implemented.
});