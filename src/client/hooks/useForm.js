import { useState, useEffect } from 'react';
// TODO: redo validation logics
const validate = values => {
    const errors = {};

    if (!values.textTitle) {
        errors.textTitle = 'cant be empty';
    } else if (values.textTitle.length < 5) {
        errors.textTitle = 'more than 5 chars requried';
    }

    if (!values.textContent) {
        errors.textContent = 'cant be empty';
    } else if (values.textContent.length < 5) {
        errors.textContent = 'more than 5 chars requried';
    }

    return errors;
};

const useForm = callback => {
    // TODO: 필드 자동으로 생성 하게 수정
    const fields = {
        textTitle: '',
        textContent: ''
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
