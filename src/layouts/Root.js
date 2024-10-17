'use client'

import {usePathname} from "next/navigation";
import {useSelector} from "store";
import Theme from "theme";
import AppLayout from "layouts/app";
import AuthLayout from "layouts/auth";
import {SessionProvider} from "next-auth/react";
import BlankLayout from "layouts/BlankLayout";

export default function RootApp({ children }) {
    const pathname = usePathname();
    const themeSetting = useSelector(state => state.theme);
    // const theme = useMemo(() => BuildTheme(themeSetting.activeMode), [themeSetting.activeMode]);
    //
    let Layout = BlankLayout;

    if (pathname === '/' || pathname === '/register') {
        Layout = AuthLayout;
    } else if (pathname.includes('/app')) {
        Layout = AppLayout;
    }

    // useEffect(() => {
    //     getIp();
    // }, []);

    return (
        <SessionProvider>
            <Theme mode={themeSetting.mode}>
                <Layout>
                    {children}
                </Layout>
            </Theme>
        </SessionProvider>
    )
}