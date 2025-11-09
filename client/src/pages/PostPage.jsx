import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  // Fetch the main post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/post/getposts?slug=${postSlug}`
        );
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  // Fetch recent posts
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/post/getposts?limit=3`
        );
        const data = await res.json();
        if (res.ok) setRecentPosts(data.posts);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchRecentPosts();
  }, []);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );

  if (error) return <p className='text-center mt-10'>Failed to load post.</p>;

  return (
    <>
      {post && (
        <Helmet>
          {/* Page Title */}
          <title>{post.title} | FresherHunt Blog</title>

          {/* Meta description */}
          <meta
            name='description'
            content={post.summary || post.content.slice(0, 160)}
          />

          {/* Meta keywords */}
          <meta
            name='keywords'
            content={post.keywords ? post.keywords.join(', ') : post.category}
          />

          {/* Open Graph / Facebook */}
          <meta property='og:title' content={post.title} />
          <meta
            property='og:description'
            content={post.summary || post.content.slice(0, 160)}
          />
          <meta property='og:image' content={post.image} />
          <meta
            property='og:url'
            content={`https://blog-website-u60z.onrender.com/post/${postSlug}`}
          />
          <meta property='og:type' content='article' />

          {/* Twitter */}
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:title' content={post.title} />
          <meta
            name='twitter:description'
            content={post.summary || post.content.slice(0, 160)}
          />
          <meta name='twitter:image' content={post.image} />
        </Helmet>
      )}

      <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
        <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
          {post.title}
        </h1>

        <Link
          to={`/search?category=${post.category}`}
          className='self-center mt-5'
        >
          <Button color='gray' pill size='xs'>
            {post.category}
          </Button>
        </Link>

        <img
          src={post.image}
          alt={post.title}
          className='mt-10 p-3 max-h-[600px] w-full object-cover'
        />

        <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <span className='italic'>
            {(post.content.length / 1000).toFixed(0)} mins read
          </span>
        </div>

        <div
          className='p-3 max-w-2xl mx-auto w-full post-content'
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>

        <div className='max-w-4xl mx-auto w-full'>
          <CallToAction />
        </div>

        <CommentSection postId={post._id} />

        <div className='flex flex-col justify-center items-center mb-5'>
          <h1 className='text-xl mt-5'>Recent articles</h1>
          <div className='flex flex-wrap gap-5 mt-5 justify-center'>
            {recentPosts &&
              recentPosts.map((p) => <PostCard key={p._id} post={p} />)}
          </div>
        </div>
      </main>
    </>
  );
}
