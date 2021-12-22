import React from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import '../../node_modules/react-datepicker/dist/react-datepicker.css';

export const DatePickerField = (props) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  console.log('props : ' + JSON.stringify(props));
  return (
    <div style={{ margin: '1rem 0' }}>
      <DatePicker
        {...field}
        {...props}
        wrapperClassName="datePicker"
        dateFormat="dd/MM/yyyy"
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
      />
      {!!props.error && (
        <div style={{ color: 'red', marginTop: '.5rem' }}>{props.error}</div>
      )}
    </div>
  );
};
