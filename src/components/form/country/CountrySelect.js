import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Image from "next/image";
import CustomTextField from "components/form/CustomTextField";

const countryApi = "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/refs/heads/master/json/countries%2Bstates%2Bcities.json";

const CountrySelect = (props) => {
    const { label, value, onChange } = props;
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        (async () => {
            if (typeof value === 'string') {
                const response = await fetch(countryApi);
                const countries = await response.json();
                onChange(countries.find(e => e.iso3 === value));
            }
        })()
    }, [onChange, value]);

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            try {
                const response = await fetch(countryApi);
                const countries = await response.json();
                if (active) {
                    setOptions(countries.map((country) => ({
                        code: country.iso3,
                        name: country.name,
                        currency: country.currency,
                        flag: country.iso2,
                        states: country.states
                    })));
                }
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id="country-select"
            open={open}
            value={typeof value === 'string' ? null : value}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            onChange={(event, newValue) => onChange(newValue)}
            options={options}
            loading={loading}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <Image
                        loading="lazy"
                        width={20}
                        height={15}
                        src={`https://flagcdn.com/${option.flag.toLowerCase()}.svg`}
                        alt={`${option.name} flag`}
                    />
                    {option.name} ({option.currency})
                </Box>
            )}
            renderInput={(params) => (
                <CustomTextField
                    {...params}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}/>
            )}
        />
    );
};

export default CountrySelect;