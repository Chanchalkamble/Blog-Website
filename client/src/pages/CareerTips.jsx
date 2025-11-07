import { Link } from "react-router-dom";

export default function CareerTips() {
  const tips = [
    {
      title: "Build a Strong Resume",
      desc: "Keep your resume concise and highlight relevant skills and projects. Tailor it for every job role to grab recruiters' attention.",
      icon: "📄",
    },
    {
      title: "Improve Your Communication Skills",
      desc: "Clear communication helps in interviews and teamwork. Practice mock interviews and participate in discussions to boost confidence.",
      icon: "🗣️",
    },
    {
      title: "Focus on Practical Projects",
      desc: "Hands-on projects demonstrate your skills better than just theory. Showcase them on GitHub or a portfolio website.",
      icon: "💻",
    },
    {
      title: "Prepare for Interviews",
      desc: "Understand common interview questions and practice behavioral and technical answers. Research about the company beforehand.",
      icon: "🎯",
    },
    {
      title: "Stay Updated with Technology",
      desc: "Keep learning new tools, frameworks, and trends. Continuous learning shows employers your curiosity and adaptability.",
      icon: "⚙️",
    },
    {
      title: "Network with Professionals",
      desc: "Engage with industry experts on LinkedIn, attend webinars, and join online tech communities to stay inspired and connected.",
      icon: "🤝",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen px-6 py-14">
      {/* --- Header --- */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
          Career Tips for Freshers 🌱
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
          Kickstart your professional journey with these powerful tips to build skills, confidence, and connections. Your dream career starts here!
        </p>
      </div>

      {/* --- Tips Grid --- */}
      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 border border-purple-100 dark:border-slate-700 hover:scale-105 hover:shadow-lg transition-transform"
          >
            <div className="text-4xl mb-4">{tip.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {tip.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {tip.desc}
            </p>
          </div>
        ))}
      </div>

      {/* --- CTA Section --- */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Ready to Apply These Tips?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Explore our latest blogs, gain practical knowledge, and start applying
          your new skills in real-world scenarios.
        </p>
        <Link
          to="/search"
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-semibold hover:scale-105 transition-transform"
        >
          Explore Blogs
        </Link>
      </div>
    </div>
  );
}
