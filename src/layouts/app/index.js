import {Box, styled} from "@mui/material";
import {useState} from "react";
import AppNavbar from "layouts/app/components/navbar";
import Sidebar from "layouts/app/components/sidebar";
import {useDispatch, useSelector} from "store";
import {ThemeActions} from "store/slices/ThemeSlice";

const LayoutWrapper = styled(Box)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    backgroundColor: theme.palette.background.default
}));

const MainContentWrapper = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    minWidth: 0,
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column'
}));

const ContentWrapper = styled('main')(({ theme }) => ({
    flexGrow: 1,
    width: '100%',
    padding: theme.spacing(6),
    transition: 'padding .25s ease-in-out',
    [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4)
    }
}))

export default function AppLayout(props) {
    const { children } = props;
    const { isSidebarCollapsed } = useSelector(state => state.theme);
    const dispatch = useDispatch();
    const toggleNavVisibility = () => dispatch(ThemeActions.setSidebarCollapse(!isSidebarCollapsed));
    const contentHeightFixed = true;

    return (
        <>
            <LayoutWrapper>
                <Sidebar/>
                <MainContentWrapper
                    sx={{
                        ...(contentHeightFixed && { maxHeight: '100vh' }),
                        ...(isSidebarCollapsed && { width: '100vw' }),
                    }}>
                    <AppNavbar
                        toggleNavVisibility={toggleNavVisibility}/>
                    <ContentWrapper>
                        {children}
                    </ContentWrapper>
                </MainContentWrapper>
            </LayoutWrapper>
        </>
    )
}