import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import {
  ERROR,
  VALUE,
  getPropValues,
  isObject,
  isRequired,
} from '../helpers/utils';
import { TKeyValue, TValidator } from '../globals/types';

/**
 * Custom hooks to validate your Form...
 *
 * @param stateSchema model you stateSchema.
 * @param stateValidatorSchema model your validation.
 * @param submitFormCallback function to be execute during form submission.
 * @returns
 */
function useForm(
  stateSchema = {},
  stateValidatorSchema = {} as TValidator,
  submitFormCallback: (values: TKeyValue) => void,
) {
  const [state, setStateSchema] = useState(stateSchema);

  const [values, setValues] = useState(getPropValues(state, VALUE));
  const [errors, setErrors] = useState(getPropValues(state, ERROR));
  const [dirty, setDirty] = useState(getPropValues(state));

  const [disable, setDisable] = useState(true);
  const [isDirty, setIsDirty] = useState(false);

  // Get a local copy of stateSchema
  useEffect(() => {
    setStateSchema(stateSchema);
    setDisable(true); // Disable button in initial render.
    setInitialErrorState();
  }, []); // eslint-disable-line

  // Validate fields in forms
  const validateFormFields = useCallback(
    (name: string, value: string) => {
      const validator = stateValidatorSchema;
      // Making sure that stateValidatorSchema name is same in
      // stateSchema
      if (!validator[name]) return;

      const field = validator[name];

      let error = '';
      error = isRequired(value, field!.required);

      if (isObject(field['validator']) && error === '') {
        const fieldValidator = field['validator'];

        // Test the function callback if the value is meet the criteria
        const testFunc = fieldValidator!['func'];
        if (!testFunc!(value)) {
          error = fieldValidator!['error']!;
        }
      }

      return error;
    },
    [stateValidatorSchema],
  );

  // Set Initial Error State
  // When hooks was first rendered...
  const setInitialErrorState = useCallback(() => {
    Object.keys(errors).map((name) =>
      setErrors((prevState) => ({
        ...prevState,
        [name]: validateFormFields(name, values[name] as string),
      })),
    );
  }, [errors, values, validateFormFields]);

  // Used to disable submit button if there's a value in errors
  // or the required field in state has no value.
  // Wrapped in useCallback to cached the function to avoid intensive memory leaked
  // in every re-render in component
  const validateErrorState = useCallback(
    () => Object.values(errors).some((error) => error),
    [errors],
  );

  // For every changed in our state this will be fired
  // To be able to disable the button
  useEffect(() => {
    if (isDirty) {
      setDisable(validateErrorState());
    }
  }, [errors, isDirty, validateErrorState]);

  // Event handler for handling changes in input.
  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsDirty(true);

      const name = (event.target! as HTMLInputElement).name;
      const value = (event.target! as HTMLInputElement).value;

      const error = validateFormFields(name, value);

      setValues((prevState) => ({ ...prevState, [name]: value }));
      setErrors((prevState) => ({ ...prevState, [name]: error }));
      setDirty((prevState) => ({ ...prevState, [name]: true }));
    },
    [validateFormFields],
  );

  const handleOnSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      // Making sure that there's no error in the state
      // before calling the submit callback function
      if (!validateErrorState()) {
        submitFormCallback(values);
        console.log(values);
      }
    },
    [validateErrorState, submitFormCallback, values],
  );

  return {
    handleOnChange,
    handleOnSubmit,
    values,
    errors,
    disable,
    setValues,
    setErrors,
    dirty,
  };
}

export default useForm;
