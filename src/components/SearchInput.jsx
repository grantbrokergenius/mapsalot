import React from 'react';
import PropTypes from 'prop-types';

function SearchInput({ onChange, label, value, delay }) {


  const [newValue, setNewValue] = useState(value);

  const [timer, setTimer] = useState(null);

  const handleChangeEvent = (e) => {
    setNewValue(e.target.value);
    if (timer) { clearInterval(timer); }
    setTimer(setTimeout(() => onChange(e), delay));
  }

  return (<TextField
            style={{ flexFlow: '0 1 auto' }}
            label={label}
            value={newValue}
            onChange={handleChangeEvent}
            margin="normal"
          />)

}

SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
}

export default SearchInput;
