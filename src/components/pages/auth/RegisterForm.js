'use client'

import {useEffect, useState} from "react";
import {
    Box, Button,
    Checkbox, Divider,
    IconButton,
    InputAdornment, styled,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import useSettings from "hooks/useSettings";
import CustomTextField from "components/form/CustomTextField";
import Link from "next/link";
import MuiFormControlLabel from "@mui/material/FormControlLabel";
import {FacebookRounded, GitHub, Google, VisibilityOffRounded, VisibilityRounded, X} from "@mui/icons-material";
import {usePathname, useRouter} from "next/navigation";
import {useFormik} from "formik";
import {signIn} from "next-auth/react";
import Roles from "constants/role";
import AuthService from "services/AuthService";

const LinkStyled = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: `${theme.palette.primary.main} !important`
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
    '& .MuiFormControlLabel-label': {
        color: theme.palette.text.secondary
    }
}))

export default function RegisterForm() {
    const pathname = usePathname();
    const router = useRouter();
    const isOwner = pathname.includes('owner');
    const [values, setValues] = useState({
        password: '',
        showPassword: false
    })

    const theme = useTheme()

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            roleCode: isOwner ? 'owner' : 'customer',
        },
        onSubmit: values => handleSubmit(values)
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }
    const handleSubmit = async (values) => {
        const res = await AuthService.Register(values);
        if (res.status === 200) {
            return router.push('/app/dashboard');
        }
    };

    const handleSocialLogin = async (social) => {
        const res = await signIn(social, {
            redirect: false,
            role: isOwner ? Roles.owner.value : Roles.customer.value,
        });

        if (res.ok) {
            return router.push('/app/dashboard');
        }
    }

    return (
        <>
            <Box sx={{ my: 6 }}>
                <Typography variant='h3' sx={{ mb: 1.5 }}>
                    Adventure starts here 🚀
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                    {isOwner ? 'Manage your business booking!' : 'Make your app management easy and fun!'}
                </Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
                <CustomTextField
                    fullWidth
                    autoFocus
                    label='Full Name'
                    name="name"
                    placeholder='John doe'
                    sx={{ display: 'flex', mb: 4 }}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    error={Boolean(formik.errors.name)}
                    {...(formik.errors.name && { helperText: formik.errors.name })}
                />
                <CustomTextField
                    fullWidth
                    label='Email'
                    name="email"
                    placeholder='admin@vuexy.com'
                    sx={{ display: 'flex', mb: 4 }}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={Boolean(formik.errors.email)}
                    {...(formik.errors.email && { helperText: formik.errors.email })}
                />
                <CustomTextField
                    fullWidth
                    label='Password'
                    placeholder='············'
                    name="password"
                    id='auth-register-v2-password'
                    sx={{ display: 'flex', mb: 4 }}
                    onChange={formik.handleChange}
                    type={values.showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    edge='end'
                                    onClick={handleClickShowPassword}
                                    onMouseDown={e => e.preventDefault()}
                                    aria-label='toggle password visibility'
                                >
                                    {values.showPassword ? <VisibilityRounded/> : <VisibilityOffRounded/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    value={formik.values.password}
                    error={Boolean(formik.errors.password)}
                    {...(formik.errors.password && { helperText: formik.errors.password })}
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label={
                        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Typography sx={{ color: 'text.secondary' }}>I agree to </Typography>
                            <Typography component={LinkStyled} href='/' onClick={e => e.preventDefault()} sx={{ ml: 1 }}>
                                privacy policy & terms
                            </Typography>
                        </Box>
                    }
                />
                <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
                    Sign up
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Typography sx={{ color: 'text.secondary', mr: 2 }}>Already have an account?</Typography>
                    <Typography
                        component={LinkStyled}
                        href='/pages/auth/login-v2'
                        sx={{ fontSize: theme.typography.body1.fontSize }}
                    >
                        Sign in instead
                    </Typography>
                </Box>
                <Divider
                    sx={{
                        color: 'text.disabled',
                        '& .MuiDivider-wrapper': { px: 6 },
                        fontSize: theme.typography.body2.fontSize,
                        my: theme => `${theme.spacing(6)} !important`
                    }}
                >
                    or
                </Divider>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconButton href='/' component={Link} sx={{ color: '#497ce2' }} onClick={e => e.preventDefault()}>
                        <FacebookRounded/>
                    </IconButton>
                    <IconButton href='/' component={Link} sx={{ color: '#1da1f2' }} onClick={e => e.preventDefault()}>
                        <X/>
                    </IconButton>
                    <IconButton
                        href='/'
                        component={Link}
                        onClick={e => e.preventDefault()}
                        sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
                    >
                        <GitHub/>
                    </IconButton>
                    <IconButton sx={{ color: '#db4437' }} onClick={() => handleSocialLogin('google')}>
                        <Google/>
                    </IconButton>
                </Box>
            </form>
        </>
    )
}