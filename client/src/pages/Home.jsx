import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/getPosts`);
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
      {/* --- Hero Section --- */}
      <section className="text-center px-6 pt-20 pb-16 sm:pb-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 leading-tight">
          Welcome to <span className="whitespace-nowrap">FreshersHunt Blog 🚀</span>
        </h2>
        <p className="mt-5 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          Your one-stop platform to <span className="font-semibold">learn, grow, and get hired!</span>  
          Discover valuable career tips, interview guidance, trending tech articles,  
          and job openings tailored for freshers.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/search"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-semibold hover:scale-105 transition-transform shadow-md"
          >
            Explore Blogs
          </Link>
          <Link
            to="/jobs"
            className="px-6 py-3 border border-purple-400 text-purple-600 rounded-full font-semibold hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors"
          >
            Browse Jobs
          </Link>
        </div>
      </section>

      {/* --- Career Motivation Section --- */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 p-10 rounded-3xl shadow-lg border border-purple-200/40 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* Left Text Section */}
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Ready to Build Your Dream Career? 🌟
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm sm:text-base leading-relaxed">
              FreshersHunt helps you sharpen your skills, explore the latest tech blogs, 
              and find your first job opportunity. Learn interview tips, resume building 
              techniques, and insights from real professionals — all in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/career-tips"
                className="px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full text-sm font-semibold hover:scale-105 transition-transform"
              >
                Explore Career Tips
              </Link>
              <Link
                to="/jobs"
                className="px-5 py-3 border border-purple-400 text-purple-600 rounded-full text-sm font-semibold hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors"
              >
                Find Fresher Jobs
              </Link>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="flex-1 flex justify-center">
            <img
  src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&w=800&q=80"
  alt="Career Growth Illustration"
  className="w-64 sm:w-80 rounded-2xl shadow-lg transition-transform hover:scale-105"
/>

          </div>
        </div>
      </div>

      {/* --- Recent Blog Posts Section --- */}
      <section className="max-w-6xl mx-auto p-6">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">
              Latest Blog Posts ✍️
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              {posts.slice(0, 6).map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <div className="text-center">
              <Link
                to="/search"
                className="text-lg font-medium text-purple-600 hover:underline"
              >
                View All Posts →
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* --- Job Opportunities Section --- */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="bg-gradient-to-r from-teal-100 via-green-50 to-blue-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-3xl shadow-md p-10 text-center">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-white">
            💼 Job Opportunities for Freshers
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6 text-base leading-relaxed">
            Stay updated with the latest entry-level openings in tech and beyond. 
            Explore verified fresher jobs and internships to kickstart your career 
            with confidence.
          </p>
          <Link
            to="/jobs"
            className="px-7 py-3 bg-gradient-to-r from-green-500 to-teal-400 text-white rounded-full font-semibold hover:scale-105 transition-transform"
          >
            Find Jobs Now
          </Link>
        </div>
      </section>
    </div>
  );
}
