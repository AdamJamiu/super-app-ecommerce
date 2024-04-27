import React, { useState, useEffect } from "react";
import { countryCaller } from "../../interceptors";
import { MenuItem, Select } from "@mui/material";
// import "./style.css"

export default function CitiesSelect({ values, name, onChange, state, errors, defaultValue }) {
    const [states, setStates] = useState([])

    useEffect(() => {
        if (!values.state) return;

        async function getCities() {
            await countryCaller.get(`/countries/NG/states/${state}/cities`)
                .then(res => setStates(res.data))
                .catch(err => console.log(err))
        }

        getCities()

    }, [values?.state]);

    const sortedCities = states?.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="select__container w-full">
            <div className="label-wrap">
                {errors?.city && <div className="error">{errors?.city}</div>}
            </div>
            <Select variant="standard" defaultValue={defaultValue ? defaultValue : null} onChange={onChange} value={values.city} name={name} required
                className="w-full border-blue-400 font-semibold border-b ease transition-all focus:border-b-2">
                <MenuItem disabled selected>{defaultValue ? defaultValue : "Select City"}</MenuItem>
                {sortedCities?.map((city) => (
                    <option key={city.id} value={city.name}>
                        {city.name}
                    </option>
                ))}
            </Select>
        </div >
    );
}