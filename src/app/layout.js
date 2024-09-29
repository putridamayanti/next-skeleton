'use client'

import "./globals.css";
import RootApp from "layouts/Root";
import {Provider} from "react-redux";
import store from "store";

export default function RootLayout({ Component, children }) {
  return (
      <html lang="en">
      <head>
        <title>Storyrow - NextJS Skeleton</title>
      </head>
      <body>
      <Provider store={store}>
        <RootApp>
          {children}
        </RootApp>
      </Provider>
      </body>
      </html>
  );
}
