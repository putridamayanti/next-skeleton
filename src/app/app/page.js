import ChartWrapper from "components/chart/ChartWrapper";
import {Grid2} from "@mui/material";
import DashboardSalesAreaChart from "components/pages/dashboard/DashboardSalesAreaChart";
import DashboardSessionChart from "components/pages/dashboard/DashboardSessionChart";
import CardStatsVertical from "components/shared/CardStats";
import {AttachMoneyRounded} from "@mui/icons-material";
import DashboardRevenueGrowthChart from "components/pages/dashboard/DashboardRevenueGrowthChart";
import DashboardEarningChart from "components/pages/dashboard/DashboardEarningChart";
import DashboardSalesChart from "components/pages/dashboard/DashboardSalesChart";
import DashboardTransaction from "components/pages/dashboard/DashboardTransaction";

export default function Dashboard() {
    return (
        <ChartWrapper>
            <Grid2 container spacing={6}>
                <Grid2 size={{ xs: 12, sm: 4, lg: 2 }}>
                    <DashboardSalesAreaChart/>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 4, lg: 2 }}>
                    <DashboardSessionChart/>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 4, lg: 2 }}>
                    <CardStatsVertical
                        stats='1.28k'
                        chipText='-12.2%'
                        chipColor='default'
                        avatarColor='error'
                        title='Total Profit'
                        subtitle='Last week'
                        avatarIcon={AttachMoneyRounded}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 4, lg: 2 }}>
                    <CardStatsVertical
                        stats='1.28k'
                        chipText='-12.2%'
                        chipColor='default'
                        avatarColor='error'
                        title='Total Profit'
                        subtitle='Last week'
                        avatarIcon={AttachMoneyRounded}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 8, lg: 4 }}>
                    <DashboardRevenueGrowthChart/>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 12, lg: 8 }}>
                    <DashboardEarningChart/>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 12, lg: 4 }}>
                    <DashboardSalesChart/>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 12, lg: 12 }}>
                    <DashboardTransaction/>
                </Grid2>
            </Grid2>
        </ChartWrapper>
    )
}