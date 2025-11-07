import { useEffect, useState } from 'react';
import { Spinner } from 'flowbite-react';
import PostCard from '../components/PostCard';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/getposts`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts || data);
        } else {
          console.error('Error fetching posts:', data.message);
        }
      } catch (error) {
        console.error('Fetch error:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spinner size="xl" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        No blog posts available yet.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-950 px-5 py-12">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-3">
          Explore Fresh Perspectives
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
          Read insightful blogs written by our community — discover stories, experiences, and guidance for freshers.
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
