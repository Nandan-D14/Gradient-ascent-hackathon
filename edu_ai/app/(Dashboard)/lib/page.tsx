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
			<div className="relative mb-8">
				<svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"></circle><line x1="21" x2="16.65" y1="21" y2="16.65"></line></svg>
				<input
					className="w-full h-12 pl-12 pr-4 rounded-md border border-[var(--border-color)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition"
					placeholder="Search sources"
					type="text"
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
			</div>
			<h2 className="text-2xl font-bold tracking-tight mb-4">Upload Sources</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
				<button
					className="flex items-center gap-4 p-4 border border-[var(--border-color)] rounded-md bg-white hover:shadow-sm transition-shadow cursor-pointer"
					onClick={() => fileInputRef.current && fileInputRef.current.click()}
					disabled={uploading}
				>
					<svg className="text-red-500" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" x2="12" y1="18" y2="12"></line><line x1="9" x2="15" y1="15" y2="15"></line></svg>
					<span className="font-semibold">Upload File</span>
					<input
						ref={fileInputRef}
						type="file"
						multiple
						className="hidden"
						onChange={handleFileChange}
						disabled={uploading}
					/>
				</button>
			</div>
			<h2 className="text-2xl font-bold tracking-tight mb-4">Recent Sources</h2>
			<div className="overflow-x-auto bg-white border border-[var(--border-color)] rounded-md">
				<table className="w-full text-sm text-left">
					<thead className="bg-slate-50 border-b border-[var(--border-color)]">
						<tr>
							<th className="px-6 py-3 font-medium text-slate-900" scope="col">Name</th>
							<th className="px-6 py-3 font-medium text-slate-900" scope="col">Type</th>
							<th className="px-6 py-3 font-medium text-slate-900" scope="col">Last Modified</th>
							<th className="px-6 py-3 font-medium text-slate-900" scope="col">Actions</th>
						</tr>
					</thead>
					<tbody>
						{filteredFiles.length === 0 && (
							<tr>
								<td colSpan={4} className="px-6 py-4 text-center text-gray-400">No files found.</td>
							</tr>
						)}
						{filteredFiles.map((file) => (
							<tr key={file.id} className="border-b border-[var(--border-color)] hover:bg-slate-50">
								<td className="px-6 py-4 font-medium text-slate-800">{file.name}</td>
								<td className="px-6 py-4 text-[var(--secondary-text)]">{file.type}</td>
								<td className="px-6 py-4 text-[var(--secondary-text)]">{file.lastModified}</td>
								<td className="px-6 py-4">
									<button
										className="text-red-500 hover:underline text-xs font-medium"
										onClick={() => handleDelete(file.id)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
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
