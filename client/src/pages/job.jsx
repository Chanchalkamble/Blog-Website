import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  // Load real jobs (example dataset)
  useEffect(() => {
    const jobData = [
      {
        id: 1,
        title: 'Frontend Developer Intern',
        company: 'Google',
        location: 'Bengaluru, India',
        category: 'Tech',
        type: 'Internship',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
        applyLink: 'https://careers.google.com/jobs/results/',
      },
      {
        id: 2,
        title: 'Software Engineer',
        company: 'TCS',
        location: 'Pune, India',
        category: 'Tech',
        type: 'Full-time',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Tata_Consultancy_Services_Logo.svg',
        applyLink: 'https://www.tcs.com/careers',
      },
      {
        id: 3,
        title: 'UI/UX Designer',
        company: 'Zoho',
        location: 'Chennai, India',
        category: 'Design',
        type: 'Full-time',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/ZOHO_Corporation_Logo.svg',
        applyLink: 'https://careers.zohocorp.com/',
      },
      {
        id: 4,
        title: 'Digital Marketing Executive',
        company: 'Byju’s',
        location: 'Remote',
        category: 'Marketing',
        type: 'Full-time',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/2/27/BYJU%27S_logo.svg',
        applyLink: 'https://byjus.com/careers/',
      },
      {
        id: 5,
        title: 'Graphic Designer Intern',
        company: 'Canva',
        location: 'Remote',
        category: 'Design',
        type: 'Internship',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Canva_Logo.svg',
        applyLink: 'https://www.canva.com/careers/',
      },
      {
        id: 6,
        title: 'Data Analyst',
        company: 'IBM',
        location: 'Hyderabad, India',
        category: 'Tech',
        type: 'Full-time',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
        applyLink: 'https://www.ibm.com/careers/in-en/',
      },
      {
        id: 7,
        title: 'HR Intern',
        company: 'Wipro',
        location: 'Mumbai, India',
        category: 'Human Resources',
        type: 'Internship',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Wipro_Primary_Logo_Color_RGB.svg',
        applyLink: 'https://careers.wipro.com/',
      },
      {
        id: 8,
        title: 'Backend Developer',
        company: 'Infosys',
        location: 'Bengaluru, India',
        category: 'Tech',
        type: 'Full-time',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Infosys_logo.svg',
        applyLink: 'https://career.infosys.com/',
      },
    ];
    setJobs(jobData);
  }, []);

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || job.category === category;
    return matchesSearch && matchesCategory;
  });

  // Default logo fallback
  const handleImageError = (e) => {
    e.target.src = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'; // fallback logo
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen py-16 px-6">
      {/* --- Header Section --- */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
          💼 Find Your Dream Job
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
          Explore the latest opportunities for freshers in tech, design, marketing, and more.
        </p>
      </div>

      {/* --- Search & Filter --- */}
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
          <option value="Human Resources">Human Resources</option>
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
                <img
                  src={job.logo}
                  alt={job.company}
                  onError={handleImageError}
                  className="w-12 h-12 rounded-full object-contain bg-white p-1"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{job.company}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{job.location}</p>
              <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-4">
                {job.category} • {job.type}
              </p>
              <a
                href={job.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-auto px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-semibold hover:scale-105 transition-transform"
              >
                Apply Now
              </a>
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
