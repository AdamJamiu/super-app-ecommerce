import { useEffect } from "react";
import { countryCaller } from "../../interceptors";

export default function StateSelect({ states, name, onChange, values, setStates, errors, defaultValue }) {
    useEffect(() => {

        async function getStates() {
            await countryCaller.get('/countries/NG/states')
                .then(res => {
                    setStates(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        getStates()
    }, []);

    const sortedStates = states?.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="w-full">
            <div className="flex flex-col justify-start items-start">
                {errors?.state && <div className="error">{errors?.state}</div>}
            </div>
            <select required defaultValue={defaultValue ? defaultValue : null} className="w-full border border-gray-500 rounded-md px-2 py-3 auth-input focus:ring-2 focus:ring-secondary focus:border-transparent"
                value={values.state} name={name} onChange={onChange}>
                <option selected>{defaultValue ? defaultValue : "Select State"}</option>
                {sortedStates?.map((state, index) => (
                    <option key={index} value={state?.name}>
                        {state.name}
                    </option>
                ))}
            </select>
        </div>
    );
}