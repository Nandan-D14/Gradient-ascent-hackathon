// Library/Sources page converted from HTML to Next.js/React with Tailwind CSS
import React from "react";


const LibPage = () => {
	return (
		<div className="max-w-7xl mx-auto p-8">
			<div className="relative mb-8">
				<svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"></circle><line x1="21" x2="16.65" y1="21" y2="16.65"></line></svg>
				<input className="w-full h-12 pl-12 pr-4 rounded-md border border-[var(--border-color)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition" placeholder="Search sources" type="text" />
			</div>
			<h2 className="text-2xl font-bold tracking-tight mb-4">Upload Sources</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
				<div className="flex items-center gap-4 p-4 border border-[var(--border-color)] rounded-md bg-white hover:shadow-sm transition-shadow cursor-pointer">
					<svg className="text-red-500" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" x2="12" y1="18" y2="12"></line><line x1="9" x2="15" y1="15" y2="15"></line></svg>
					<span className="font-semibold">Upload PDF</span>
				</div>
				<div className="flex items-center gap-4 p-4 border border-[var(--border-color)] rounded-md bg-white hover:shadow-sm transition-shadow cursor-pointer">
					<svg className="text-blue-500" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M12 18v-6"></path><path d="M9 15h6"></path></svg>
					<span className="font-semibold">Upload Doc</span>
				</div>
				<div className="flex items-center gap-4 p-4 border border-[var(--border-color)] rounded-md bg-white hover:shadow-sm transition-shadow cursor-pointer">
					<svg className="text-green-500" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" x2="8" y1="13" y2="13"></line><line x1="16" x2="8" y1="17" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
					<span className="font-semibold">Upload Note</span>
				</div>
			</div>
			<h2 className="text-2xl font-bold tracking-tight mb-4">Recent Sources</h2>
			<div className="overflow-x-auto bg-white border border-[var(--border-color)] rounded-md">
				<table className="w-full text-sm text-left">
					<thead className="bg-slate-50 border-b border-[var(--border-color)]">
						<tr>
							<th className="px-6 py-3 font-medium text-slate-900" scope="col">Name</th>
							<th className="px-6 py-3 font-medium text-slate-900" scope="col">Type</th>
							<th className="px-6 py-3 font-medium text-slate-900" scope="col">Last Modified</th>
						</tr>
					</thead>
					<tbody>
						<tr className="border-b border-[var(--border-color)] hover:bg-slate-50">
							<td className="px-6 py-4 font-medium text-slate-800">Calculus Notes</td>
							<td className="px-6 py-4 text-[var(--secondary-text)]">Note</td>
							<td className="px-6 py-4 text-[var(--secondary-text)]">2 days ago</td>
						</tr>
						<tr className="border-b border-[var(--border-color)] hover:bg-slate-50">
							<td className="px-6 py-4 font-medium text-slate-800">Physics Textbook</td>
							<td className="px-6 py-4 text-[var(--secondary-text)]">PDF</td>
							<td className="px-6 py-4 text-[var(--secondary-text)]">1 week ago</td>
						</tr>
						<tr className="hover:bg-slate-50">
							<td className="px-6 py-4 font-medium text-slate-800">English Essay</td>
							<td className="px-6 py-4 text-[var(--secondary-text)]">Doc</td>
							<td className="px-6 py-4 text-[var(--secondary-text)]">2 weeks ago</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default LibPage;
