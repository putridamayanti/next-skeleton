'use client'

import {useState} from "react";
import {
    ConnectWithoutContactRounded,
    CreditCardRounded,
    PersonRounded,
    SecurityRounded,
    StorageRounded
} from "@mui/icons-material";
import ProfileForm from "components/pages/profile/update/ProfileForm";
import SecurityForm from "components/pages/profile/update/SecurityForm";
import {Box, Grid2, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import CustomTabList from "components/CustomTabList";
import StorageForm from "components/pages/configuration/StorageForm";

export default function Configuration() {
    const [activeTab, setActiveTab] = useState(0)

    const tabs = [
        {label: 'Storage', icon: StorageRounded, panel: <StorageForm/>},
        {label: 'Payment', icon: CreditCardRounded, panel: <SecurityForm/>},
    ];

    return (
        <Grid2 container spacing={6}>
            <Grid2 size={{ xs: 12, lg: 12 }}>
                <TabContext value={activeTab}>
                    <Grid2 container spacing={6}>
                        <Grid2 size={{ xs: 12, lg: 12 }}>
                            <CustomTabList
                                variant='scrollable'
                                scrollButtons='auto'
                                onChange={(e, val) => setActiveTab(val)}
                                aria-label='customized tabs example'>
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
                            </CustomTabList>
                        </Grid2>
                        <Grid2 size={{ xs: 12, lg: 12 }}>
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