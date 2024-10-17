import {useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    CardContent,
    Collapse, IconButton, Stack,
    Table, TableBody, TableCell, TableHead, TableRow,
    Typography
} from "@mui/material";
import {EditRounded, ExpandMoreRounded} from "@mui/icons-material";
import useSWR from "swr";
import RoleService from "services/RoleService";
import SettingService from "services/SettingService";
import {SettingTypes} from "constants/constants";
import {generateUniqueId} from "utils/helper";

export default function StorageForm() {
    const [collapsedIndex, setCollapsedIndex] = useState(null);
    const drivers = [
        { name: 'Cloudinary', value: 'cloudinary' },
        { name: 'Google Drive', value: 'google-drive' },
    ];

    const {data: resSetting, isLoading: loadingSetting} = useSWR('/api/setting/storage',
        () => SettingService.GetSettingByQuery({type: SettingTypes.storage.value}));

    return (
        <Card>
            <CardContent>
                <Table>
                    <TableHead>
                        <TableCell>Name</TableCell>
                        <TableCell>Code</TableCell>
                        <TableCell>Setting</TableCell>
                        <TableCell>Option</TableCell>
                    </TableHead>
                    <TableBody>
                        {resSetting?.data?.map((e, i) => (
                            <TableRow key={i}>
                                <TableCell>{e.name}</TableCell>
                                <TableCell>{e.code}</TableCell>
                                <TableCell>
                                    {Object.keys(e.setting).map(key => (
                                        <Stack key={generateUniqueId()} direction="row">
                                            <Typography variant="subtitle2">{key}:</Typography>
                                            <Typography variant="subtitle2" fontWeight={600}>{e.setting[key] ?? '-'}</Typography>
                                        </Stack>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    <IconButton>
                                        <EditRounded/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}