

import type { Metadata } from "next";
import React from "react";
import ChatbotWidget from "../component/ChatbotWidget";


export const metadata: Metadata = {
  title: "Concept Master",
  description: "Learn Smarter with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist+Sans:wght@100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
        <style type="text/tailwindcss">
          {`
            :root {
                --geist-sans-font: 'Geist Sans', sans-serif;
            }
            body {
                font-family: var(--geist-sans-font);
            }
          `}
        </style>
      </head>
      <body className="bg-white text-gray-900">
        {children}
        <ChatbotWidget />
      </body>
    </html>
  );
}
