import {CircleRounded, DashboardRounded, SettingsRounded} from "@mui/icons-material";
import {generateUniqueId} from "utils/helper";

const Menus = [
    {
        id: generateUniqueId(),
        title: 'Dashboard',
        icon: DashboardRounded,
        href: '/',
    },
    {
        id: generateUniqueId(),
        title: 'Setting',
        icon: SettingsRounded,
        children: [
            {
                id: generateUniqueId(),
                title: 'User & Role',
                href: '/user',
            },
            {
                id: generateUniqueId(),
                title: 'Permission',
                href: '/user',
            }
        ]
    },
];

export default Menus;