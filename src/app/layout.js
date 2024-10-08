'use client'

import "./globals.css";
import RootApp from "layouts/Root";
import {Provider} from "react-redux";
import store from "store";
import {SWRConfig} from "swr";

export default function RootLayout({ Component, children }) {
  return (
      <html lang="en">
      <head>
        <title>Storyrow - NextJS Skeleton</title>
      </head>
      <body>
      <SWRConfig value={{
          revalidateIfStale: false,
          revalidateOnFocus: false,
          // revalidateOnMount:false,
          revalidateOnReconnect: false,
          // refreshWhenOffline: false,
          // refreshWhenHidden: false,
          // refreshInterval: 0,
      }}>
          <Provider store={store}>
              <RootApp>
                  {children}
              </RootApp>
          </Provider>
      </SWRConfig>
      </body>
      </html>
  );
}
