import {
    AccountTreeRounded,
    CircleRounded,
    DashboardRounded,
    PeopleRounded,
    SettingsRounded,
    StorageRounded
} from "@mui/icons-material";
import {generateUniqueId} from "utils/helper";
import Roles from "constants/role";

const Menus = [
    {
        id: generateUniqueId(),
        title: 'Dashboard',
        icon: DashboardRounded,
        href: '',
    },
    {
        id: generateUniqueId(),
        title: 'User',
        icon: PeopleRounded,
        children: [
            {
                id: generateUniqueId(),
                title: 'All Users',
                href: '/user',
            },
            {
                id: generateUniqueId(),
                title: 'Permission',
                href: '/user',
            },
        ]
    },
    {
        sectionTitle: 'Setting',
        roles: [Roles.admin]
    },
    {
        id: generateUniqueId(),
        title: 'Role & Permission',
        icon: AccountTreeRounded,
        href: '/role',
        roles: [Roles.admin]
    },
    {
        id: generateUniqueId(),
        title: 'Configuration',
        icon: StorageRounded,
        href: '/configuration',
        roles: [Roles.admin]
    },
];

export default Menus;