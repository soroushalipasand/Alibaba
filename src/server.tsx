import express from 'express';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { QueryClient, HydrationBoundary, QueryClientProvider, dehydrate } from '@tanstack/react-query';
import App from './App';
// import fetch from 'node-fetch';
import axios from 'axios';

import { StaticRouter } from "react-router-dom/server";

const app = express();




app.get('/', async (req, res) => {
    const queryClient = new QueryClient();

    try {
        await queryClient.prefetchQuery({
            queryKey: ['hotels'],
            queryFn: async () => {
                const response = await axios.get('http://localhost:3001/hotels');
                return response.data;
            },
        });

        const dehydratedState = dehydrate(queryClient);

        const { pipe } = renderToPipeableStream(
            <QueryClientProvider client={queryClient}>
                <HydrationBoundary state={dehydratedState}>
                    <StaticRouter location={req.url}>
                        <App />
                    </StaticRouter>
                </HydrationBoundary>
            </QueryClientProvider>,
            {
                bootstrapScripts: ['/client.js'],
                onShellReady() {
                    res.setHeader('Content-type', 'text/html');
                    res.write(
                        `<!DOCTYPE html>
            <html>
              <head>
                <title>React SSR with React Query Prefetch</title>
              </head>
              <body>
                <div id="root">`
                    );
                    pipe(res);
                    res.write(
                        `<script>
              window.__DEHYDRATED_STATE__ = ${JSON.stringify(dehydratedState)};
            </script>`
                    );
                },
                onShellError(error) {
                    console.error(error);
                    res.status(500).send('Something went wrong!');
                },
            }
        );
    } catch (error) {
        console.error('Error fetching hotels:', error);
        res.status(500).send('Failed to fetch hotels');
    }
});

app.get('/hotels/:id', async (req, res) => {
    const { id } = req.params;
    const queryClient = new QueryClient();

    try {
        await queryClient.prefetchQuery({
            queryKey: ["hotel", id],
            queryFn: async () => {
                const response = await axios.get(`http://localhost:3001/hotels/${id}`);
                return response.data;
            },
        });

        const dehydratedState = dehydrate(queryClient);

        const { pipe } = renderToPipeableStream(
            <QueryClientProvider client={queryClient}>
                <HydrationBoundary state={dehydratedState}>
                    <StaticRouter location={req.url}>
                        <App />
                    </StaticRouter>
                </HydrationBoundary>
            </QueryClientProvider>,
            {
                bootstrapScripts: ['/client.js'],
                onShellReady() {
                    res.setHeader('Content-type', 'text/html');
                    res.write(
                        `<!DOCTYPE html>
            <html>
              <head>
                <title>React SSR with React Query Prefetch</title>
              </head>
              <body>
                <div id="root">`
                    );
                    pipe(res);
                    res.write(
                        `<script>
              window.__DEHYDRATED_STATE__ = ${JSON.stringify(dehydratedState)};
            </script>`
                    );
                },
                onShellError(error) {
                    console.error(error);
                    res.status(500).send('Something went wrong!');
                },
            }
        );
    } catch (error) {
        console.error('Error fetching hotels:', error);
        res.status(500).send('Failed to fetch hotels');
    }
});


app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
