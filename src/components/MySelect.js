import React from 'react';

import Select from 'react-select';
// import 'react-select/dist/react-select.css';

export default function MySelect(props) {
  const handleChange = (value) => {
    props.onChange(props.name, [value]);
  };

  const handleBlur = () => {
    props.onBlur(props.name, true);
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      <label htmlFor={props.name}>{props.label}</label>
      <Select
        id={props.name}
        options={props.options}
        onChange={handleChange}
        onBlur={handleBlur}
        value={props.value}
      />
      {!!props.error && props.touched && (
        <div style={{ color: 'red', marginTop: '.5rem' }}>{props.error}</div>
      )}
    </div>
  );
}
