import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Image from "next/image";
import CustomTextField from "components/form/CustomTextField";

const StateSelect = (props) => {
    const { country, label, value, onChange } = props;
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        (async () => {
            if (typeof value === 'string' && country?.states?.length > 0) {
                onChange(country?.states?.find(e => e.state_code === value));
            }
        })()
    }, [country?.states, onChange, value]);

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            try {
                if (country) {
                    if (active) {
                        setOptions(country?.states?.map((item) => ({
                            code: item.state_code,
                            name: item.name,
                        })));
                    }
                }
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        })();

        return () => {
            active = false;
        };
    }, [country, loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id="state-select"
            open={open}
            value={typeof value === 'string' ? null : value}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            onChange={(event, newValue) => onChange(newValue)}
            options={options}
            loading={loading}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
                <Box component="li" {...props}>
                    {option.name}
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

export default StateSelect;