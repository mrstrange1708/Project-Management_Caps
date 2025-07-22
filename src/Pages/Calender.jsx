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
import dayjs from 'dayjs';

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
        toast.error('Failed to load projects');
        setProjects([]);
      }
    };
    loadProjects();
  }, []);

  const priorityConfig = {
    Hard: {
      color: 'rgba(239, 68, 68, 0.9)',
      borderColor: 'rgb(239, 68, 68)',
      icon: <AlertCircle className="text-red-500" size={16} />,
      label: 'High Priority'
    },
    Medium: {
      color: 'rgba(249, 115, 22, 0.9)',
      borderColor: 'rgb(249, 115, 22)',
      icon: <Circle className="text-orange-500" size={16} />,
      label: 'Medium Priority'
    },
    Easy: {
      color: 'rgba(34, 197, 94, 0.9)',
      borderColor: 'rgb(34, 197, 94)',
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
    status: project.status,
    resource: priorityConfig[project.priority]
  })) || [];

  const eventStyleGetter = (event) => {
    const config = event.resource || priorityConfig.Easy;
    
    return {
      style: {
        backgroundColor: config.color,
        borderLeft: `4px solid ${config.borderColor}`,
        borderRadius: '4px',
        opacity: 0.9,
        color: 'white',
        border: 'none',
        display: 'block',
        fontSize: '14px',
        padding: '4px 8px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }
    };
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const customDayPropGetter = (date) => {
    const isToday = dayjs(date).isSame(dayjs(), 'day');
    return {
      style: {
        backgroundColor: isToday ? (theam ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)') : 'transparent',
        transition: 'background-color 0.2s ease'
      }
    };
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
            dayPropGetter={customDayPropGetter}
            onSelectEvent={handleSelectEvent}
            className={theam ? 'calendar-dark' : 'calendar-light'}
            tooltipAccessor={event => `${event.title} (${event.priority})`}
          />
        </div>

        {selectedEvent && (
          <div className={`rounded-xl ${theam ? 'bg-black/30' : 'bg-white/50'} backdrop-blur-md border ${
            theam ? 'border-gray-700/50' : 'border-gray-200/50'
          } p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{selectedEvent.title}</h2>
              <div className="flex items-center gap-2">
                {selectedEvent.resource.icon}
                <span className="text-sm">{selectedEvent.resource.label}</span>
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

        .calendar-dark .rbc-event {
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        .calendar-dark .rbc-event:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
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

        .calendar-light .rbc-event {
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .calendar-light .rbc-event:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default CalendarPage;
