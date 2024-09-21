'use client'

import {usePathname} from "next/navigation";
import {useSelector} from "store";
import {CssBaseline, ThemeProvider} from "@mui/material";
import Theme from "theme";
import AppLayout from "layouts/app";

export default function RootApp({ children }) {
    const pathname = usePathname();
    const themeSetting = useSelector(state => state.theme);
    // const theme = useMemo(() => BuildTheme(themeSetting.activeMode), [themeSetting.activeMode]);
    //
    let Layout = AppLayout;
    //
    // if (pathname.includes('/app')) {
    //     Layout = AppLayout;
    // }
    //
    // useEffect(() => {
    //     getIp();
    // }, []);

    return (
        <Theme mode={themeSetting.mode}>
            <Layout>
                {children}
            </Layout>
        </Theme>
    )
}