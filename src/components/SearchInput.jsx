import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

function SearchInput({
  onChange, delayedChange, label, value, delay,
}) {
  const [timer, setTimer] = React.useState(null);

  const handleChangeEvent = (e) => {
    const v = e.target.value;
    clearTimeout(timer);
    setTimer(setTimeout(() => delayedChange(v), delay));
    onChange(v);
  };

  return (
    <TextField
      style={{ flexFlow: '0 1 auto' }}
      label={label}
      value={value}
      onChange={handleChangeEvent}
      margin="normal"
    />
  );
}

SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
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
