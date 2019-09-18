import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

function SearchInput({
  delayedChange, label, value, delay,
}) {
  const [timer, setTimer] = React.useState(null);
  const [val, setVal] = React.useState(value);

  const handleChangeEvent = (e) => {
    const v = e.target.value;
    clearTimeout(timer);
    setTimer(setTimeout(() => delayedChange(v), delay));
    setVal(v);
  };
  useEffect(() => {
    setVal(value);
  }, [value]);
  return (
    <TextField
      style={{ flexFlow: '0 1 auto' }}
      label={label}
      value={val}
      onChange={handleChangeEvent}
      margin="normal"
    />
  );
}

SearchInput.propTypes = {
  delayedChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  delay: PropTypes.number,
};

SearchInput.defaultProps = {
  value: '',
  delay: 1000,
};
export default SearchInput;
