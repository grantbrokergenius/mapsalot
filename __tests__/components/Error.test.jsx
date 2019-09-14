import React from 'react';
import { mount } from 'enzyme';
import Error from '../../src/components/Error';

describe('error', () => {
  test('renders', () => {
    const wrapper = mount(<Error />); // mount/render/shallow when applicable
    expect(wrapper).toIncludeText('wrong');
  });
});
