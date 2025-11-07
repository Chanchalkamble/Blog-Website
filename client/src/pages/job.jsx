import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  // Fetch job data (you can connect this to your backend later)
  useEffect(() => {
    const dummyJobs = [
      {
        id: 1,
        title: 'Frontend Developer',
        company: 'TechSpark',
        location: 'Pune, India',
        category: 'Tech',
        type: 'Full-time',
        logo: 'https://cdn-icons-png.flaticon.com/512/1055/1055687.png',
      },
      {
        id: 2,
        title: 'UI/UX Designer',
        company: 'Designify',
        location: 'Remote',
        category: 'Design',
        type: 'Internship',
        logo: 'https://cdn-icons-png.flaticon.com/512/1055/1055666.png',
      },
      {
        id: 3,
        title: 'Digital Marketing Intern',
        company: 'GrowMate',
        location: 'Mumbai, India',
        category: 'Marketing',
        type: 'Internship',
        logo: 'https://cdn-icons-png.flaticon.com/512/1041/1041916.png',
      },
      {
        id: 4,
        title: 'Backend Developer',
        company: 'CodeHive',
        location: 'Bengaluru, India',
        category: 'Tech',
        type: 'Full-time',
        logo: 'https://cdn-icons-png.flaticon.com/512/1055/1055672.png',
      },
    ];
    setJobs(dummyJobs);
  }, []);

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || job.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen py-16 px-6">
      {/* --- Header Section --- */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
          💼 Find Your Dream Job
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
          Explore the latest opportunities for freshers in tech, design, and marketing.  
          Search, filter, and apply for jobs — all in one place!
        </p>
      </div>

      {/* --- Search & Filter Bar --- */}
      <div className="max-w-4xl mx-auto mb-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <input
          type="text"
          placeholder="Search by job title or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-2/3 px-4 py-3 border border-purple-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 border border-purple-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="all">All Categories</option>
          <option value="Tech">Tech</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      {/* --- Job Listings --- */}
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <img src={job.logo} alt={job.company} className="w-12 h-12 rounded-full" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{job.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{job.company}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{job.location}</p>
              <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-4">
                {job.category} • {job.type}
              </p>
              <Link
                to={`/jobs/${job.id}`}
                className="inline-block mt-auto px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-semibold hover:scale-105 transition-transform"
              >
                Apply Now
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300 col-span-full">
            No jobs found matching your search.
          </p>
        )}
      </div>

      {/* --- Call to Action --- */}
      <div className="mt-16 text-center">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Want to explore more opportunities?
        </p>
        <Link
          to="/career-tips"
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-400 text-white rounded-full font-semibold hover:scale-105 transition-transform"
        >
          Explore Career Tips →
        </Link>
      </div>
    </div>
  );
}
