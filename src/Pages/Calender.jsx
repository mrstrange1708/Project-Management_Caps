import React, { useContext, useState, useEffect } from 'react';
import { TheamContext } from '../App';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BackgroundAnimation from "../services/BackgroundAnimation";
import enIN from 'date-fns/locale/en-IN';
import { fetchProjects } from '../services/projectService';
import { Calendar, Clock, AlertCircle, CheckCircle2, Circle } from 'lucide-react';

const locales = {
  'en-IN': enIN,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: enIN }),
  getDay,
  locales,
});

const CalendarPage = () => {
  const { theam } = useContext(TheamContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [projects, setProjects] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetchProjects();
        const data = response.data || response;
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects for calendar:', error);
        setProjects([]);
      }
    };
    loadProjects();
  }, []);

  const priorityConfig = {
    Hard: {
      color: 'rgb(239 68 68)',
      icon: <AlertCircle className="text-red-500" size={16} />,
      label: 'High Priority'
    },
    Medium: {
      color: 'rgb(249 115 22)',
      icon: <Circle className="text-orange-500" size={16} />,
      label: 'Medium Priority'
    },
    Easy: {
      color: 'rgb(34 197 94)',
      icon: <CheckCircle2 className="text-green-500" size={16} />,
      label: 'Low Priority'
    }
  };

  const events = projects?.map((project) => ({
    id: project._id,
    title: project.title,
    start: new Date(project.start),
    end: new Date(project.end),
    deadline: new Date(project.deadline),
    description: project.description,
    priority: project.priority,
    status: project.status
  })) || [];

  const eventStyleGetter = (event) => {
    const priority = event.priority || 'Easy';
    const config = priorityConfig[priority];
    
    return {
      style: {
        backgroundColor: config.color,
        opacity: 0.8,
        color: 'white',
        borderRadius: '6px',
        border: 'none',
        padding: '4px 8px',
        fontSize: '14px',
        fontWeight: '500'
      }
    };
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className={`min-h-screen p-6 ${theam ? 'text-gray-200' : 'text-gray-800'} ml-[70px] md:ml-[80px]`}>
      <div className="absolute inset-0 -z-10 ml-[70px] md:ml-[80px]">
        <BackgroundAnimation />
      </div>

      <div className="max-w-[1600px] mx-auto">

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Calendar size={28} className="text-blue-500" />
            <h1 className="text-2xl font-bold">Calendar {new Date().getFullYear()}</h1>
          </div>
          
          <div className="flex gap-4">
            {Object.entries(priorityConfig).map(([priority, config]) => (
              <div key={priority} className="flex items-center gap-2">
                {config.icon}
                <span className="text-sm hidden md:inline">{config.label}</span>
              </div>
            ))}
          </div>
        </div>


        <div className={`rounded-xl ${theam ? 'bg-black/30' : 'bg-white/50'} backdrop-blur-md border ${
          theam ? 'border-gray-700/50' : 'border-gray-200/50'
        } p-6 mb-6 min-h-[700px]`}>
          <BigCalendar
            localizer={localizer}
            events={events}
            defaultView="month"
            views={['month', 'week', 'day', 'agenda']}
            startAccessor="start"
            endAccessor="end"
            date={currentDate}
            onNavigate={(date) => setCurrentDate(date)}
            style={{ height: 650 }}
            eventPropGetter={eventStyleGetter}
            onSelectEvent={handleSelectEvent}
            className={theam ? 'calendar-dark' : 'calendar-light'}
          />
        </div>


        {selectedEvent && (
          <div className={`rounded-xl ${theam ? 'bg-black/30' : 'bg-white/50'} backdrop-blur-md border ${
            theam ? 'border-gray-700/50' : 'border-gray-200/50'
          } p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{selectedEvent.title}</h2>
              <div className="flex items-center gap-2">
                {priorityConfig[selectedEvent.priority].icon}
                <span className="text-sm">{priorityConfig[selectedEvent.priority].label}</span>
              </div>
            </div>
            
            <p className={`mb-4 ${theam ? 'text-gray-400' : 'text-gray-600'}`}>
              {selectedEvent.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="opacity-60" />
                <span className="text-sm">
                  Start: {format(selectedEvent.start, 'PPP')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="opacity-60" />
                <span className="text-sm">
                  End: {format(selectedEvent.end, 'PPP')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="opacity-60" />
                <span className="text-sm">
                  Deadline: {format(selectedEvent.deadline, 'PPP')}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .calendar-dark .rbc-toolbar button {
          color: #e5e7eb;
          background-color: rgba(31, 41, 55, 0.5);
          border: 1px solid rgba(75, 85, 99, 0.5);
        }
        
        .calendar-dark .rbc-toolbar button:hover {
          background-color: rgba(55, 65, 81, 0.5);
        }
        
        .calendar-dark .rbc-toolbar button.rbc-active {
          background-color: rgba(59, 130, 246, 0.5);
        }
        
        .calendar-dark .rbc-toolbar-label {
          color: #e5e7eb;
        }
        
        .calendar-dark .rbc-header {
          color: #e5e7eb;
          border-bottom: 1px solid rgba(75, 85, 99, 0.5);
        }
        
        .calendar-dark .rbc-today {
          background-color: rgba(59, 130, 246, 0.1);
        }
        
        .calendar-dark .rbc-off-range-bg {
          background-color: rgba(31, 41, 55, 0.3);
        }
        
        .calendar-dark .rbc-date-cell {
          color: #e5e7eb;
        }
        
        .calendar-dark .rbc-off-range {
          color: #6b7280;
        }

        .calendar-light .rbc-toolbar button {
          background-color: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(209, 213, 219, 0.5);
        }
        
        .calendar-light .rbc-toolbar button:hover {
          background-color: rgba(243, 244, 246, 0.5);
        }
        
        .calendar-light .rbc-toolbar button.rbc-active {
          background-color: rgba(59, 130, 246, 0.1);
          color: rgb(59, 130, 246);
        }
        
        .calendar-light .rbc-today {
          background-color: rgba(59, 130, 246, 0.1);
        }
        
        .calendar-light .rbc-off-range-bg {
          background-color: rgba(243, 244, 246, 0.5);
        }
      `}</style>
    </div>
  );
};

export default CalendarPage;
