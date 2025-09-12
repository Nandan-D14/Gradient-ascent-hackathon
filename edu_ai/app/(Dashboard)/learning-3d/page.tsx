import React from "react";

// Material Symbols font import for Next.js
const MaterialSymbols = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
    rel="stylesheet"
  />
);

const Learning3DPage = () => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <MaterialSymbols />
      <div className="flex min-h-screen">
        <aside className="w-80 border-r border-slate-200 bg-slate-50/50 p-4 flex flex-col">
          <h2 className="text-slate-900 text-lg font-bold tracking-tight px-2 pb-2 pt-4">Models</h2>
          <nav className="flex flex-col gap-1">
            <a className="flex items-center gap-3 rounded-md px-3 py-2 text-slate-700 transition-colors hover:bg-slate-200/60" href="#">
              <span className="material-symbols-outlined text-slate-500">science</span>
              <span className="font-medium">Molecule A</span>
            </a>
            <a className="flex items-center gap-3 rounded-md px-3 py-2 text-slate-700 transition-colors hover:bg-slate-200/60" href="#">
              <span className="material-symbols-outlined text-slate-500">science</span>
              <span className="font-medium">Molecule B</span>
            </a>
            <a className="flex items-center gap-3 rounded-md px-3 py-2 bg-slate-200/60 text-slate-900" href="#">
              <span className="material-symbols-outlined">view_in_ar</span>
              <span className="font-medium">Physics Simulation 1</span>
            </a>
            <a className="flex items-center gap-3 rounded-md px-3 py-2 text-slate-700 transition-colors hover:bg-slate-200/60" href="#">
              <span className="material-symbols-outlined text-slate-500">view_in_ar</span>
              <span className="font-medium">Physics Simulation 2</span>
            </a>
          </nav>
        </aside>
        <main className="flex-1 flex">
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-slate-900 text-3xl font-bold tracking-tight pb-4 border-b border-slate-200">Physics Simulation 1</h1>
              <div className="mt-8">
                <div className="relative flex items-center justify-center bg-slate-100 aspect-video rounded-lg overflow-hidden">
                  <img
                    alt="3D model of a physics simulation"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGUqSujt2ur0ukFigb-GEH4_ubeUzwvGABtcgCp78jXIEu2aNQkAD1Lrimthnpe-65W8ohH7uvw4qWCqapm-FFecRq0wj5_QF9Ou3F7rNZDOMG8uisPdHn5S-RRXEgW9plFC64b27weZy9Dy9JYKwjOMb6vH-NV94ot9imGHhd9CRESBYigqoGiLg-qGQiYO7Gcb-E6uUed4YKayOFzRdq1W2UBbvOMWRgajGZAizX48IrZsInOxyAXwPVZ7MNCebI7txkJbW-H7I"
                  />
                  <button className="absolute flex shrink-0 items-center justify-center rounded-full size-16 bg-black/50 text-white backdrop-blur-sm transition-transform hover:scale-110">
                    <span className="material-symbols-outlined text-4xl">play_arrow</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <aside className="w-96 border-l border-slate-200 bg-slate-50/50 p-6 flex flex-col">
            <div className="sticky top-6">
              <h3 className="text-slate-900 text-lg font-bold tracking-tight mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl text-blue-500">auto_awesome</span>
                AI Explanations
              </h3>
              <div className="prose prose-slate max-w-none text-slate-600">
                <p>
                  This interactive 3D model represents a complex molecular structure. Each atom is color-coded to represent different elements, and the bonds between atoms illustrate the forces holding the molecule together.
                </p>
                <p>
                  Rotate the model to view it from different angles, and zoom in to examine specific details. This visualization helps to understand the spatial arrangement of atoms and the overall shape of the molecule, which are crucial for understanding its properties and interactions.
                </p>
                <p>
                  The simulation demonstrates the principles of motion and forces. Observe how objects interact under different conditions, such as varying gravitational forces or initial velocities. The simulation allows you to manipulate parameters and observe the resulting changes in real-time, providing an intuitive understanding of physics concepts.
                </p>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default Learning3DPage;
