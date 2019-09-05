import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

function SearchInput({
  onChange, label, value,
}) {
  const handleChangeEvent = (e) => {
    const val = e.target.value;
    onChange(val);
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
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};

SearchInput.defaultProps = {
  value: '',
};

export default SearchInput;
