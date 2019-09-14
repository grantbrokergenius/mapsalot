import React from 'react';
import { mount } from 'enzyme';
import Error from '../../src/components/Error';

test('error renders', () => {
  const wrapper = mount(<Error />); // mount/render/shallow when applicable
  expect(wrapper).toIncludeText('wrong');
});
