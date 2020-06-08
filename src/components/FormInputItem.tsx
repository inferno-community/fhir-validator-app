import React, { useContext } from 'react';

import { FormInputItemState, FormState, FormContext } from './ValidatorForm';

export interface FormInputItemProps {
  name: keyof FormState;
  textLabel: string;
  fileLabel: string;
  state: FormInputItemState;
};

export function FormInputItem({
  name,
  textLabel,
  fileLabel,
  state,
}: FormInputItemProps) {
  const dispatch = useContext(FormContext);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => dispatch({
    field: name,
    type: 'CHANGE_INPUT',
    input: e.target.value,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch({
    field: name,
    type: 'UPLOAD_FILE',
    filename: e.target.files[0].name,
  });

  const textFieldName = `${name}_field`;
  const fileInputName = `${name}_file`;

  return (
    <div className="form-group">
      <label htmlFor={textFieldName}>{textLabel}</label>
      <textarea
        name={textFieldName}
        className={`form-control custom-text-area ${state.type === 'input' ? '' : 'disabled'}`}
        rows={8}
        value={state.type === 'input' ? state.input : ''}
        onChange={handleTextChange}
        disabled={state.type !== 'input'}
      />
      <br />
      <div className="custom-file">
        <label htmlFor={fileInputName} className={`custom-file-label ${state.type === 'file' ? 'selected' : ''}`}>
          {state.type === 'file' ? state.filename : fileLabel}
        </label>
        <input type="file" name={fileInputName} className="custom-file-input" onChange={handleFileChange} />
      </div>
    </div>
  );
};
