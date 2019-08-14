import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';


function StubhubEvent({ }) {
  return (<li>Hi</li>);
}

export default function Stubhub({event, venue, updateSearchEnabled, toggleUpdateSearchEnabled, updateSearch}) {


  const handleChange = () => () => {};

  return (
    <>
      <FormControlLabel
        control={
          <Switch checked={updateSearchEnabled} onChange={toggleUpdateSearchEnabled} value="updateSearchEnabled" />
        }
        label="Update search when clicking events"
      />
      <TextField
        label="Event Name"
        value={event}
        onChange={handleChange('event')}
        margin="normal"
      />
      <TextField
        label="Venue"
        value={venue}
        onChange={handleChange('venue')}
        margin="normal"
      />
    </>
  );
}
