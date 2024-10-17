import React, { useState, useEffect } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import { AsYouType, parsePhoneNumber } from 'libphonenumber-js';
import CustomTextField from "components/form/CustomTextField";
import Image from "next/image";
import {Button, Stack, Typography} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {BrokenImageRounded} from "@mui/icons-material";

const countryApi = "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/refs/heads/master/json/countries%2Bstates%2Bcities.json";

const PhoneNumberInput = (props) => {
    const { label, value, onChange } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [phoneCode, setPhoneCode] = useState(null);
    const [countries, setCountries] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        (async () => {
            if (typeof value === 'string') {
                const response = await fetch(countryApi);
                const countries = await response.json();
                const countryFound = countries.find(e => e.iso3 === value);
                onChange({
                    name: countryFound.name,
                    dialCode: countryFound.phone_code,
                    code: countryFound.iso3,
                    flag: countryFound.iso2,
                });
            }
        })()
    }, [onChange, value]);


    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch(countryApi);
                const data = await response.json();
                const formattedCountries = data
                    .map(country => ({
                        name: country.name,
                        dialCode: country.phone_code,
                        code: country.iso3,
                        flag: country.iso2,
                    }))
                    .sort((a, b) => a.name.localeCompare(b.name));
                setCountries(formattedCountries);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    const handleCountryChange = (item) => {
        setPhoneCode(item);
        setAnchorEl(null);
        setIsValid(true);
    };

    const handlePhoneNumberChange = (event) => {
        const input = event.target.value;
        if (phoneCode) {
            const asYouType = new AsYouType(phoneCode.dialCode);
            const formattedNumber = asYouType.input(input);
            setPhoneNumber(formattedNumber);

            try {
                const parsedNumber = parsePhoneNumber(formattedNumber, phoneCode.flag);
                setIsValid(parsedNumber.isValid());
            } catch (error) {
                setIsValid(false);
            }
        } else {
            setPhoneNumber(input);
            setIsValid(false);
        }
    };

    return (
        <>
            <CustomTextField
                fullWidth
                label="Phone Number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                error={!isValid}
                helperText={!isValid ? "Invalid phone number for selected country" : ""}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Box
                                sx={{ cursor: 'pointer', marginRight: 2 }}
                                onClick={(e) => setAnchorEl(e.currentTarget)}>
                                {phoneCode?.dialCode ? (
                                    <Image
                                        loading="lazy"
                                        width={16}
                                        height={12}
                                        src={`https://flagcdn.com/${phoneCode.flag.toLowerCase()}.svg`}
                                        alt={`${phoneCode?.name} flag`}
                                    />
                                ) : <BrokenImageRounded/>}
                            </Box>
                            {phoneCode?.dialCode && <Typography>+{phoneCode?.dialCode}</Typography>}
                        </InputAdornment>
                    ),
                }}
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}>
                {countries.map((e, i) => (
                    <MenuItem key={i} onClick={() => handleCountryChange(e)}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Image
                                loading="lazy"
                                width={16}
                                height={12}
                                src={`https://flagcdn.com/${e.flag.toLowerCase()}.svg`}
                                alt={`${e.name} flag`}
                            />
                            <Typography sx={{ width: 50, fontWeight: 600 }}>+{e.dialCode}</Typography>
                            <Typography>{e.name}</Typography>
                        </Stack>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default PhoneNumberInput;