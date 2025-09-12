
import React from "react";

const TutorPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col font-sans bg-white">
      <div className="flex h-full grow">
        <aside className="w-80 border-r border-gray-200 p-6 flex flex-col gap-8 sticky top-0 h-screen">
          <div className="flex flex-col">
            <h1 className="text-gray-900 text-lg font-bold">AI Tutor</h1>
            <p className="text-gray-500 text-sm">Learn Computer Science</p>
          </div>
          <nav className="flex flex-col gap-2">
            <a className="flex items-center gap-3 px-3 py-2 rounded-md bg-gray-100 text-gray-900 font-medium text-sm" href="#">
              <span className="material-symbols-outlined text-gray-600">book</span>
              Introduction
            </a>
            <a className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700 font-medium text-sm" href="#">
              <span className="material-symbols-outlined text-gray-500">data_object</span>
              Data Structures
            </a>
            <a className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700 font-medium text-sm" href="#">
              <span className="material-symbols-outlined text-gray-500">memory</span>
              Algorithms
            </a>
            <a className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700 font-medium text-sm" href="#">
              <span className="material-symbols-outlined text-gray-500">speed</span>
              Complexity Analysis
            </a>
            <a className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700 font-medium text-sm" href="#">
              <span className="material-symbols-outlined text-gray-500">science</span>
              Advanced Topics
            </a>
          </nav>
        </aside>
        <main className="flex-1 max-w-[960px] mx-auto px-12 py-10">
          <div className="flex flex-col gap-8">
            <h1 className="text-gray-900 text-4xl font-bold tracking-tight">Introduction to Computer Science</h1>
            <p className="text-gray-600 text-base leading-relaxed">
              Computer science is the study of computation, automation, and information. It encompasses both theoretical disciplines (such as algorithms, theory of computation, and information theory) and practical disciplines (including the design and implementation of hardware and software).
            </p>
            <div className="border-t border-gray-200 my-4"></div>
            <h2 className="text-gray-900 text-2xl font-bold tracking-tight">Key Concepts</h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Understanding the fundamental concepts is crucial for mastering computer science. These include data structures, algorithms, and complexity analysis.
            </p>
            <div className="flex flex-col gap-4">
              <details className="group rounded-md border border-gray-200" open>
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-4 list-none">
                  <span className="text-gray-900 font-medium">Data Structures</span>
                  <span className="material-symbols-outlined text-gray-500 transition-transform duration-200 group-open:rotate-180">expand_more</span>
                </summary>
                <div className="p-4 pt-0">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Data structures are ways of organizing and storing data so that it can be used efficiently. Examples include arrays, linked lists, trees, and hash tables.
                  </p>
                </div>
              </details>
              <details className="group rounded-md border border-gray-200">
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-4 list-none">
                  <span className="text-gray-900 font-medium">Algorithms</span>
                  <span className="material-symbols-outlined text-gray-500 transition-transform duration-200 group-open:rotate-180">expand_more</span>
                </summary>
                <div className="p-4 pt-0">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    An algorithm is a finite sequence of well-defined, computer-implementable instructions, typically to solve a class of specific problems or to perform a computation.
                  </p>
                </div>
              </details>
              <details className="group rounded-md border border-gray-200">
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-4 list-none">
                  <span className="text-gray-900 font-medium">Complexity Analysis</span>
                  <span className="material-symbols-outlined text-gray-500 transition-transform duration-200 group-open:rotate-180">expand_more</span>
                </summary>
                <div className="p-4 pt-0">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Complexity analysis is the study of the resources (such as time and space) required by an algorithm to solve a problem. It helps in comparing the efficiency of different algorithms.
                  </p>
                </div>
              </details>
            </div>
            <div className="border-t border-gray-200 my-4"></div>
            <div className="flex items-center gap-4 flex-wrap">
              <button className="flex items-center justify-center gap-2 rounded-md bg-gray-100 h-10 px-4 text-gray-800 text-sm font-medium hover:bg-gray-200 transition-colors">
                <span className="material-symbols-outlined text-base">compress</span>
                Summarize
              </button>
              <button className="flex items-center justify-center gap-2 rounded-md bg-gray-100 h-10 px-4 text-gray-800 text-sm font-medium hover:bg-gray-200 transition-colors">
                <span className="material-symbols-outlined text-base">quiz</span>
                Quiz Me
              </button>
              <button className="flex items-center justify-center gap-2 rounded-md bg-gray-100 h-10 px-4 text-gray-800 text-sm font-medium hover:bg-gray-200 transition-colors">
                <span className="material-symbols-outlined text-base">view_in_ar</span>
                Show 3D
              </button>
              <button className="flex items-center justify-center gap-2 rounded-md bg-gray-100 h-10 px-4 text-gray-800 text-sm font-medium hover:bg-gray-200 transition-colors">
                <span className="material-symbols-outlined text-base">work</span>
                Real-World Example
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TutorPage;
