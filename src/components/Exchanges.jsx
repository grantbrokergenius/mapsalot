import React from 'react';
import {
  Select, MenuItem, FormControl, InputLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const exchanges = [
  { id: 1, exchange: 'StubHub' },
  { id: 2, exchange: 'TicketMaster' },
  { id: 3, exchange: 'VividSeats' },
];

const useStyles = makeStyles(() => ({

  root: {
  },
  exchangeSelect: {
    color: 'rgb(255,255,255)',
  },
  focused: {},
  inputLabel: {
    color: '#ffffff',
    opacity: 0.8,
    '&$focused': {
      opacity: 1,
      color: '#ff0000',
    },
  },
}));

function Exchanges() {
  const classes = useStyles();
  const [activeExchange, setActiveExchange] = React.useState(exchanges[0] && exchanges[0].id);

  function handleChange(event) {
    setActiveExchange(event.target.value);
  }
  return (
    <FormControl className={classes.root}>
      <InputLabel className={classes.inputLabel} htmlFor="age-simple">Exchange</InputLabel>
      <Select
        className={classes.exchangeSelect}
        value={activeExchange}
        onChange={handleChange}
        inputProps={{
          name: 'exchange',
          id: 'exchange',
        }}
      >
        {exchanges.map((
          { id, exchange },
        ) => (
          <MenuItem key={id} value={id}>{exchange}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Exchanges;
