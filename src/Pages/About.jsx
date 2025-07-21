import React, { useContext } from 'react';
import { Info, Star, Users, Briefcase, GraduationCap, Zap, ArrowRight } from 'lucide-react';
import BackgroundAnimation from '../services/BackgroundAnimation';
import { TheamContext } from '../App';

const features = [
  {
    icon: <span className="text-3xl">🧠</span>,
    text: 'Smart Filtering',
    description: 'Filter tasks by priority, status, or date.',
  },
  {
    icon: <span className="text-3xl">🔍</span>,
    text: 'Advanced Search',
    description: 'Quickly find tasks across titles and descriptions.',
  },
  {
    icon: <span className="text-3xl">📅</span>,
    text: 'Calendar Tracking',
    description: 'Visualize and manage deadlines on a calendar.',
  },
  {
    icon: <span className="text-3xl">👤</span>,
    text: '“My TaskFlow” View',
    description: 'A personal, unified view of tasks across projects.',
  },
  {
    icon: <span className="text-3xl">📊</span>,
    text: 'Project Stats',
    description: 'Get insights with project summaries and performance data.',
  },
  {
    icon: <span className="text-3xl">🌗</span>,
    text: 'Dark/Light Mode',
    description: 'A beautiful and comfortable UI, day or night.',
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

const About = () => {
  const { theam } = useContext(TheamContext);

  const glassCardStyle = `
    rounded-2xl border p-6 shadow-lg
    transition-all duration-300 hover:shadow-xl hover:-translate-y-1
  `;
  const lightThemeCardStyle = 'border-gray-200/50 bg-white/50 backdrop-blur-md';
  const darkThemeCardStyle = 'border-gray-700/50 bg-black/30 backdrop-blur-md';

  const cardStyle = `${glassCardStyle} ${theam ? darkThemeCardStyle : lightThemeCardStyle}`;

  return (
    <div className={`w-full min-h-screen overflow-y-auto px-4 py-12 sm:px-6 lg:px-8 ${theam ? 'text-gray-200' : 'text-gray-800'}`}>
      <div className="absolute inset-0 -z-10">
        <BackgroundAnimation />
      </div>

      <div className="max-w-4xl mx-auto">

        <header className="text-center mb-20 animate-fadeIn">
          <div className="inline-flex items-center justify-center bg-blue-500/10 rounded-full p-3 mb-4">
            <Info className="text-blue-500" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            About <span className="text-blue-500">TaskFlow</span>
          </h1>
          <p className={`mt-4 text-lg max-w-2xl mx-auto ${theam ? 'text-gray-400' : 'text-gray-600'}`}>
            Your intelligent task and project manager, designed for complete control and clarity over your work.
          </p>
        </header>


        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className={cardStyle}>
                <div className="mb-3">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-1">{f.text}</h3>
                <p className={`${theam ? 'text-gray-400' : 'text-gray-600'}`}>{f.description}</p>
              </div>
            ))}
          </div>
        </section>


        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10">Who Should Use It</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className={cardStyle}>
              <div className="flex items-center gap-3 mb-2">
                <GraduationCap className="text-green-500" />
                <h3 className="text-xl font-semibold">Students</h3>
              </div>
              <p className={`${theam ? 'text-gray-400' : 'text-gray-600'}`}>Tracking assignments, project deadlines, and exam schedules.</p>
            </div>
            <div className={cardStyle}>
              <div className="flex items-center gap-3 mb-2">
                <Briefcase className="text-purple-500" />
                <h3 className="text-xl font-semibold">Professionals</h3>
              </div>
              <p className={`${theam ? 'text-gray-400' : 'text-gray-600'}`}>Handling sprints, team tasks, and project milestones with ease.</p>
            </div>
            <div className={cardStyle}>
              <div className="flex items-center gap-3 mb-2">
                <Users className="text-orange-500" />
                <h3 className="text-xl font-semibold">Freelancers</h3>
              </div>
              <p className={`${theam ? 'text-gray-400' : 'text-gray-600'}`}>Managing multiple client projects and deliverables efficiently.</p>
            </div>
            <div className={cardStyle}>
              <div className="flex items-center gap-3 mb-2">
                <Zap className="text-red-500" />
                <h3 className="text-xl font-semibold">Productivity Fans</h3>
              </div>
              <p className={`${theam ? 'text-gray-400' : 'text-gray-600'}`}>Anyone looking to build better work-life discipline and focus.</p>
            </div>
          </div>
        </section>


        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10">What Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className={`${cardStyle} flex flex-col`}>
                <Star className="text-yellow-400 mb-4" />
                <p className={`italic mb-4 flex-grow ${theam ? 'text-gray-300' : 'text-gray-700'}`}>“{t.quote}”</p>
                <p className="font-semibold text-right">— {t.author}</p>
              </div>
            ))}
          </div>
        </section>

        
      </div>
    </div>
  );
};

export default About; 