import { useState, useEffect } from 'react';

const validate = values => {
    const errors = {};

    if (!values.userInput) {
        errors.userInput = 'cant be empty';
    } else if (values.userInput.length < 5) {
        errors.userInput = 'more than 5 chars requried';
    }

    return errors;
};

const useForm = callback => {
    const fields = {
        userInput: ''
    };

    const [values, setValues] = useState(fields);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = event => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
            setValues(fields);
        }
    }, [errors]);

    return {
        handleChange,
        handleSubmit,
        values,
        errors
    };
};

export default useForm;
