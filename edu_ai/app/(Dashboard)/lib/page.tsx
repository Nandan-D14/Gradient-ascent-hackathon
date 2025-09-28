// Library/Sources page converted from HTML to Next.js/React with Tailwind CSS
"use client";
import React, { useRef, useState, ChangeEvent } from "react";




// Type for a file item in the list
type FileItem = {
	id: string;
	name: string;
	type: string;
	lastModified: string;
};

const LibPage: React.FC = () => {
	const [files, setFiles] = useState<FileItem[]>([]);
	const [uploading, setUploading] = useState<boolean>(false);
	const [fileInputOpen, setFileInputOpen] = useState<boolean>(false);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [search, setSearch] = useState<string>("");


	// TODO: Integrate Google Drive API here. You will need to provide your Google Drive credentials/link in this section.
	// For example, you might call your backend API that handles Google Drive upload, passing the file and your Drive folder ID/link.
	// Example placeholder:
	// const GOOGLE_DRIVE_FOLDER_ID = "<YOUR_GOOGLE_DRIVE_FOLDER_ID_HERE>";

	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = Array.from(e.target.files || []);
		setUploading(true);
		// TODO: Upload to Google Drive here using your Drive link/folder ID
		// Simulate upload and add to local state
		setTimeout(() => {
			setFiles((prev) => [
				...selectedFiles.map((f) => ({
					name: f.name,
					type: f.type || "Unknown",
					lastModified: new Date().toLocaleString(),
					id: Math.random().toString(36).slice(2),
				})),
				...prev,
			]);
			setUploading(false);
		}, 1000);
	};


	const handleDelete = (id: string) => {
		// TODO: Delete from Google Drive here using your Drive link/folder ID
		setFiles((prev) => prev.filter((f) => f.id !== id));
	};


	const filteredFiles = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));


	return (
		<div className="max-w-7xl mx-auto p-8">
			<div className="flex flex-col gap-8">
				<section className="rounded-3xl border border-gray-200 bg-gradient-to-r from-blue-50 via-white to-blue-50 p-6 shadow-sm">
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
						<div className="flex items-center gap-3">
							<span className="material-symbols-outlined text-3xl text-blue-500">search</span>
							<div>
								<h2 className="text-xl font-semibold text-gray-900">Library search</h2>
								<p className="text-sm text-gray-500">Find uploaded sources or filter by name instantly.</p>
							</div>
						</div>
						<div className="relative w-full max-w-md">
							<svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"></circle><line x1="21" x2="16.65" y1="21" y2="16.65"></line></svg>
							<input
								className="h-11 w-full rounded-full border border-blue-100 bg-white pl-10 pr-4 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
								placeholder="Search sources"
								type="text"
								value={search}
								onChange={e => setSearch(e.target.value)}
							/>
						</div>
					</div>
				</section>
				<section className="rounded-3xl border border-gray-200 bg-gradient-to-r from-blue-50 via-white to-blue-50 p-6 shadow-sm">
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
						<div className="space-y-1">
							<h2 className="text-xl font-semibold text-gray-900">Google Drive</h2>
							<p className="text-sm text-gray-500">Connect your Drive to import study sources instantly.</p>
						</div>
						<div className="flex flex-wrap items-center gap-3">
							<button className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50">
								<span className="material-symbols-outlined text-base">cloud_done</span>
								Manage connection
							</button>
							<button className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
								<span className="material-symbols-outlined text-base">sync</span>
								Connect Google Drive
							</button>
						</div>
					</div>
					<div className="mt-4 grid gap-4 text-sm text-gray-600 md:grid-cols-2">
						<div className="flex items-center gap-3 rounded-2xl border border-white bg-white/60 px-4 py-3">
							<span className="material-symbols-outlined text-blue-500">folder_managed</span>
							<span>Auto-sync starred folders and shared docs.</span>
						</div>
						<div className="flex items-center gap-3 rounded-2xl border border-white bg-white/60 px-4 py-3">
							<span className="material-symbols-outlined text-blue-500">lock</span>
							<span>Your files stay private. We only store metadata.</span>
						</div>
					</div>
				</section>
				<section className="rounded-3xl border border-gray-200 bg-gradient-to-r from-blue-50 via-white to-blue-50 p-6 shadow-sm">
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
						<div className="space-y-1">
							<h2 className="text-xl font-semibold text-gray-900">Upload sources</h2>
							<p className="text-sm text-gray-500">Bring new notes from your device or drag-and-drop files.</p>
							<p className="text-xs text-gray-400">Supported: PDF, DOCX, TXT (≤10 MB each)</p>
						</div>
						<button
							className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
							onClick={() => fileInputRef.current && fileInputRef.current.click()}
							disabled={uploading}
						>
							<span className="material-symbols-outlined text-base">upload_file</span>
							{uploading ? "Uploading…" : "Upload from device"}
						</button>
					</div>
					<input
						ref={fileInputRef}
						type="file"
						multiple
						className="hidden"
						onChange={handleFileChange}
						disabled={uploading}
					/>
				</section>
				<section className="rounded-3xl border border-gray-200 bg-gradient-to-r from-blue-50 via-white to-blue-50 p-6 shadow-sm">
					<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
						<div className="space-y-1">
							<h2 className="text-xl font-semibold text-gray-900">Recent sources</h2>
							<p className="text-sm text-gray-500">Review your latest uploads and manage them in one place.</p>
						</div>
						<span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-600">
							<span className="material-symbols-outlined text-base">auto_awesome_motion</span>
							{filteredFiles.length} item{filteredFiles.length === 1 ? "" : "s"}
						</span>
					</div>
					<div className="mt-4 overflow-hidden rounded-2xl border border-white/70 bg-white shadow-sm">
						<table className="w-full text-left text-sm">
							<thead className="bg-slate-100/70 text-slate-700">
								<tr>
									<th className="px-6 py-3 font-semibold">Name</th>
									<th className="px-6 py-3 font-semibold">Type</th>
									<th className="px-6 py-3 font-semibold">Last Modified</th>
									<th className="px-6 py-3 font-semibold">Actions</th>
								</tr>
							</thead>
							<tbody>
								{filteredFiles.length === 0 && (
									<tr>
										<td colSpan={4} className="px-6 py-6 text-center text-gray-400">No files found.</td>
									</tr>
								)}
								{filteredFiles.map((file) => (
									<tr key={file.id} className="border-t border-slate-100/60 hover:bg-slate-50">
										<td className="px-6 py-4 font-medium text-slate-900">{file.name}</td>
										<td className="px-6 py-4 text-slate-600">{file.type}</td>
										<td className="px-6 py-4 text-slate-600">{file.lastModified}</td>
										<td className="px-6 py-4">
											<button
												className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 transition hover:bg-rose-100"
												onClick={() => handleDelete(file.id)}
											>
												<span className="material-symbols-outlined text-sm">delete</span>
												Remove
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</section>
			</div>
			{uploading && (
				<div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
						<span className="loader border-4 border-blue-500 border-t-transparent rounded-full w-8 h-8 animate-spin"></span>
						<span className="text-gray-700 font-medium">Uploading...</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default LibPage;
