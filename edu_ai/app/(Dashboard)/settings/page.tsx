// Settings page converted from HTML to Next.js/React with Tailwind CSS
import React from "react";


const SettingsPage = () => {
	return (
		<div className="max-w-4xl mx-auto p-8">
			<h1 className="text-3xl font-bold text-neutral-900 mb-8">Settings</h1>
			<div className="space-y-12">
				{/* Appearance Section */}
				<section>
					<h2 className="text-xl font-semibold text-neutral-800 pb-4 border-b border-neutral-200 mb-6">Appearance</h2>
					<div className="flex items-center justify-between">
						<div>
							<h3 className="text-base font-medium text-neutral-900">Theme</h3>
							<p className="text-sm text-neutral-500 mt-1">Choose between a light or dark theme for the interface.</p>
						</div>
						<div className="flex items-center gap-2 rounded-lg bg-neutral-200 p-1">
							<button className="px-3 py-1.5 rounded-md text-sm font-medium bg-white text-neutral-800 shadow-sm">
								<span className="material-symbols-outlined text-lg align-bottom mr-1">light_mode</span> Light
							</button>
							<button className="px-3 py-1.5 rounded-md text-sm font-medium text-neutral-600 hover:text-neutral-800">
								<span className="material-symbols-outlined text-lg align-bottom mr-1">dark_mode</span> Dark
							</button>
						</div>
					</div>
				</section>
				{/* Language & Region Section */}
				<section>
					<h2 className="text-xl font-semibold text-neutral-800 pb-4 border-b border-neutral-200 mb-6">Language &amp; Region</h2>
					<div className="flex items-center justify-between hover:bg-neutral-100 p-4 -m-4 rounded-lg cursor-pointer">
						<div>
							<h3 className="text-base font-medium text-neutral-900">Language</h3>
							<p className="text-sm text-neutral-500 mt-1">Select your preferred language for the platform.</p>
						</div>
						<div className="flex items-center gap-2 text-neutral-600">
							<span className="text-sm font-medium">English (US)</span>
							<span className="material-symbols-outlined text-xl text-neutral-400">chevron_right</span>
						</div>
					</div>
				</section>
				{/* Privacy & Data Section */}
				<section>
					<h2 className="text-xl font-semibold text-neutral-800 pb-4 border-b border-neutral-200 mb-6">Privacy &amp; Data</h2>
					<div className="flex items-center justify-between hover:bg-neutral-100 p-4 -m-4 rounded-lg cursor-pointer">
						<div>
							<h3 className="text-base font-medium text-neutral-900">Manage Data</h3>
							<p className="text-sm text-neutral-500 mt-1">Export or delete your personal data.</p>
						</div>
						<div className="flex items-center gap-2 text-neutral-600">
							<span className="material-symbols-outlined text-xl text-neutral-400">chevron_right</span>
						</div>
					</div>
					<div className="mt-4 flex items-center justify-between hover:bg-neutral-100 p-4 -m-4 rounded-lg cursor-pointer">
						<div>
							<h3 className="text-base font-medium text-neutral-900">Privacy Policy</h3>
							<p className="text-sm text-neutral-500 mt-1">Read our privacy policy to understand how we handle your data.</p>
						</div>
						<div className="flex items-center gap-2 text-neutral-600">
							<span className="material-symbols-outlined text-xl text-neutral-400">open_in_new</span>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default SettingsPage;
