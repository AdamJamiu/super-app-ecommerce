import { useEffect, useState } from 'react';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { IconButton, TextField } from "@mui/material";

function PasswordRequirement({ meets, label }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '7px' }}>
            {meets ? '✅' : '❌'}
            <span style={{ marginLeft: '10px' }}>{label}</span>
        </div>
    );
}

const requirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password) {
    if (!password) {
        return 0;
    }
    let multiplier = 0;
    let requirementCount = 0;

    requirements.forEach((requirement) => {
        if (requirement.re.test(password)) {
            requirementCount++;
        }
    });
    // If the password meets the minimum length requirement (6 characters) and fulfills at least one requirement, it's valid.
    if (password.length > 5 && requirementCount > 0) {
        return 100;
    }

    // Calculate strength based on the number of fulfilled requirements
    multiplier = requirements.length - requirementCount;

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export default function JoiPasswordInput({ values, handleChange }) {
    const [popoverOpened, setPopoverOpened] = useState(false);
    const [isPasswordHide, setIsPasswordHide] = useState(false)

    const handleToggleHidePassword = () => setIsPasswordHide(prev => !prev)

    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement
            key={index}
            label={requirement.label}
            meets={requirement.re.test(values.password ? values.password : '')}
        />
    ));

    const strength = getStrength(values?.password);
    const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

    useEffect(() => {
        if (values.password) {
            if (values.password.length === 0) {
                setPopoverOpened(false);
            }
        }
    }, [values.password]);

    return (
        <div className="w-full relative" style={{ maxWidth: '100%', margin: '0 auto' }}>
            <div className="relative w-full text-gray-600">

                <TextField
                    variant="standard"
                    className="w-full border-blue-400 font-semibold border-b ease transition-all focus:border-b-2 pt-10"
                    type={isPasswordHide ? "text" : "password"}
                    placeholder="Enter your new password"
                    value={values.password}
                    name="password"
                    required
                    onChange={handleChange}
                    onFocusCapture={() => setPopoverOpened(true)}
                    onBlurCapture={() => setPopoverOpened(false)}
                    InputProps={{
                        endAdornment: <IconButton onClick={handleToggleHidePassword}>
                            {!isPasswordHide ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                        </IconButton>,
                        startAdornment: <HttpsOutlinedIcon color="action" />
                    }}
                />

            </div>
            {popoverOpened && (
                <div className='shadow-lg rounded-md p-4 absolute left-0 right-0 bg-white ease transition-all z-20'>
                    <progress
                        value={strength}
                        max="100"
                        style={{ width: '100%', height: '5px' }}
                    ></progress>
                    <PasswordRequirement
                        label="Includes at least 6 characters"
                        meets={values?.password?.length > 5}
                    />
                    {checks}
                </div>
            )}
        </div>
    );
}
