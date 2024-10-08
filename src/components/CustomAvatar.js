'use client'

import MuiAvatar from '@mui/material/Avatar'
import {lighten, useTheme} from "@mui/material";
import useBackgroundColor from "hooks/useBackgroundColor";

export default function CustomAvatar(props) {
    const { sx, src, skin, color } = props
    const theme = useTheme();
    const bgColors = useBackgroundColor();

    const getAvatarStyles = (skin, skinColor) => {
        let avatarStyles
        if (skin === 'light') {
            avatarStyles = { ...bgColors[`${skinColor}Light`] }
        } else if (skin === 'light-static') {
            avatarStyles = {
                color: bgColors[`${skinColor}Light`].color,
                backgroundColor: lighten(theme.palette[skinColor].main, 0.88)
            }
        } else {
            avatarStyles = { ...bgColors[`${skinColor}Filled`] }
        }

        return avatarStyles
    }

    const colors = {
        primary: getAvatarStyles(skin, 'primary'),
        secondary: getAvatarStyles(skin, 'secondary'),
        success: getAvatarStyles(skin, 'success'),
        error: getAvatarStyles(skin, 'error'),
        warning: getAvatarStyles(skin, 'warning'),
        info: getAvatarStyles(skin, 'info')
    }

    return <MuiAvatar {...props} sx={!src && skin && color ? Object.assign(colors[color], sx) : sx} />
}