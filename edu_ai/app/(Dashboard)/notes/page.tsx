
"use client";
import React, { useState, useRef } from "react";

// Material Symbols font import for Next.js
const MaterialSymbols = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
    rel="stylesheet"
  />
);

const collapsibleData = [
  {
    id: "chapter1",
    title: "Chapter 1: Foundations",
    sections: [
      {
        id: "limits",
        title: "1.1 Limits and Continuity",
        content: (
          <>
            <p className="text-[#a3a3a3] mt-4">
              Understanding limits and continuity is crucial for grasping advanced calculus concepts. We explore the formal definitions and provide examples.
            </p>
            <div className="my-6 p-4 rounded-md bg-[#f5f5f5] border border-[#262626]">
              <h4 className="font-semibold text-black">Theorem: Epsilon-Delta Definition of a Limit</h4>
              <p className="text-sm text-[#525252] mt-2">Let f be a function defined on an open interval containing c (except possibly at c) and let L be a real number. The statement lim f(x) = L as x→c means that for each ε &gt; 0 there exists a δ &gt; 0 such that if 0 &lt; |x - c| &lt; δ, then |f(x) - L| &lt; ε.</p>
            </div>
          </>
        ),
      },
      {
        id: "differentiation",
        title: "1.2 Differentiation in Multiple Dimensions",
        content: (
          <p className="text-[#a3a3a3] mt-4">
            This section extends the concept of differentiation to functions of multiple variables, introducing partial derivatives and the gradient.
          </p>
        ),
      },
    ],
    summary: "This chapter lays the groundwork for advanced calculus, covering topics such as limits, continuity, and differentiation in multiple dimensions.",
  },
  {
    id: "chapter2",
    title: "Chapter 2: Advanced Concepts",
    sections: [
      {
        id: "vector-calculus",
        title: "2.1 Vector Calculus",
        content: (
          <p className="text-[#a3a3a3] mt-2">
            Vector calculus deals with the differentiation and integration of vector fields. Key concepts include divergence, curl, and line integrals.
          </p>
        ),
      },
      {
        id: "differential-equations",
        title: "2.2 Differential Equations",
        content: (
          <p className="text-[#a3a3a3] mt-2">
            This section covers various types of differential equations and methods for solving them, including separation of variables and integrating factors.
          </p>
        ),
      },
    ],
    summary: "Building on the foundations, this chapter delves into more advanced topics such as vector calculus and differential equations.",
  },
  {
    id: "chapter3",
    title: "Chapter 3: Applications",
    sections: [
      {
        id: "optimization",
        title: "3.1 Optimization Problems",
        content: (
          <p className="text-[#a3a3a3] mt-2">
            We apply calculus techniques to solve optimization problems, finding maxima and minima of functions subject to constraints.
          </p>
        ),
      },
      {
        id: "fluid-dynamics",
        title: "3.2 Fluid Dynamics",
        content: (
          <p className="text-[#a3a3a3] mt-2">
            This section introduces the basic principles of fluid dynamics and uses calculus to model fluid flow.
          </p>
        ),
      },
    ],
    summary: "This chapter explores real-world applications of advanced calculus, such as optimization problems and fluid dynamics.",
  },
];

const navLinks = [
  { href: "#introduction", label: "Introduction" },
  { href: "#chapter1", label: "Chapter 1: Foundations" },
  { href: "#chapter2", label: "Chapter 2: Advanced Concepts" },
  { href: "#chapter3", label: "Chapter 3: Applications" },
  { href: "#conclusion", label: "Conclusion" },
];


