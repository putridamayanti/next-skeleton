import ProfileHeader from "components/pages/profile/ProfileHeader";
import ProfileOverview from "components/pages/profile/ProfileOverview";
import ProfileActivity from "components/pages/profile/ProfileActivity";
import {Grid2} from "@mui/material";

export default function Profile() {
    return (
        <>
            <ProfileHeader/>
            <Grid2 container spacing={6} sx={{ marginTop: 6 }}>
                <Grid2 size={{ xs: 12, lg: 4 }}>
                    <ProfileOverview/>
                </Grid2>
                    <Grid2 size={{ xs: 12, lg: 8 }}>
                        <ProfileActivity/>
                    </Grid2>
            </Grid2>
        </>
    )
}