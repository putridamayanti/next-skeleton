import {Card, CardContent, Chip, Icon, Typography} from "@mui/material";
import CustomChip from "components/chip/CustomChip";
import CustomAvatar from "components/CustomAvatar";

const CardStatsVertical = props => {
    // ** Props
    const {
        sx,
        stats,
        title,
        chipText,
        subtitle,
        avatarIcon: Component,
        avatarSize = 44,
        iconSize = '1.75rem',
        chipColor = 'primary',
        avatarColor = 'primary'
    } = props
    const RenderChip = chipColor === 'default' ? Chip : CustomChip

    return (
        <Card sx={{ ...sx }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <CustomAvatar
                    skin='light'
                    variant='rounded'
                    color={avatarColor}
                    sx={{ mb: 3.5, width: avatarSize, height: avatarSize }}
                >
                    <Component sx={{ fontSize: iconSize }}/>
                </CustomAvatar>
                <Typography variant='h5' sx={{ mb: 1 }}>
                    {title}
                </Typography>
                <Typography variant='body2' sx={{ mb: 1, color: 'text.disabled' }}>
                    {subtitle}
                </Typography>
                <Typography sx={{ mb: 3.5, color: 'text.secondary' }}>{stats}</Typography>
                <RenderChip
                    size='small'
                    label={chipText}
                    color={chipColor}
                    {...(chipColor === 'default'
                        ? { sx: { borderRadius: '4px', color: 'text.secondary' } }
                        : { rounded: true, skin: 'light' })}
                />
            </CardContent>
        </Card>
    )
}

export default CardStatsVertical