'use client'

import ProfileHeader from "components/pages/profile/ProfileHeader";
import ProfileOverview from "components/pages/profile/ProfileOverview";
import ProfileActivity from "components/pages/profile/ProfileActivity";
import {Grid2} from "@mui/material";
import {useSelector} from "store";

export default function Profile() {
    const profile = useSelector(state => state.profile);

    return (
        <>
            <ProfileHeader/>
            <Grid2 container spacing={6} sx={{ marginTop: 6 }}>
                <Grid2 size={{ xs: 12, lg: 4 }}>
                    <ProfileOverview profile={profile}/>
                </Grid2>
                    <Grid2 size={{ xs: 12, lg: 8 }}>
                        <ProfileActivity/>
                    </Grid2>
            </Grid2>
        </>
    )
}