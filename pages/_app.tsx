import { Inter as FontSans } from "@next/font/google";
import {
  createBrowserSupabaseClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import React, { useState } from "react";
import CommandMenu from "~/components/CommandMenu";
import { AnalyticsProvider } from "~/components/context/analytics";
import { TailwindIndicator } from "~/components/tailwind-indicator";
import { Toaster } from "~/components/ui/toaster";
import { TooltipProvider } from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <AnalyticsProvider>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <div className="mx-auto flex min-h-screen flex-col justify-center px-2">
              <Header />
              <main
                className={cn(
                  "mx-auto flex max-w-5xl flex-1 flex-col justify-center bg-white font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50",
                  fontSans.variable
                )}
              >
                <Component {...pageProps} />
                <Analytics />
                <CommandMenu />
              </main>
              <Footer />
            </div>
            <TailwindIndicator />
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </SessionContextProvider>
    </AnalyticsProvider>
  );
}

export default MyApp;