const NotesPage = () => {
  const [openChapters, setOpenChapters] = useState<{ [key: string]: boolean }>({ chapter1: true });
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({ limits: false, differentiation: false });
  const [summary, setSummary] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const toggleChapter = (id: string) => {
    setOpenChapters((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    setSummary("");
    try {
      // Upload PDF to backend
      const formData = new FormData();
      formData.append("file", file);
      const uploadRes = await fetch("http://localhost:5000/api/upload_pdf", {
        method: "POST",
        body: formData,
      });
      if (!uploadRes.ok) {
        const text = await uploadRes.text();
        setError(`Upload failed: ${text}`);
        setUploading(false);
        return;
      }
      const uploadData = await uploadRes.json();
      if (uploadData.status !== "success") {
        setError(uploadData.message || "Failed to process PDF");
        setUploading(false);
        return;
      }
      // Fetch summary from backend
      const summaryRes = await fetch("http://localhost:5000/api/summary", {
        method: "POST",
      });
      if (!summaryRes.ok) {
        const text = await summaryRes.text();
        setError(`Summary failed: ${text}`);
        setUploading(false);
        return;
      }
      const summaryData = await summaryRes.json();
      if (summaryData.status === "success") {
        setSummary(summaryData.summary);
      } else {
        setError(summaryData.message || "Failed to generate summary");
      }
    } catch (err: any) {
      setError("Error uploading or summarizing file. If running locally, check CORS and backend server status.");
      console.error(err);
    }
    setUploading(false);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-white" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <MaterialSymbols />
      <div className="flex h-full grow">
        <aside className="sticky top-0 h-screen w-72 flex-shrink-0 border-r border-[#262626] p-6 bg-white">
          <nav className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-black">ON THIS PAGE</h4>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a className="text-sm text-black font-medium leading-normal hover:underline" href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1 px-8 py-10 md:px-12 lg:px-16 bg-white">
          <div className="prose max-w-none">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-black text-4xl font-bold tracking-tight">AI-Generated Notes</h1>
                <p className="text-sm text-[#a3a3a3]">Upload a PDF to generate notes using RAG</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="flex items-center gap-2 rounded-md bg-[#f5f5f5] px-3 py-2 text-sm font-medium text-black hover:bg-[#e5e5e5]"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  <span className="material-symbols-outlined text-base">upload</span>
                  {uploading ? "Uploading..." : "Upload PDF"}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={uploading}
                />
              </div>
            </div>
            {error && <div className="mb-4 text-red-500 font-medium">{error}</div>}
            {summary && (
              <section className="mb-8 p-4 bg-[#f5f5f5] border border-[#262626] rounded-md">
                <h2 className="text-black text-2xl font-semibold mb-2">Summary</h2>
                <p className="text-[#525252] whitespace-pre-line">{summary}</p>
              </section>
            )}
            {/* ...existing notes content... */}
            <section id="introduction">
              <h2 className="text-black text-2xl font-semibold border-b border-[#262626] pb-3">Introduction</h2>
              <p className="text-[#a3a3a3]">
                This section provides an overview of the key concepts covered in the textbook, including differential equations, vector calculus, and complex analysis.
              </p>
            </section>
            {collapsibleData.map((chapter) => (
              <section id={chapter.id} key={chapter.id}>
                <h2 className="text-black text-2xl font-semibold border-b border-[#262626] pb-3 mt-12 flex items-center cursor-pointer" onClick={() => toggleChapter(chapter.id)}>
                  {chapter.title}
                  <span className={`material-symbols-outlined ml-2 text-black transition-transform duration-300 ${openChapters[chapter.id] ? 'rotate-90' : ''}`}>chevron_right</span>
                </h2>
                {openChapters[chapter.id] && (
                  <>
                    <p className="text-[#a3a3a3]">{chapter.summary}</p>
                    {chapter.sections.map((section) => (
                      <div className="mt-8" key={section.id}>
                        <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection(section.id)}>
                          <h3 className="text-black text-xl font-semibold" id={section.id}>{section.title}</h3>
                          <span className={`material-symbols-outlined text-black transition-transform duration-300 ${openSections[section.id] ? 'rotate-90' : ''}`}>chevron_right</span>
                        </div>
                        {openSections[section.id] && (
                          <div className="mt-2">
                            {section.content}
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </section>
            ))}
            <section id="conclusion">
              <h2 className="text-black text-2xl font-semibold border-b border-[#262626] pb-3 mt-12">Conclusion</h2>
              <p className="text-[#a3a3a3]">
                This concludes the AI-generated notes on advanced calculus. We hope these notes provide a helpful supplement to your studies.
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotesPage;python app.py