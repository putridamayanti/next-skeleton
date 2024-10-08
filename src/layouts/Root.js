'use client'

import {usePathname} from "next/navigation";
import {useSelector} from "store";
import Theme from "theme";
import AppLayout from "layouts/app";
import AuthLayout from "layouts/auth";
import {SessionProvider} from "next-auth/react";

export default function RootApp({ children }) {
    const pathname = usePathname();
    const themeSetting = useSelector(state => state.theme);
    // const theme = useMemo(() => BuildTheme(themeSetting.activeMode), [themeSetting.activeMode]);
    //
    let Layout = AppLayout;

    if (pathname === '/' || pathname === '/register') {
        Layout = AuthLayout;
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