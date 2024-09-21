'use client'

import localFont from "next/font/local";
import "./globals.css";
import RootApp from "layouts/Root";
import {Provider} from "react-redux";
import store from "store";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ Component, children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={store}>
          <RootApp>
            {children}
          </RootApp>
        </Provider>
      </body>
    </html>
  );
}
