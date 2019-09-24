import React from 'react';
import { mount } from 'enzyme';

import { useManualQuery } from 'graphql-hooks';
import Auth from '../../components/Auth';

jest.mock('graphql-hooks', () => ({
  useManualQuery: jest.fn(),
}));

describe('auth', () => {
  test('login', () => {
    it('should log in', () => {
      useManualQuery.mockImplementation(() => true);
      const wrapper = mount(<Auth activeSession={false}><div>hi</div></Auth>);
      expect(wrapper).toIncludeText('hi');
    });
  });
});
