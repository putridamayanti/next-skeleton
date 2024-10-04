'use client'

import {Button, Card, CardContent, CardHeader} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CustomTextField from "components/form/CustomTextField";
import {useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import EnhancedTableToolbar from "components/table/EnhancedTableToolbar";
import {AddRounded} from "@mui/icons-material";

export default function User() {
    const [filter, setFilter] = useState({role: ''});

    return (
        <>
            <Card>
                <CardHeader title="Filter"/>
                <CardContent>
                    <EnhancedTableToolbar>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                                <CustomTextField
                                    select
                                    fullWidth
                                    defaultValue='Select Role'
                                    SelectProps={{
                                        value: filter.role,
                                        displayEmpty: true,
                                        onChange: e => setFilter({...filter, role: e.target.value})
                                    }}>
                                    <MenuItem value=''>Select Role</MenuItem>
                                    <MenuItem value='admin'>Admin</MenuItem>
                                    <MenuItem value='author'>Author</MenuItem>
                                    <MenuItem value='editor'>Editor</MenuItem>
                                    <MenuItem value='maintainer'>Maintainer</MenuItem>
                                    <MenuItem value='subscriber'>Subscriber</MenuItem>
                                </CustomTextField>
                            </Grid>
                            <Grid size={{ xs: 12,  md: 6, lg: 4 }}>
                                <Button
                                    startIcon={<AddRounded/>}
                                    variant="outlined">
                                    Add Item
                                </Button>
                            </Grid>
                        </Grid>
                    </EnhancedTableToolbar>
                </CardContent>
            </Card>
        </>
    )
}