import React from "react";
import { Link } from "react-router-dom";

const blogItems = [
	{
		id: 1,
		date: "8/1/25",
		title:
			"The Silent Revolution: How Automation is Reshaping Technical Content Creation and Maintenance",
	},
	{
		id: 2,
		date: "7/3/25",
		title: "The Right Tech Stack to Future-Proof Your Docs",
	},
	{
		id: 3,
		date: "6/12/25",
		title: "Documentation Debt: Inefficient docs and how we fix them",
	},
	{
		id: 4,
		date: "5/29/25",
		title: "CDC vs. SDLC: Why documentation needs its own lifecycle?",
	},
	{
		id: 5,
		date: "5/22/25",
		title:
			"How we built a documentation system from scratch for a startup",
	},
	{
		id: 6,
		date: "5/15/25",
		title:
			"The Evolution of Technical Writing: From PDFs to Dynamic, Interactive Docs",
	},
	{
		id: 7,
		date: "5/1/25",
		title:
			"Self-hosted vs. SaaS documentation platforms: What’s best for your product?",
	},
	{
		id: 8,
		date: "4/24/25",
		title:
			"Why Documentation often fails: The hidden gaps in traditional Technical Writing",
	},
];

const Blogs: React.FC = () => {
	return (
		<div className="pt-28 pb-24 bg-[#F5F5F7]">
			<div className="max-w-6xl mx-auto px-6 space-y-16">
				{blogItems.map((blog) => (
					<div
						key={blog.id}
						className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
					>
						{/* Image placeholder left column */}
						<div className="w-full h-[280px] bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500 text-lg">
							Place picture here
						</div>

						{/* Text right column */}
						<div className="space-y-2">
							<p className="text-gray-500 text-sm">{blog.date}</p>

							<h2 className="text-3xl font-semibold text-[#1d3c78] leading-tight">
								{blog.title}
							</h2>

							<Link
								to={`/blogs/${blog.id}`}
								className="text-[#1d3c78] font-medium underline underline-offset-4 hover:text-[#102447]"
							>
								Read More
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Blogs;

