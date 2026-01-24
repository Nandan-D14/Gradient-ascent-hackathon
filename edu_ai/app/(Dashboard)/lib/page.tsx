// Library/Sources page converted from HTML to Next.js/React with Tailwind CSS
"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState, ChangeEvent } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_MEGA_API_BASE_URL || "http://localhost:8000";

type FileItem = {
	id: string;
	name: string | null;
	sizeBytes: number | null;
};

const formatBytes = (bytes: number | null | undefined): string => {
	if (bytes === null || bytes === undefined) return "—";
	if (bytes === 0) return "0 B";
	const units = ["B", "KB", "MB", "GB", "TB", "PB"];
	const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
	const value = bytes / Math.pow(1024, exponent);
	return `${value.toFixed(value >= 10 || exponent === 0 ? 0 : 1)} ${units[exponent]}`;
};

const LibPage: React.FC = () => {
	const [files, setFiles] = useState<FileItem[]>([]);
	const [search, setSearch] = useState<string>("");
	const [uploading, setUploading] = useState<boolean>(false);
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const resetFileInput = () => {
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const fetchFiles = useCallback(async () => {
		setIsFetching(true);
		setError(null);
		try {
			const response = await fetch(`${API_BASE_URL}/list`);
			if (!response.ok) {
				throw new Error(`Failed to fetch files: ${response.statusText}`);
			}
			const data = await response.json();
			const items: FileItem[] = (data?.files || []).map((file: { id: string; name?: string; size_bytes?: number }) => ({
				id: file.id,
				name: file.name ?? "Untitled",
				sizeBytes: typeof file.size_bytes === "number" ? file.size_bytes : null,
			}));
			setFiles(items);
		} catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unable to load files.";
			setError(message);
		} finally {
			setIsFetching(false);
		}
	}, []);

	useEffect(() => {
		fetchFiles();
	}, [fetchFiles]);

	const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = Array.from(event.target.files || []);
		if (!selectedFiles.length) return;

		setUploading(true);
		setError(null);
		try {
			for (const file of selectedFiles) {
				const formData = new FormData();
				formData.append("file", file);

				const response = await fetch(`${API_BASE_URL}/upload`, {
					method: "POST",
					body: formData,
				});

				if (!response.ok) {
					const message = await response.text();
					throw new Error(message || "File upload failed.");
				}
			}

			await fetchFiles();
		} catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unable to upload file.";
			setError(message);
		} finally {
			setUploading(false);
			resetFileInput();
		}
	};

	const handleDelete = async (id: string) => {
		setError(null);
		try {
			const response = await fetch(`${API_BASE_URL}/files/${id}`, {
				method: "DELETE",
			});
			if (!response.ok) {
				const message = await response.text();
				throw new Error(message || "Could not delete file.");
			}
			setFiles((prev) => prev.filter((file) => file.id !== id));
		} catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unable to delete file.";
			setError(message);
		}
	};

	const filteredFiles = useMemo(() => {
		return files.filter((file) => file.name?.toLowerCase().includes(search.toLowerCase()));
	}, [files, search]);

	return (
		<div className="max-w-7xl mx-auto p-8">
			<div className="flex flex-col gap-8">
				<section className="rounded-3xl border border-gray-200 bg-gradient-to-r from-blue-50 via-white to-blue-50 p-6 shadow-sm">
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
						<div className="flex items-center gap-3">
							<span className="material-symbols-outlined text-3xl text-blue-500">search</span>
							<div>
								<h2 className="text-xl font-semibold text-gray-900">Mega library</h2>
								<p className="text-sm text-gray-500">Search across the files stored in your Mega account.</p>
							</div>
						</div>
						<div className="flex w-full flex-col gap-3 md:max-w-md">
							<div className="relative">
								<svg className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"></circle><line x1="21" x2="16.65" y1="21" y2="16.65"></line></svg>
								<input
									className="h-11 w-full rounded-full border border-blue-100 bg-white pl-10 pr-4 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
									placeholder="Search by name"
									type="text"
									value={search}
									onChange={(event) => setSearch(event.target.value)}
								/>
							</div>
							<button
								onClick={fetchFiles}
								className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-blue-600 transition hover:bg-blue-50"
								disabled={isFetching}
							>
								<span className="material-symbols-outlined text-base">refresh</span>
								{isFetching ? "Refreshing" : "Refresh"}
							</button>
						</div>
					</div>
				</section>
				<section className="rounded-3xl border border-gray-200 bg-gradient-to-r from-blue-50 via-white to-blue-50 p-6 shadow-sm">
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
						<div className="space-y-1">
							<h2 className="text-xl font-semibold text-gray-900">Upload sources</h2>
							<p className="text-sm text-gray-500">Send documents directly to Mega using the Brain backend.</p>
							<p className="text-xs text-gray-400">Supported formats depend on your Mega plan. Keep file names unique for easier tracking.</p>
						</div>
						<div className="flex flex-wrap gap-3">
							<button
								className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
								onClick={() => fileInputRef.current?.click()}
								disabled={uploading}
							>
								<span className="material-symbols-outlined text-base">upload_file</span>
								{uploading ? "Uploading…" : "Upload from device"}
							</button>
						</div>
					</div>
					<input
						type="file"
						multiple
						ref={fileInputRef}
						onChange={handleFileChange}
						className="hidden"
						disabled={uploading}
					/>
				</section>
				<section className="rounded-3xl border border-gray-200 bg-gradient-to-r from-blue-50 via-white to-blue-50 p-6 shadow-sm">
					<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
						<div className="space-y-1">
							<h2 className="text-xl font-semibold text-gray-900">Library contents</h2>
							<p className="text-sm text-gray-500">Files are pulled live from Mega whenever you refresh.</p>
						</div>
						<span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-600">
							<span className="material-symbols-outlined text-base">auto_awesome_motion</span>
							{filteredFiles.length} item{filteredFiles.length === 1 ? "" : "s"}
						</span>
					</div>
					{error && (
						<div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
							<span className="material-symbols-outlined mr-2 align-middle text-base">error</span>
							{error}
						</div>
					)}
					<div className="mt-4 overflow-hidden rounded-2xl border border-white/70 bg-white shadow-sm">
						<table className="w-full text-left text-sm">
							<thead className="bg-slate-100/70 text-slate-700">
								<tr>
									<th className="px-6 py-3 font-semibold">Name</th>
									<th className="px-6 py-3 font-semibold">Size</th>
									<th className="px-6 py-3 font-semibold">File ID</th>
									<th className="px-6 py-3 font-semibold">Actions</th>
								</tr>
							</thead>
							<tbody>
								{isFetching && (
									<tr>
										<td colSpan={4} className="px-6 py-6 text-center text-gray-400">
											Loading files…
										</td>
									</tr>
								)}
								{!isFetching && filteredFiles.length === 0 && (
									<tr>
										<td colSpan={4} className="px-6 py-6 text-center text-gray-400">No files found.</td>
									</tr>
								)}
								{filteredFiles.map((file) => (
									<tr key={file.id} className="border-t border-slate-100/60 hover:bg-slate-50">
										<td className="px-6 py-4 font-medium text-slate-900">{file.name}</td>
										<td className="px-6 py-4 text-slate-600">{formatBytes(file.sizeBytes)}</td>
										<td className="px-6 py-4 text-xs text-slate-500">
											<span className="inline-flex items-center gap-2">
												<span className="truncate max-w-[160px]">{file.id}</span>
												<button
													onClick={() => navigator.clipboard.writeText(file.id)}
													className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-600 transition hover:bg-blue-100"
												>
													Copy
												</button>
											</span>
										</td>
										<td className="px-6 py-4">
											<button
												onClick={() => handleDelete(file.id)}
												className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 transition hover:bg-rose-100"
												disabled={uploading}
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
