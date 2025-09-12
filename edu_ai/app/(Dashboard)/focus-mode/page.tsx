import React from "react";

// Material Symbols font import for Next.js
const MaterialSymbols = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
    rel="stylesheet"
  />
);

const FocusModePage = () => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-white" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <MaterialSymbols />
      <header className="flex items-center justify-between whitespace-nowrap border-b border-gray-200 px-10 py-3">
        <div className="flex items-center gap-4 text-gray-900">
          <div className="size-8 text-[#0d7ff2]">
            <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9h4v2h-4v-2zm-2-4h8v2h-8V7z"></path></svg>
          </div>
          <h2 className="text-gray-900 text-lg font-bold">StudyAI</h2>
        </div>
        <div className="flex items-center gap-6">
          <span className="inline-flex items-center gap-1 text-sm font-medium text-gray-700">
            <span className="material-symbols-outlined text-lg text-yellow-500">local_fire_department</span>
            3 days streak
          </span>
          <button className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0d7ff2]">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-red-500 border-2 border-white"></span>
          </button>
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuALsTi6uf8bjjS3TLX6B4uDCPu_9jszXj1YcdP2Eu5gXnkSRl-EfbHy2xFZOXZjcPxR02VFPiLWPnkbCgw0I-GdhhNx6tiP7crPJXR76F9R1-t43bfkWA8Zm_T8QThZ9SRBg8rdbVOVjFkRMrRcZLAHU8KwgNkjeffinmV-jvrr_3oXNLbRCixJ-ZccVZyoM599bO-WqV8c4MVBc74k4xt1Yijd7poCvHpPX0i7yDPivC8Fr3U2rEoAdIOnP6Wyg7lK8RSk6xhRdPk")' }}></div>
        </div>
      </header>
      <main className="flex-1 w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-gray-900">Focus Mode</h1>
          <p className="mt-2 text-lg text-gray-600">Your quiet space to concentrate.</p>
          <div className="mt-12 flex items-center justify-center space-x-4 text-center">
            <div className="flex flex-col items-center p-4 rounded-lg min-w-[120px]">
              <span className="text-7xl font-bold text-gray-900 tracking-tighter">00</span>
              <span className="text-sm text-gray-500">HOURS</span>
            </div>
            <span className="text-7xl font-bold text-gray-400">:</span>
            <div className="flex flex-col items-center p-4 rounded-lg min-w-[120px]">
              <span className="text-7xl font-bold text-gray-900 tracking-tighter">25</span>
              <span className="text-sm text-gray-500">MINUTES</span>
            </div>
            <span className="text-7xl font-bold text-gray-400">:</span>
            <div className="flex flex-col items-center p-4 rounded-lg min-w-[120px]">
              <span className="text-7xl font-bold text-gray-900 tracking-tighter">00</span>
              <span className="text-sm text-gray-500">SECONDS</span>
            </div>
          </div>
          <button className="mt-12 inline-flex items-center justify-center rounded-md bg-[#0d7ff2] px-12 py-4 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0d7ff2]">
            <span className="material-symbols-outlined mr-2">play_arrow</span>
            Start Studying
          </button>
        </div>
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Distraction Detection</h3>
            <div className="mt-4 aspect-video w-full rounded-md bg-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <span className="material-symbols-outlined text-4xl">videocam_off</span>
                <p>Webcam preview is off</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">Enable webcam to monitor focus.</p>
              <label className="relative inline-flex items-center cursor-pointer">
                <input className="sr-only peer" type="checkbox" value="" readOnly />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-[#0d7ff2] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0d7ff2]"></div>
              </label>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-4 p-3 rounded-md bg-gray-50">
                <div className="flex-shrink-0">
                  <span className="material-symbols-outlined text-green-500">check_circle</span>
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-800">Assignment Graded</p>
                  <p className="text-sm text-gray-600">Your "Calculus II" assignment has been graded. Well done!</p>
                  <span className="text-xs text-gray-400">2 minutes ago</span>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 rounded-md bg-gray-50">
                <div className="flex-shrink-0">
                  <span className="material-symbols-outlined text-blue-500">campaign</span>
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-800">New Course Available</p>
                  <p className="text-sm text-gray-600">"Introduction to Quantum Physics" is now open for enrollment.</p>
                  <span className="text-xs text-gray-400">1 hour ago</span>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 rounded-md bg-gray-50">
                <div className="flex-shrink-0">
                  <span className="material-symbols-outlined text-orange-500">task_alt</span>
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-800">Study Reminder</p>
                  <p className="text-sm text-gray-600">Don't forget your daily goal for "Organic Chemistry".</p>
                  <span className="text-xs text-gray-400">3 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FocusModePage;
