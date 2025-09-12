"use client"

import React from "react";

const calendarDays = [
    { day: "S" }, { day: "M" }, { day: "T" }, { day: "W" }, { day: "T" }, { day: "F" }, { day: "S" },
];
const calendarNumbers = [
    ...Array(30).fill(0).map((_, i) => i + 1),
];

export default function DashboardPage() {
    return (
        <div className="flex min-h-screen w-full flex-col font-sans bg-white">
            {/* Dashboard previous layout */}
            <div className="mx-auto max-w-4xl w-full pt-10 px-4">
                <h2 className="text-3xl font-bold text-gray-900">Welcome back, Alex</h2>
                <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Today's Plan */}
                    <section className="lg:col-span-2">
                        <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] text-gray-900">Today's Plan</h3>
                        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6">
                            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
                                <div className="flex-1">
                                    <p className="text-base font-bold leading-tight text-gray-900">Math 101: Calculus</p>
                                    <p className="mt-1 text-sm font-normal leading-normal text-gray-500">Chapter 3: Derivatives and Integrals</p>
                                </div>
                                <div
                                    className="aspect-video w-full flex-shrink-0 rounded-lg bg-cover bg-center bg-no-repeat sm:w-48"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDtXtHGTRJu1oEOqXSkDxIr8JrbdAkuuSWLWL2OqTcDqklKoEmPLpq1qsDgAtIuAsVDKHvtQm2tgXOf5gU8CFn3OKRr5RhTTlN3Dl0OpxiGKOkONy4sBM2PgvIj1H9s6fKjVAAw1ErKe_qC3oXs8OZxErjb9ED7Vv8CW-Xg0QlZgx2jzAZk9iNLhejO7Wib7vkZh62SdcYAZaDvd3dY1SEYwuTYlb3kNXHkPQY8LhqKGJCVco8emGpCAqK1zjfMI7ATMogw-vcZwIhb")',
                                    }}
                                ></div>
                            </div>
                        </div>
                        {/* Calendar */}
                        <div className="mt-6">
                            <div className="flex items-center justify-between">
                                <button className="flex size-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100">
                                    <svg fill="currentColor" height="18px" viewBox="0 0 256 256" width="18px">
                                        <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
                                    </svg>
                                </button>
                                <p className="text-base font-bold leading-tight text-gray-900">July 2024</p>
                                <button className="flex size-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100">
                                    <svg fill="currentColor" height="18px" viewBox="0 0 256 256" width="18px">
                                        <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="mt-2 grid grid-cols-7 text-center">
                                {calendarDays.map((d, idx) => (
                                    <p key={d.day + idx} className="py-2 text-xs font-bold text-gray-500">
                                        {d.day}
                                    </p>
                                ))}
                                {calendarNumbers.map((num, idx) => (
                                    <button
                                        key={num}
                                        className={`h-10 w-full rounded-full text-sm font-medium ${
                                            num === 5
                                                ? "bg-[var(--primary-color)] text-gray-900"
                                                : "text-gray-500 hover:bg-gray-100"
                                        }${idx === 0 ? " col-start-4" : ""}`}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>
                    {/* Quick Actions & Progress */}
                    <aside className="lg:col-span-1">
                        <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] text-gray-900">Quick Actions</h3>
                        <div className="mt-4 flex flex-col gap-3">
                            <button className="flex h-10 w-full cursor-pointer items-center justify-center overflow-hidden rounded-md bg-[var(--primary-color)] px-4 text-sm font-bold text-gray-900">
                                Start Session
                            </button>
                            <button className="flex h-10 w-full cursor-pointer items-center justify-center overflow-hidden rounded-md border border-gray-300 bg-white px-4 text-sm font-bold text-gray-900 hover:bg-gray-50">
                                View Notes
                            </button>
                            <button className="flex h-10 w-full cursor-pointer items-center justify-center overflow-hidden rounded-md border border-gray-300 bg-white px-4 text-sm font-bold text-gray-900 hover:bg-gray-50">
                                Upload Sources
                            </button>
                        </div>
                        <h3 className="mt-8 text-lg font-bold leading-tight tracking-[-0.015em] text-gray-900">Progress Summary</h3>
                        <div className="mt-4 space-y-4">
                            <div className="rounded-xl border border-gray-200 bg-white p-4">
                                <p className="text-sm font-medium text-gray-500">Current Streak</p>
                                <p className="mt-1 text-2xl font-bold text-gray-900">3 days</p>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-4">
                                <p className="text-sm font-medium text-gray-500">Longest Streak</p>
                                <p className="mt-1 text-2xl font-bold text-gray-900">7 days</p>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-4">
                                <p className="text-sm font-medium text-gray-500">Total Study Hours</p>
                                <p className="mt-1 text-2xl font-bold text-gray-900">25 hours</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
            {/* AI Tutor/Intro to CS layout removed as requested */}
        </div>
    );
}