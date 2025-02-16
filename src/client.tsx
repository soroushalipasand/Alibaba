
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider, HydrationBoundary } from "@tanstack/react-query";
import App from "./App";

declare global {
    interface Window {
        __DEHYDRATED_STATE__: any;
    }
}

const queryClient = new QueryClient();
const dehydratedState = window.__DEHYDRATED_STATE__;
const rootElement = document.getElementById("root");

if (rootElement) {
    createRoot(rootElement).render(
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={dehydratedState}>
                <BrowserRouter basename="/">
                    <App />
                </BrowserRouter>
            </HydrationBoundary>
        </QueryClientProvider>
    );
} else {
    console.error("Root element not found");
}