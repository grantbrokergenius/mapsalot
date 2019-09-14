import React from 'react';
import { mount } from 'enzyme';
import Event from '../../src/components/Event';

describe('event', () => {
  test('error renders', () => {
    const wrapper = mount(<Event
      setSelected={() => {}}
      activeEventId={20}
      bg_event_id={12}
      event_name="Bon Jovi"
      venue_name="Red Rocks"
      event_date={`${new Date().getTime()}`}
    />); // mount/render/shallow when applicable
    expect(wrapper).toIncludeText('Bon Jovi');
  });
});
