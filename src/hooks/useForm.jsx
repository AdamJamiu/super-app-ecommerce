import { useState } from 'react';

const useForm = () => {
    const [values, setValues] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value
        });
    };
    // console.log(values)

    const reset = () => {
        setValues({});
    };

    return {
        values,
        handleChange,
        reset
    };
};

export default useForm;