import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className="flex border border-purple-400 p-5 justify-center items-center rounded-tl-3xl rounded-br-3xl flex-col sm:flex-row text-center bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 shadow-md">
      
      {/* --- Left Section --- */}
      <div className="flex-1 flex flex-col justify-center items-center sm:items-start">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white">
          Ready to boost your skills and career? 🚀
        </h2>
        <p className="text-gray-600 dark:text-gray-300 my-3 text-sm sm:text-base max-w-md">
          Learn industry insights, career tips, and job-ready skills 
          designed especially for freshers starting their tech journey.
        </p>
        <a
          href="/career-tips"
          rel="noopener noreferrer"
        >
          <Button
            gradientDuoTone="purpleToPink"
            className="rounded-tl-xl rounded-bl-none rounded-br-xl w-full sm:w-auto font-medium"
          >
            Explore Career Tips
          </Button>
        </a>
      </div>

      {/* --- Right Section (Image) --- */}
      <div className="flex-1 p-7 flex justify-center">
        {/* <img
          src="https://undraw.co/api/illustrations/37d08929-9f3f-4cfb-b746-82c8b77f5c1c"
          alt="Career Growth Illustration"
          className="w-64 sm:w-80 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
        /> */}
         <img
  src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&w=800&q=80"
  alt="Career Growth Illustration"
  className="w-64 sm:w-80 rounded-2xl shadow-lg transition-transform hover:scale-105"
/>
      </div>
    </div>
  );
}
