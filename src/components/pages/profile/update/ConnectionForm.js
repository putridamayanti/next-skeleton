import {Box, Card, CardContent, CardHeader, Switch, Typography} from "@mui/material";
import Image from "next/image";

const connectedAccountsArr = [
    {
        checked: true,
        title: 'Google',
        logo: '/images/logos/google.png',
        subtitle: 'Calendar and Contacts'
    },
    {
        checked: false,
        title: 'Slack',
        logo: '/images/logos/slack.png',
        subtitle: 'Communications'
    },
    {
        checked: true,
        title: 'Github',
        logo: '/images/logos/github.png',
        subtitle: 'Manage your Git repositories'
    },
    {
        checked: true,
        title: 'Mailchimp',
        subtitle: 'Email marketing service',
        logo: '/images/logos/mail-chimp.png'
    },
    {
        title: 'Asana',
        checked: false,
        subtitle: 'Communication',
        logo: '/images/logos/asana.png'
    }
]

export default function ConnectionForm() {
    return (
        <Card>
            <CardHeader
                title='Connected Accounts'
                titleTypographyProps={{ sx: { mb: 1 } }}
                subheader={
                    <Typography sx={{ color: 'text.secondary' }}>
                        Display content from your connected accounts on your site
                    </Typography>
                }
            />
            <CardContent>
                {connectedAccountsArr.map(account => {
                    return (
                        <Box
                            key={account.title}
                            sx={{
                                gap: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                '&:not(:last-of-type)': { mb: 4 }
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ mr: 4, display: 'flex', justifyContent: 'center' }}>
                                    <Image src={account.logo} alt={account.title} height={30} width={30} />
                                </Box>
                                <div>
                                    <Typography variant='h6'>{account.title}</Typography>
                                    <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                                        {account.subtitle}
                                    </Typography>
                                </div>
                            </Box>
                            <Switch defaultChecked={account.checked} />
                        </Box>
                    )
                })}
            </CardContent>
        </Card>
    )
}