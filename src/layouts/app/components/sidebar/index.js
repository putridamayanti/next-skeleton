'use client'

import {Box, Drawer, IconButton, List, styled, useMediaQuery} from "@mui/material";
import Logo from "components/shared/Logo";
import {useDispatch, useSelector} from "store";
import {CloseRounded} from "@mui/icons-material";
import Link from "next/link";
import Menus from "constants/menus";
import SidebarItem from "layouts/app/components/sidebar/SidebarItem";
import SidebarGroup from "layouts/app/components/sidebar/SidebarGroup";
import SidebarItems from "layouts/app/components/sidebar/SidebarItems";
import {ThemeActions} from "store/slices/ThemeSlice";

const MenuHeaderWrapper = styled(Box)(({ theme, width }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: theme.spacing(3.5),
    paddingLeft: theme.spacing(3.5),
    transition: 'padding .25s ease-in-out',
    minHeight: theme.mixins.toolbar.minHeight
}))
export default function Sidebar() {
    const dispatch = useDispatch();
    const themeConfig = useSelector(state => state.theme);
    const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const { sidebarWidth, isSidebarCollapsed } = useSelector(state => state.theme);
    const variant = isSidebarCollapsed ? 'persistent' : smDown ? 'temporary' : 'permanent';

    return (
        <Drawer
            open={!isSidebarCollapsed}
            variant={variant}
            sx={{
                width: isSidebarCollapsed ? 0 : sidebarWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    // width: drawerWidth,
                    // boxSizing: 'border-box',
                    border: 'none',
                    boxShadow: 2,
                },
            }}>
            <MenuHeaderWrapper width={sidebarWidth}>
                <Link href={'/'}>
                    <Logo/>
                </Link>
                {smDown && (
                    <IconButton onClick={() => dispatch(ThemeActions.setSidebarCollapse(!isSidebarCollapsed))}>
                        <CloseRounded/>
                    </IconButton>
                )}
            </MenuHeaderWrapper>
            <List sx={{ pt: 0, '& > :first-child': { mt: '0' } }}>
                <SidebarItems
                    themeConfig={themeConfig}
                    items={Menus}/>
            </List>
        </Drawer>
    )
}