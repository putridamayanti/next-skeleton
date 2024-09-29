import {Box, Chip, ListItem, ListItemIcon, styled, Typography} from "@mui/material";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {CircleRounded} from "@mui/icons-material";
import MenuNavLink from "layouts/app/components/sidebar/styles/MenuNavLink";

const MenuItemTextMetaWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    justifyContent: 'space-between',
    transition: 'opacity .25s ease-in-out',
}))

export default function SidebarItem(props) {
    const { item, parent, themeConfig } = props;
    const pathname = usePathname();

    const Icon = item?.icon;

    return (
        <ListItem sx={{
            ...(parent ? { p: 0 } : { mt: 0 })
        }}>
            <MenuNavLink
                component={Link}
                {...(item.disabled && { tabIndex: -1 })}
                className={pathname === item.href ? 'active' : ''}
                href={item.path === undefined ? '/' : `${item.path}`}
                {...(item.openInNewTab ? { target: '_blank' } : null)}
                onClick={e => {
                    if (item.path === undefined) {
                        e.preventDefault()
                        e.stopPropagation()
                    }
                }}
                sx={{
                    ...(item.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' }),
                    ...(parent && { pl: 4, py: 0 }),
                }}
            >

                <ListItemIcon
                    sx={{
                        minWidth: themeConfig.sidebarIconWidth,
                        transition: 'margin .25s ease-in-out',
                        '& svg': {
                            fontSize: themeConfig.sidebarIconSize,
                            ...(parent ? { fontSize: themeConfig.sidebarCircleIconSize } : {})
                        }
                    }}>
                    {item.icon ? <Icon/> : <CircleRounded/>}
                </ListItemIcon>
                <MenuItemTextMetaWrapper>
                    <Typography noWrap={true}>
                        {item.title}
                    </Typography>
                    {item.badgeContent ? (
                        <Chip
                            size='small'
                            label={item.badgeContent}
                            color={item.badgeColor || 'primary'}
                            sx={{ height: 22, minWidth: 22, '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' } }}
                        />
                    ) : null}
                </MenuItemTextMetaWrapper>
            </MenuNavLink>
        </ListItem>
    )
}