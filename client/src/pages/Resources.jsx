import CallToAction from '../components/CallToAction';
import { HiBookOpen, HiBriefcase, HiClipboardList } from 'react-icons/hi';

export default function Resources() {
  return (
    <div className="min-h-screen max-w-6xl mx-auto flex flex-col items-center gap-10 p-6">
      {/* Header Section */}
      <div className="text-center mt-6">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Explore Our Resources
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
          Unlock handpicked tools, guides, and materials to help you learn, grow,
          and land your dream job as a fresher. From coding tutorials to resume
          templates, everything you need is right here!
        </p>
      </div>

      {/* Resource Categories */}
      <div className="grid md:grid-cols-3 gap-8 w-full">
        {/* Learning Resources */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all">
          <div className="flex items-center gap-3 mb-4">
            <HiBookOpen className="text-indigo-500 text-3xl" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Learning Materials
            </h2>
          </div>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>
              <a
                href="https://www.w3schools.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-500 hover:underline"
              >
                Free HTML, CSS, JS Tutorials
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@freecodecamp"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-500 hover:underline"
              >
                Top YouTube Channels to Learn Coding
              </a>
            </li>
            <li>
              <a
                href="https://www.coursera.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-500 hover:underline"
              >
                Best Online Courses for Beginners
              </a>
            </li>
            <li>
              <a
                href="https://github.com/explore"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-500 hover:underline"
              >
                Open Source Projects to Practice
              </a>
            </li>
          </ul>
        </div>

        {/* Job Portals */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all">
          <div className="flex items-center gap-3 mb-4">
            <HiBriefcase className="text-blue-500 text-3xl" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Job Portals
            </h2>
          </div>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>
              <a
                href="https://www.linkedin.com/jobs"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 hover:underline"
              >
                LinkedIn Jobs
              </a>
            </li>
            <li>
              <a
                href="https://internshala.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 hover:underline"
              >
                Internshala
              </a>
            </li>
            <li>
              <a
                href="https://www.naukri.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 hover:underline"
              >
                Naukri & Indeed
              </a>
            </li>
            <li>
              <a
                href="https://www.freshersworld.com/jobs"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 hover:underline"
              >
                FresherWorld Job Updates
              </a>
            </li>
          </ul>
        </div>

        {/* Resume Tools */}
        <div className="bg-gradient-to-br from-pink-50 to-rose-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all">
          <div className="flex items-center gap-3 mb-4">
            <HiClipboardList className="text-pink-500 text-3xl" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Resume & Career Tools
            </h2>
          </div>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>
              <a
                href="https://www.canva.com/resumes"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 hover:underline"
              >
                Free Resume Builder
              </a>
            </li>
            <li>
              <a
                href="https://www.figma.com/templates"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 hover:underline"
              >
                Portfolio Website Templates
              </a>
            </li>
            <li>
              <a
                href="https://www.interviewbit.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 hover:underline"
              >
                Interview Preparation Kits
              </a>
            </li>
            <li>
              <a
                href="https://www.coursera.org/learn/communication-skills"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 hover:underline"
              >
                Soft Skills & Communication Tips
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Why Resources Matter Section */}
      <section className="bg-gray-100 dark:bg-slate-800 p-8 rounded-2xl shadow-md text-center mt-6 w-full">
        <h2 className="text-3xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Why Use These Resources?
        </h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Being a fresher can be challenging — our resources are designed to make
          it easier. Whether you want to sharpen your coding skills, craft the
          perfect resume, or discover your first job, these tools and materials
          give you a head start toward success.
        </p>
      </section>

      <CallToAction />
    </div>
  );
}
