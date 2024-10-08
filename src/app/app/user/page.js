'use client'

import {
    Card,
    CardContent,
    CardHeader,
    Fab,
    Stack,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead, TableRow,
    Tooltip
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CustomTextField from "components/form/CustomTextField";
import {useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import EnhancedTableToolbar from "components/table/EnhancedTableToolbar";
import {AddRounded} from "@mui/icons-material";
import {Pagination} from "@mui/lab";
import useSWR from "swr";
import UserService from "services/UserService";
import RoleService from "services/RoleService";
import CustomChip from "components/chip/CustomChip";
import Link from "next/link";

export default function User() {
    const [filter, setFilter] = useState({});

    const {data: resRole, isLoading: loadingRole} = useSWR('/api/role', () => RoleService.GetRoleByQuery({}));
    const {data: resData, isLoading: loading} = useSWR(['/api/user', filter], () => UserService.GetUserByQuery(filter));

    return (
        <>
            <Card>
                <CardHeader title="Filter"/>
                <CardContent>
                    <EnhancedTableToolbar>
                        <Grid container spacing={2}   direction="row" sx={{
                            justifyContent: "space-between"
                        }}>
                            <Grid size={{ xs: 12, md: 6, lg: 2 }}>
                                <CustomTextField
                                    select
                                    fullWidth
                                    defaultValue=''
                                    SelectProps={{
                                        value: filter.role,
                                        displayEmpty: true,
                                        onChange: e => setFilter({
                                            ...filter,
                                            ...e.target.value !== '' && {role: e.target.value}})
                                    }}>
                                    <MenuItem value=''>Select Role</MenuItem>
                                    {resRole?.data?.map((e, i) => (
                                        <MenuItem key={i} value={e.id}>{e.name}</MenuItem>
                                    ))}
                                </CustomTextField>
                            </Grid>
                        </Grid>
                    </EnhancedTableToolbar>

                    <TableContainer sx={{ marginTop: 4 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Role</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {resData?.map((e, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{e.name}</TableCell>
                                        <TableCell>{e.email}</TableCell>
                                        <TableCell>
                                            <CustomChip
                                                skin='light'
                                                size='small'
                                                label={e.isAdmin ? 'Admin' : 'User'}
                                                color={e.isAdmin ? 'success' : 'warning'}
                                                sx={{ textTransform: 'capitalize' }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Stack direction="row" paddingTop={3} justifyContent="end">
                        <Pagination
                            color="secondary"
                            count={resData?.pagination?.pages ?? 1}
                            page={resData?.pagination?.currentPage}
                            size="small" />
                    </Stack>
                </CardContent>
            </Card>

            <Link href={'/app/user/create'}>
                <Tooltip title="Add Data">
                    <Fab
                        color="primary"
                        aria-label="add"
                        sx={{ position: "fixed", right: "25px", bottom: "15px" }}>
                        <AddRounded />
                    </Fab>
                </Tooltip>
            </Link>
        </>
    )
}