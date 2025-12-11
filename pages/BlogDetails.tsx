import React from "react";
import { useParams } from "react-router-dom";

const blogTitles: Record<number, string> = {
  1: "The Silent Revolution: How Automation is Reshaping Technical Content Creation and Maintenance",
  2: "The Right Tech Stack to Future-Proof Your Docs",
  3: "Documentation Debt: Inefficient docs and how we fix them",
  4: "CDC vs. SDLC: Why documentation needs its own lifecycle?",
  5: "How we built a documentation system from scratch for a startup",
  6: "The Evolution of Technical Writing: From PDFs to Dynamic, Interactive Docs",
  7: "Self-hosted vs. SaaS documentation platforms: What’s best for your product?",
  8: "Why Documentation often fails: The hidden gaps in traditional Technical Writing",
};

const BlogDetails: React.FC = () => {
  const { id } = useParams();
  const blogId = Number(id);

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold text-[#1d3c78] leading-tight mb-10">
        {blogTitles[blogId] || "Blog Not Found"}
      </h1>

      <div className="w-full h-[350px] bg-gray-200 rounded-xl flex items-center justify-center text-gray-600 text-lg mb-10">
        Place picture here
      </div>

      <p className="text-gray-700 text-lg leading-relaxed">
        Blog content will go here. (You will provide the content later.)
      </p>
    </div>
  );
};

export default BlogDetails;
