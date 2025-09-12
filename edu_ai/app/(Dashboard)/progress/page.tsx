// Progress page converted from HTML to Next.js/React with Tailwind CSS

import React from "react";

const ProgressPage = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-gray-50 text-gray-900 group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 px-10 py-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 text-gray-800">
              <svg className="h-8 w-8 text-[var(--primary-color)]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_6_543)">
                  <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
                  <path clipRule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fill="currentColor" fillRule="evenodd"></path>
                </g>
                <defs>
                  <clipPath id="clip0_6_543"><rect fill="white" height="48" width="48"></rect></clipPath>
                </defs>
              </svg>
              <h1 className="text-xl font-bold leading-tight tracking-tight">StudyAI</h1>
            </div>
          </div>
          <div className="flex flex-1 justify-end items-center gap-4">
            <label className="relative w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                </svg>
              </div>
              <input className="form-input w-full rounded-md border-gray-200 bg-gray-100 py-2 pl-10 text-sm placeholder:text-gray-400 focus:border-gray-300 focus:ring-gray-300" placeholder="Search" defaultValue="" />
            </label>
            <button className="flex items-center justify-center rounded-md h-10 w-10 bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-600">
              <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
                <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
              </svg>
            </button>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBcfzzPMwIXwTsQhsp84Iw0Bk8yT6WG0CgaP0zfzjcoSKwCHhbWRXjElumZr6-F79rk6t5PvAdjOjy6EkYSgl5mMnXLVxv51iGOLnsJo1_wDLmW50ASY-Y7r9FRQATUQS-LjwObwHhhhporAENhTFK0ohZS6CJT4J_-cA6bAfPtD_6MnfL_u2gotqltm-dj6bTpuUeu1nY37Fb-Nz4CNu9JLoFTFDbH15l4HX4e8zkSA2hmdo9-nZIjAcgIbn5hpObBmJcNGRphuJw')" }}></div>
          </div>
        </header>
        <main className="px-10 md:px-20 lg:px-40 py-8 flex-1">
          <div className="layout-content-container max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-gray-800 mb-8">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-gray-800">This week's focus score</h3>
                  <p className="text-4xl font-bold text-gray-900 mt-2">85</p>
                </div>
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg mt-4" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCEqTzn-pHmrV6XMAqozKrTPJGbWBi7_8JOZV6OjGrDfS4qzDHZxSa9MlozxDqjBxu8VXpos2ca4vX3B4Nn1XjgD_kPjFjEs77rVUixQFCOLgODW_JEUmQbfZEIO47lMTJ3IuPZopL9dXNTQKfbEOI4poQNflQ6-1dojf3SEzVbCwb2Kl3AoxjZsxWDCZUkNoTvtwrs9iHFz-ErgcC1_jORbHWfDxGljolKRXqRYqnXRlLpZol9mXLrytD4aOKZSlbkoe5DyrsuwVA')" }}></div>
              </div>
              <div className="md:col-span-2 grid grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6 flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-gray-800">XP</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-1">1200</p>
                  </div>
                  <div className="w-24 h-24 bg-center bg-no-repeat bg-contain rounded-lg" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCofCSeuA05eGYaRh5qQP1oPCGa2uYkarujC_mp__FCOnDzNQNj_0-ssVYeVBNrhg5s3hcwaAUaIRz14QaDdTx-DbQRWYooNn1xL-fnBdKfS9HdAvjU16cXgArcmN-gfR5Xb3YeO4-rIHBNaGCvHbPO8Us61kZthBYb-M2ID8Vy8mOD9G1zI0yVkmm45_uyn6YnHIDPgpY9DBGyxLB3Za4MnH6CemBRoHrj34bPbBcUqmC3NYc6j2ce8sZ2eOxRHa-ovg2cVzXVpC0')" }}></div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6 flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-gray-800">Badges</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-1">5</p>
                  </div>
                  <div className="w-24 h-24 bg-center bg-no-repeat bg-contain rounded-lg" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCdBkiwZ_1ZbYnnycpneCSP5-uHNr0sbXaskNfJPDeTwlR66OO-U_SXBdY5HKzeREgxIBcB4rVRxARSRG3ZNV3hn_2OGwaPprZd-fGbOS_koP1eHeBo03ayMGehQOtFPQv_dfBasCTKYBBiHHHKE7UBz0BSghkgdbZQHFWEi7sAER09pDOqUv9Xg6wlWsDMrpOM4KfBPSjgsa9oV6-laPljnqu3xLpHn3tUyRvDLVjOS7KGFvCA6KhXrP_ObY4gqZqf0i6MXGwDhIo')" }}></div>
                </div>
                <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Weekly Progress Report</h3>
                  <div className="flex flex-col @container xl:flex-row gap-6">
                    <div className="w-full xl:w-1/3 bg-center bg-no-repeat aspect-video xl:aspect-square bg-cover rounded-lg" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBXBbAh76DkL0kfbbM-7I7CJFyloNcLi9_7OgCBCXs_WvGgl6FUBFhrOKyVUECMJKHIMlIU-MnlWM60tsFSW20K1Wc7ccxp999tOXqxLesu5tr4IWyc5Lm8JbVjhLm6q9Pxad_kPzxrDAcK6gjN71BisDTGbIHH9NXbp1Cp7btzqUMM227Ly9RG6JbnyPmcu638esvh6BUH8n_omQTIu8wPfcZXq_I0Ibs40_vKfAUomz8LlDsUJ4eAjOIPN_rD9jcsYI2nXirsH78')" }}></div>
                    <div className="w-full xl:w-2/3">
                      <h4 className="text-lg font-bold text-gray-800 leading-tight tracking-tight">AI-Generated Progress Report</h4>
                      <p className="text-gray-600 text-sm leading-relaxed mt-2">
                        This week, you've shown significant improvement in understanding complex concepts. Your focus score has increased by 15 points, and you've earned 2 new badges for consistent study habits. Keep up the great work!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProgressPage;
