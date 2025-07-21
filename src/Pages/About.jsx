import React from 'react';
import { Info } from 'lucide-react';

const features = [
  {
    icon: <span className="text-xl">🧠</span>,
    text: 'Smart filtering by priority, status, or date',
  },
  {
    icon: <span className="text-xl">🔍</span>,
    text: 'Advanced search across title and description',
  },
  {
    icon: <span className="text-xl">📅</span>,
    text: 'Calendar-based deadline tracking',
  },
  {
    icon: <span className="text-xl">👤</span>,
    text: '“My TaskFlow” — personal view across projects',
  },
  {
    icon: <span className="text-xl">📊</span>,
    text: 'Project summaries and performance stats',
  },
  {
    icon: <span className="text-xl">🌗</span>,
    text: 'Beautiful dark/light mode support',
  },
];

const testimonials = [
  {
    quote: "The 'My TaskFlow' dashboard keeps me laser-focused. I’ve ditched Notion and Todoist.",
    author: 'Aayush, UI/UX Designer',
  },
  {
    quote: 'Simple yet powerful. I love the calendar and priority filters. Helps me ace productivity.',
    author: 'Priya S., MBA Student',
  },
  {
    quote: 'TaskFlow’s clean UI and personal task view is 🔥. It’s my new daily driver.',
    author: 'Mohammed I., Indie Hacker',
  },
];

const audiences = [
  'Students tracking assignments and exams',
  'Professionals handling sprints and teams',
  'Freelancers managing client projects',
  'Anyone building better work-life discipline',
];

const About = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start px-4 py-8 md:px-0 animate-fadeIn">
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Info className="text-blue-500" size={32} />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">About TaskFlow</h1>
        </div>
        <p className="text-center max-w-xl text-gray-500 text-lg fade-in">
          TaskFlow is your intelligent task and project manager, designed to give you complete control and clarity over your work. Whether you're a student managing classes, a professional leading teams, or just someone trying to stay organized — TaskFlow brings everything into focus.
        </p>
      </div>


      <div className="w-full max-w-3xl mb-12">
        <h2 className="text-xl font-semibold mb-4 text-center">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm transition-transform duration-300 hover:scale-105 fade-in">
              <span>{f.icon}</span>
              <span className="text-base font-medium">{f.text}</span>
            </div>
          ))}
        </div>
      </div>


      <div className="w-full max-w-3xl mb-12">
        <h2 className="text-xl font-semibold mb-4 text-center">What Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 flex flex-col items-center fade-in">
              <p className="italic text-gray-700 dark:text-gray-300 mb-4">“{t.quote}”</p>
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">— {t.author}</span>
            </div>
          ))}
        </div>
      </div>


      <div className="w-full max-w-2xl mb-12">
        <h2 className="text-xl font-semibold mb-4 text-center">Who Should Use It</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
          {audiences.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </div>


      <div className="w-full max-w-xl text-center mt-8 fade-in">
        <h2 className="text-2xl font-bold mb-2">Start Getting Things Done</h2>
        <p className="mb-4 text-gray-500 dark:text-gray-300">Join hundreds of users boosting their productivity with TaskFlow. Organize, prioritize, and conquer your day — one task at a time.</p>
        <a href="/register" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold">Get Started</a>
      </div>
    </div>
  );
};

export default About; 