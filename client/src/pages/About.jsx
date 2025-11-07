import CallToAction from '../components/CallToAction';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl mx-auto text-center">
        {/* --- Header --- */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-8">
          About FreshersHunt Blog 🚀
        </h1>

        {/* --- Description --- */}
        <div className="text-base sm:text-lg text-gray-600 dark:text-gray-300 flex flex-col gap-6 leading-relaxed">
          <p>
            Welcome to <span className="font-semibold text-purple-600 dark:text-purple-400">FreshersHunt Blog</span> — a dedicated space built to
            empower <span className="font-semibold">students, fresh graduates, and aspiring professionals</span> to kickstart their careers with confidence.
          </p>

          <p>
            At FreshersHunt, we believe that every fresher deserves the right guidance and opportunities to shine.
            Our mission is to bridge the gap between learning and employment by providing <span className="font-semibold">career tips, technical blogs, interview insights, and verified job listings</span> — all in one platform.
          </p>

          <p>
            From mastering your first coding language to cracking your first interview, our content is crafted to inspire,
            educate, and prepare you for the real-world challenges ahead. Whether you're exploring development, design,
            data, or corporate life — FreshersHunt is your ultimate career companion.
          </p>

          <p>
            We also encourage our readers to share their thoughts, experiences, and success stories. Together, we’re
            building a community that supports learning, collaboration, and growth.
          </p>

          <p className="font-medium text-gray-700 dark:text-gray-200">
            Let’s learn, grow, and get hired — together with <span className="text-purple-600 dark:text-purple-400 font-semibold">FreshersHunt!</span> 💼
          </p>
        </div>

        {/* --- Call to Action Section --- */}
        <div className="mt-12">
          <CallToAction />
        </div>
      </div>
    </div>
  );
}
