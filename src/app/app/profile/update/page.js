'use client'

import {useState} from "react";
import {Box, CircularProgress, Grid2, styled, Tab, Typography, useMediaQuery} from "@mui/material";
import MuiTabList from '@mui/lab/TabList'
import {useRouter} from "next/navigation";
import ProfileForm from "components/pages/profile/update/ProfileForm";
import PasswordForm from "components/pages/profile/update/PasswordForm";
import ConnectionForm from "components/pages/profile/update/ConnectionForm";
import {TabContext, TabPanel} from "@mui/lab";
import {ConnectWithoutContactRounded, PersonRounded, SecurityRounded} from "@mui/icons-material";
import {Component} from "react";

const TabList = styled(MuiTabList)(({ theme }) => ({
    border: '0 !important',
    '&, & .MuiTabs-scroller': {
        boxSizing: 'content-box',
        padding: theme.spacing(1.25, 1.25, 2),
        margin: `${theme.spacing(-1.25, -1.25, -2)} !important`
    },
    '& .MuiTabs-indicator': {
        display: 'none'
    },
    '& .Mui-selected': {
        boxShadow: theme.shadows[2],
        backgroundColor: theme.palette.primary.main,
        color: `${theme.palette.common.white} !important`
    },
    '& .MuiTab-root': {
        minWidth: 65,
        minHeight: 38,
        lineHeight: 1,
        borderRadius: theme.shape.borderRadius,
        [theme.breakpoints.up('md')]: {
            minWidth: 130
        },
        '&:hover': {
            color: theme.palette.primary.main
        }
    }
}));

export default function Update() {
    const [activeTab, setActiveTab] = useState(0)

    const tabs = [
        {label: 'Profile', icon: PersonRounded, panel: <ProfileForm/>},
        {label: 'Security', icon: SecurityRounded, panel: <PasswordForm/>},
        {label: 'Connections', icon: ConnectWithoutContactRounded, panel: <ConnectionForm/>},
    ];

    return (
        <Grid2 container spacing={6}>
            <Grid2 item xs={12}>
                <TabContext value={activeTab}>
                    <Grid2 container spacing={6}>
                        <Grid2 item xs={12}>
                            <TabList
                                variant='scrollable'
                                scrollButtons='auto'
                                onChange={(e, val) => setActiveTab(val)}
                                aria-label='customized tabs example'
                            >
                                {tabs.map(({icon: Component, ...item}, i) => (
                                    <Tab
                                        key={i}
                                        value={i}
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center',  'svg': { mr: 2 }}}>
                                                <Component/>
                                                {item.label}
                                            </Box>
                                        }
                                    />
                                ))}
                            </TabList>
                        </Grid2>
                        <Grid2 item xs={12}>
                            <TabPanel sx={{ p: 0 }} value={activeTab}>
                                {tabs[activeTab].panel}
                            </TabPanel>
                        </Grid2>
                    </Grid2>
                </TabContext>
            </Grid2>
        </Grid2>
    )
}