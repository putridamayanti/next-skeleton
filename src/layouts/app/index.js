import {Box, CircularProgress, Stack, styled, useTheme} from "@mui/material";
import {useState} from "react";
import AppNavbar from "layouts/app/components/navbar";
import Sidebar from "layouts/app/components/sidebar";
import {useDispatch, useSelector} from "store";
import {ThemeActions} from "store/slices/ThemeSlice";
import useProfile from "hooks/useProfile";

const LoadingWrapper = styled(Stack)(() => ({
    width: '100vw',
    height: '100vh'
}));

const LayoutWrapper = styled(Box)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    backgroundColor: theme.palette.background.default
}));

const MainContentWrapper = styled(Box)(({ theme, isSidebarCollapsed }) => ({
    flexGrow: 1,
    minWidth: 0,
    width: isSidebarCollapsed ? '100vw' : '100%',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));

const ContentWrapper = styled('main')(({ theme }) => ({
    flexGrow: 1,
    width: '100%',
    marginRight: 'auto',
    padding: theme.spacing(6),

    [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4)
    }
}))

export default function AppLayout(props) {
    const { children } = props;
    const { isSidebarCollapsed } = useSelector(state => state.theme);
    const { id } = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const profile = useProfile();

    const toggleNavVisibility = () => dispatch(ThemeActions.setSidebarCollapse(!isSidebarCollapsed));

    if (!id) {
        return (
            <LoadingWrapper justifyContent="center" alignItems="center">
                <CircularProgress/>
            </LoadingWrapper>
        )
    }

    return (
        <>
            <LayoutWrapper>
                <Sidebar/>
                <MainContentWrapper>
                    <AppNavbar toggleNavVisibility={toggleNavVisibility}/>
                    <ContentWrapper sx={{
                        ...(isSidebarCollapsed && { width: '100vw' })
                    }}>
                        <Box height={80}/>
                        {children}
                    </ContentWrapper>
                </MainContentWrapper>
            </LayoutWrapper>
        </>
    )
}