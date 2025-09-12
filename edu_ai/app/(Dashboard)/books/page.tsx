
// Books page for the Dashboard section, converted from the provided HTML
import React from "react";

const books = [
	{
		title: "Calculus: Early Transcendentals",
		rating: 4.2,
		stars: 4,
		image:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuAem5nRoKfeGP3IMHmrktH8iX4lZn7I68IeH4iwWqC_P7S1-giioEvMtCZt8yP34D1QGXpsEYRS1xCR0zXsa6_Blz8AEWwVLjeh52gIJ1ddY9GCJfbjXT8X60439MjWkc4s8yTdWQccD0czlENB3L24ZPx14Z8YNw2voT9fNgmUXQXWC_8JrkFpmlWBi2jDBzJjcWswxM9_H1y7Qh3bhAY0nl5f_giCeJvBGIQDC7NyL5RXg3o4e3o0Ngk8OKKgmgBCYduAjLtnHwA",
		description:
			"A comprehensive textbook covering single and multivariable calculus, with a focus on applications in science and engineering.",
	},
	{
		title: "Linear Algebra and Its Applications",
		rating: 4.6,
		stars: 4.5,
		image:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuCo-AjHXpOP5CCdDi_ioM63UQni-0ZUYOmdP8Xw6L6ebllfobCssl5ZrsPkgMpT4McbxxCpQl_7pOyePMQaRiYvVEJGidQjxHKKXOSc4rlXcTNzt05ptaC9qlznBbhIfprOQmeFxbU8I06yEjquwRpWJGBX3429q7BNdXbwKDX6sW9thshPR2w7QmcTs0Vw7wLfqfMO2kcMev3UWvQoycYmBpKiWeKdSB04J2lS4Jxc4VXmyYLp0VQcMPbeX6OjZXFMo60DiMB00dQ",
		description:
			"An introductory text on linear algebra, emphasizing applications in various fields such as computer science and economics.",
	},
	{
		title: "Discrete Mathematics and Its Applications",
		rating: 4.8,
		stars: 5,
		image:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuCki3Kl9jxpbLG2NGWpZPHNq42Dtl8oARd5F7tX7BTGk4NWsH2rUvE-KkfDg6Mer9uEQmWHbzhE6eDVR_lzBjoIjwOKdXSDR0KXLAoMdzIXzGAdIkG2kfZ3GbNb8IH_n8thb8g05CwbifCTwjPog1FgwWoc4OxfXmo3Cjc-18UzS5yXfB61DUCgpXb2mgHrujvcBDSOYINkZ0HKiNFLrRik6EkMI1qJlD7-v1F22ZQk0XKWY8ZDE1TN8zK0UUG8otetdumu1mWI9HE",
		description:
			"A foundational text for computer science students, covering topics like logic, set theory, and graph theory.",
	},
];

const articles = [
	{
		title: "The Riemann Hypothesis: A Million-Dollar Problem",
		image:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuC0l4M675AIRLPCe_lHtghb1d5a_omvpQ9UrdXwnPpnYy_M94t1vemkdR-14X5nDpT2Rtu66WGrZ1DgOVlIfBxkyowaMsdJbkviercAeRWctwrAHw40rnGSHHW_hsHR6hlYoyns0isZeINvcJ_ZqcZLbTA8toZY8pZMpSVZLC1mWw2IsojKWS3LDLxfrvizHMEYUgKUYlMsVS-ro90uTlCxqpLhddxFRMP6tM0AkkV1JW9MdRZ1k9Y54rOknU06KLZzy-jhIrPBHKI",
		description:
			"An article exploring the famous Riemann Hypothesis, one of the most important unsolved problems in mathematics.",
	},
	{
		title: "The Mathematics of Machine Learning",
		image:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuA4bNQuL9JZ9Q2BNcXlzFQIQjrUNqBw-4tlCK4wi8hZXKCTtPcgc6Wi_xlMdydlalPpYcSdKRFil3LlUV5xViOtQ6BhJhxSRXFi8RhOr5WctR5xGhFD7rCCSX2ALpqXPkHqCwQlbPbuuXFtvoGSBsymk_KwmZgXQRZyM-_Csaq3vSYVQX0b59YWoz4zW05i_on_n3Xof4sseqsgU-TDn-bYmTHTptRPByh5OKYYwySWCRtYxW6AAHG3qRflNFUfcwgtzDUOMmYWkmw",
		description:
			"An overview of the mathematical concepts underlying machine learning algorithms, including linear algebra and optimization.",
	},
];

function StarRating({ stars, rating }: { stars: number; rating: number }) {
	const fullStars = Math.floor(stars);
	const halfStar = stars % 1 !== 0;
	const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
	return (
		<div className="mt-2 flex items-center gap-1 text-yellow-500">
			{Array.from({ length: fullStars }).map((_, i) => (
				<span key={i} className="material-symbols-outlined text-base">star</span>
			))}
			{halfStar && <span className="material-symbols-outlined text-base">star_half</span>}
			{Array.from({ length: emptyStars }).map((_, i) => (
				<span key={i} className="material-symbols-outlined text-base text-gray-300">star</span>
			))}
			<span className="ml-1 text-sm text-gray-500">({rating})</span>
		</div>
	);
}



const BooksPage = () => {
	return (
		<div className="p-8" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
			<div className="flex items-center justify-between">
				<h2 className="text-3xl font-bold tracking-tight">Math</h2>
				<div className="flex items-center gap-4">
					<div className="relative w-72">
						<input
							className="w-full rounded-md border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-primary-500 focus:ring-primary-500"
							placeholder="Search resources..."
							type="text"
						/>
						<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"> search </span>
					</div>
					<button className="flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
						<span className="material-symbols-outlined"> add </span>
						<span>Add Topic</span>
					</button>
				</div>
			</div>

			<div className="mt-8">
				<h3 className="text-xl font-semibold tracking-tight">Recommended Books</h3>
				<div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{books.map((book, idx) => (
						<div key={idx} className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
							<div
								className="h-48 w-full bg-cover bg-center"
								style={{ backgroundImage: `url('${book.image}')` }}
							></div>
							<div className="flex flex-1 flex-col p-6">
								<h4 className="text-lg font-bold">{book.title}</h4>
								<StarRating stars={book.stars} rating={book.rating} />
								<p className="mt-3 flex-1 text-sm text-gray-600">{book.description}</p>
								<a className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-100" href="#">
									<span>Get this source</span>
									<span className="material-symbols-outlined"> arrow_forward </span>
								</a>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="mt-12">
				<h3 className="text-xl font-semibold tracking-tight">Recommended Articles</h3>
				<div className="mt-6 space-y-6">
					{articles.map((article, idx) => (
						<div key={idx} className="flex items-center gap-6 rounded-lg border border-gray-200 bg-white p-4">
							<div
								className="h-24 w-24 flex-shrink-0 rounded-md bg-cover bg-center"
								style={{ backgroundImage: `url('${article.image}')` }}
							></div>
							<div className="flex-1">
								<h4 className="font-semibold">{article.title}</h4>
								<p className="mt-1 text-sm text-gray-600">{article.description}</p>
							</div>
							<a className="flex items-center justify-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200" href="#">
								<span>Read article</span>
								<span className="material-symbols-outlined"> arrow_forward </span>
							</a>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default BooksPage;
