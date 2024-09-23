import {useState} from "react";
import {useFormik} from "formik";
import {Box, Button, Card, CardContent, CardHeader, Grid2, IconButton, InputAdornment, Typography} from "@mui/material";
import CustomTextField from "components/form/CustomTextField";
import {VisibilityOffRounded, VisibilityRounded} from "@mui/icons-material";

export default function SecurityForm() {
    const [values, setValues] = useState({
        showNewPassword: false,
        showCurrentPassword: false,
        showConfirmNewPassword: false
    })

    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        onSubmit: values => handleSubmit(values)
    });

    const handleClickShowCurrentPassword = () => {
        setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
    }

    const handleClickShowNewPassword = () => {
        setValues({ ...values, showNewPassword: !values.showNewPassword })
    }

    const handleClickShowConfirmNewPassword = () => {
        setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
    }

    const handleSubmit = (values) => {
        console.log(values)
    }

    return (
        <Card>
            <CardHeader title='Change Password' />
            <CardContent>
                <form onSubmit={formik.handleSubmit}>
                    <Grid2 container spacing={5} marginBottom={5}>
                        <Grid2 size={{ xs: 12, sm: 6, lg: 6 }}>
                            <CustomTextField
                                fullWidth
                                name="currentPassword"
                                value={formik.values.currentPassword}
                                onChange={formik.handleChange}
                                label='Current Password'
                                placeholder='············'
                                id='input-current-password'
                                error={Boolean(formik.errors.currentPassword)}
                                type={values.showCurrentPassword ? 'text' : 'password'}
                                {...(formik.errors.currentPassword && { helperText: formik.errors.currentPassword })}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                edge='end'
                                                onMouseDown={e => e.preventDefault()}
                                                onClick={handleClickShowCurrentPassword}
                                            >
                                                {values.showCurrentPassword ? <VisibilityRounded/> : <VisibilityOffRounded/>}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid2>
                    </Grid2>
                    <Grid2 container spacing={5} sx={{ mt: 0 }}>
                        <Grid2 size={{ xs: 12, sm: 6, lg: 6 }}>
                            <CustomTextField
                                fullWidth
                                name="newPassword"
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                label='New Password'
                                id='input-new-password'
                                placeholder='············'
                                error={Boolean(formik.errors.newPassword)}
                                type={values.showNewPassword ? 'text' : 'password'}
                                {...(formik.errors.newPassword && { helperText: formik.errors.newPassword })}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                edge='end'
                                                onClick={handleClickShowNewPassword}
                                                onMouseDown={e => e.preventDefault()}
                                            >
                                                {values.showNewPassword ? <VisibilityRounded/> : <VisibilityOffRounded/>}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6, lg: 6 }}>
                            <CustomTextField
                                fullWidth
                                name="confirmPassword"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                placeholder='············'
                                label='Confirm New Password'
                                id='input-confirm-new-password'
                                error={Boolean(formik.errors.confirmPassword)}
                                type={values.showConfirmNewPassword ? 'text' : 'password'}
                                {...(formik.errors.confirmPassword && { helperText: formik.errors.confirmPassword })}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                edge='end'
                                                onMouseDown={e => e.preventDefault()}
                                                onClick={handleClickShowConfirmNewPassword}
                                            >
                                                {values.showConfirmNewPassword ? <VisibilityRounded/> : <VisibilityOffRounded/>}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, lg: 12 }}>
                            <Typography variant='h6'>Password Requirements:</Typography>
                            <Box component='ul' sx={{ pl: 6, mb: 0, '& li': { mb: 1.5, color: 'text.secondary' } }}>
                                <li>Minimum 8 characters long - the more, the better</li>
                                <li>At least one lowercase & one uppercase character</li>
                                <li>At least one number, symbol, or whitespace character</li>
                            </Box>
                        </Grid2>
                        <Grid2 size={{ xs: 12, lg: 12 }}>
                            <Button variant='contained' type='submit' sx={{ mr: 4 }}>
                                Save Changes
                            </Button>
                            <Button type='reset' variant='tonal' color='secondary' onClick={() => reset()}>
                                Reset
                            </Button>
                        </Grid2>
                    </Grid2>
                </form>
            </CardContent>
        </Card>
    )
}