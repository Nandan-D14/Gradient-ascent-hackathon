
import React from "react";

const ExamPredictorPage = () => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root bg-white" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[var(--border-color)] px-10 py-4">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3 text-black">
              {/* Logo SVG */}
              <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4.236L19.911 8.5V15.5L12 19.764L4.089 15.5V8.5L12 4.236Z" fill="currentColor"></path>
                <path d="M12 13.5L7 10.5L12 7.5L17 10.5L12 13.5Z" fill="currentColor"></path>
              </svg>
              <h2 className="text-[var(--text-primary)] text-xl font-bold leading-tight">
                StudyAI
              </h2>
            </div>
            <div className="flex items-center gap-6">
              <a className="text-[var(--text-secondary)] text-sm font-medium leading-normal hover:text-[var(--text-primary)] transition-colors" href="#">Dashboard</a>
              <a className="text-[var(--primary-color)] text-sm font-bold leading-normal" href="#">Exam Predictor</a>
              <a className="text-[var(--text-secondary)] text-sm font-medium leading-normal hover:text-[var(--text-primary)] transition-colors" href="#">Practice</a>
              <a className="text-[var(--text-secondary)] text-sm font-medium leading-normal hover:text-[var(--text-primary)] transition-colors" href="#">Resources</a>
            </div>
          </div>
          <div className="flex items-center justify-end gap-4">
            <button className="flex items-center justify-center rounded-full h-10 w-10 hover:bg-gray-100 transition-colors">
              <span className="material-symbols-outlined text-[var(--text-secondary)]">search</span>
            </button>
            <button className="flex items-center justify-center rounded-full h-10 w-10 hover:bg-gray-100 transition-colors">
              <span className="material-symbols-outlined text-[var(--text-secondary)]">notifications</span>
            </button>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCmwD-yHktRHlp_hDCKMWqJQreyRXVw4SKEmWBI57yoADfc-It-xp5qG9317f0OhMrwZQuXpYEbWI9O0E16gtM9Fo-Ii1a9KKPznhrRJYmrk91L76B-XvPvqNMW-8_bPkp8r7CTctZ_OXgwKIqctSeNhWCIQXYfxVqgAl2JCa8bhECCEd5Qdtov5L0VJd-eqYNMYrdW3taX0-rJagh6mx2gDxA8Y-ZuMLJVAzfKorvO2ypE-4FK4RBp47MAaokcGik4GJz6HjSZUgE")' }}></div>
          </div>
        </header>
        <main className="flex-1 px-40 py-12">
          <div className="layout-content-container mx-auto max-w-[960px]">
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)]">
                Exam Predictor
              </h1>
              <p className="mt-3 text-lg text-[var(--text-secondary)]">
                Upload your study materials, and our AI will pinpoint likely
                exam questions.
              </p>
            </div>
            <div className="mb-12 rounded-xl border-2 border-dashed border-[var(--border-color)] bg-gray-50 px-6 py-16 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200">
                  <span className="material-symbols-outlined text-3xl text-[var(--text-secondary)]">upload_file</span>
                </div>
                <p className="text-lg font-semibold text-[var(--text-primary)]">
                  Drag and drop your PDFs here
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  or click to browse files from your computer
                </p>
                <button className="mt-2 flex items-center justify-center rounded-md h-10 px-5 bg-black text-white text-sm font-semibold hover:bg-gray-800 transition-colors">
                  Browse Files
                </button>
              </div>
            </div>
            <div className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
                Likely Questions
              </h2>
              <div className="space-y-3">
                {/* Section 1 */}
                <details className="group rounded-lg border border-[var(--border-color)] bg-white transition-all duration-300 open:bg-gray-50">
                  <summary className="flex cursor-pointer list-none items-center justify-between p-4">
                    <span className="text-base font-medium text-[var(--text-primary)]">Section 1: Core Machine Learning Concepts</span>
                    <span className="material-symbols-outlined text-[var(--text-secondary)] transition-transform duration-300 group-open:rotate-180">expand_more</span>
                  </summary>
                  <div className="border-t border-[var(--border-color)] p-4">
                    <p className="text-[var(--text-secondary)]">
                      Explain the difference between supervised, unsupervised,
                      and reinforcement learning. Provide a real-world example
                      for each.
                    </p>
                  </div>
                </details>
                {/* Section 2 */}
                <details className="group rounded-lg border border-[var(--border-color)] bg-white transition-all duration-300 open:bg-gray-50">
                  <summary className="flex cursor-pointer list-none items-center justify-between p-4">
                    <span className="text-base font-medium text-[var(--text-primary)]">Section 2: Neural Network Architectures</span>
                    <span className="material-symbols-outlined text-[var(--text-secondary)] transition-transform duration-300 group-open:rotate-180">expand_more</span>
                  </summary>
                  <div className="border-t border-[var(--border-color)] p-4">
                    <p className="text-[var(--text-secondary)]">
                      Describe the architecture of a Convolutional Neural
                      Network (CNN) and its primary applications.
                    </p>
                  </div>
                </details>
                {/* Section 3 */}
                <details className="group rounded-lg border border-[var(--border-color)] bg-white transition-all duration-300 open:bg-gray-50">
                  <summary className="flex cursor-pointer list-none items-center justify-between p-4">
                    <span className="text-base font-medium text-[var(--text-primary)]">Section 3: Model Evaluation and Metrics</span>
                    <span className="material-symbols-outlined text-[var(--text-secondary)] transition-transform duration-300 group-open:rotate-180">expand_more</span>
                  </summary>
                  <div className="border-t border-[var(--border-color)] p-4">
                    <p className="text-[var(--text-secondary)]">
                      What is overfitting, and what are common techniques to
                      prevent it?
                    </p>
                  </div>
                </details>
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
                Mock Test Generator
              </h2>
              <div className="overflow-hidden rounded-xl border border-[var(--border-color)]">
                <div className="w-full bg-center bg-no-repeat aspect-[2/1] bg-cover" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB6Thi0Ql3oXWmEEWRVraRsNBRPfafdM0zqe3aSUNlFLuvMzg37zXDN7-oi2HeNOWsDAsk74d3GgYiE8P5KH3vAM7XmI2g5-8y11pBDPn230e6bhN4z2v6xDZmoNWokZSl_m1rFtEliU0G2YROjQKvv-tFscOtgwQfC1DaVHRmNv8LxTjQTOx7fnfdzSjVNl_1-RMNiXln4FzpjcFncjOlRSjPajXQCqdEyuSyAJ3OXDtXNrJDDtt5CuKpke3TrLkQwt-RgBhz5Agw")' }}></div>
                <div className="p-6 bg-gray-50/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold text-[var(--text-primary)]">
                        Ready to test your knowledge?
                      </p>
                      <p className="text-[var(--text-secondary)]">
                        Generate a mock test with multiple-choice and essay questions.
                      </p>
                    </div>
                    <button className="flex min-w-[120px] items-center justify-center rounded-md h-10 px-5 bg-[var(--primary-color)] text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                      Generate Test
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <style jsx global>{`
        :root {
          --primary-color: #0d7ff2;
          --border-color: #e5e7eb;
          --text-primary: #111827;
          --text-secondary: #6b7280;
        }
        .group:hover .group-hover\:block {
          display: block;
        }
      `}</style>
      {/* Google Fonts and Material Symbols */}
      <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?display=swap&family=Inter:wght@400;500;700;900&family=Noto+Sans:wght@400;500;700;900" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
    </div>
  );
};

export default ExamPredictorPage;
