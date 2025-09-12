"use client";
import React from 'react';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="bg-white text-gray-900">
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <svg className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor"></path>
              </svg>
              <h2 className="text-lg font-semibold tracking-tight">Concept Master</h2>
            </div>
            <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
              <a className="text-gray-600 hover:text-gray-900 transition-colors" href="#features">Features</a>
              <a className="text-gray-600 hover:text-gray-900 transition-colors" href="#">Pricing</a>
              <a className="text-gray-600 hover:text-gray-900 transition-colors" href="#">Blog</a>
              <Link className="text-gray-600 hover:text-gray-900 transition-colors" href="/dashboard">Dashboard</Link>
              <a className="text-gray-600 hover:text-gray-900 transition-colors" href="#">Contact</a>
            </nav>
            <div className="flex items-center gap-4">
              <Link className="hidden sm:inline-block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors" href="/">Log In</Link>
              <Link className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800" href="/">
                Start Learning
              </Link>
              <button className="md:hidden">
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white">
            <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
          </div>
          <section className="py-24 sm:py-32">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
              <div className="mx-auto max-w-4xl">
                <div className="mb-4 flex justify-center">
                  <a className="relative inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100" href="#">
                    Now in Public Beta
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </a>
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl lg:text-7xl">
                  Concept Master – Learn Smarter with AI.
                </h1>
                <p className="mt-6 text-lg text-gray-600">
                  Unlock your full potential with our AI-powered study platform. Personalized learning, focus tools, and exam preparation, all in one place.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link className="inline-flex h-12 items-center justify-center rounded-md bg-gray-900 px-6 text-base font-medium text-white shadow-sm transition-colors hover:bg-gray-800" href="/">
                  Start Learning
                </Link>
                <a className="inline-flex h-12 items-center justify-center rounded-md border border-gray-200 bg-white px-6 text-base font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-50" href="#features">
                  Explore Features
                </a>
              </div>
            </div>
          </section>
          <div className="absolute top-0 -z-10 h-full w-full bg-white">
            <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
          </div>
          <section className="py-24 sm:py-32 bg-gray-50/50" id="features">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Key Features</h2>
                <p className="mt-4 text-lg text-gray-600">Explore the powerful tools that make Concept Master the ultimate study companion.</p>
              </div>
              <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                    <span className="material-symbols-outlined text-2xl text-gray-600">psychology</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">AI Tutor</h3>
                    <p className="mt-2 text-gray-600">Get personalized guidance and support from our AI tutor, available 24/7.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                    <span className="material-symbols-outlined text-2xl text-gray-600">center_focus_strong</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Focus Mode</h3>
                    <p className="mt-2 text-gray-600">Minimize distractions and maximize productivity with our immersive focus mode.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                    <span className="material-symbols-outlined text-2xl text-gray-600">view_in_ar</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">3D Learning</h3>
                    <p className="mt-2 text-gray-600">Dive into interactive 3D models to visualize complex concepts in a new way.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                    <span className="material-symbols-outlined text-2xl text-gray-600">online_prediction</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Exam Predictor</h3>
                    <p className="mt-2 text-gray-600">Predict your exam performance and identify areas for improvement with our AI.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="border-t border-gray-200">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="flex items-center gap-2">
                <svg className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor"></path>
                </svg>
                <h2 className="text-lg font-semibold tracking-tight">Concept Master</h2>
              </div>
              <p className="text-sm text-gray-600">© 2024 Concept Master. All rights reserved.</p>
              <div className="flex items-center gap-6 text-sm font-medium">
                <a className="text-gray-600 hover:text-gray-900 transition-colors" href="#">Privacy Policy</a>
                <a className="text-gray-600 hover:text-gray-900 transition-colors" href="#">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
