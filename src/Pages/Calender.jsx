import React, { useContext, useState, useEffect } from 'react';
import { TheamContext , userContext } from '../App';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BackgroundAnimation from "../services/BackgroundAnimation";
import enIN from 'date-fns/locale/en-IN';
import { fetchProjects } from '../services/projectService';

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
  const { userdata } = useContext(userContext);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  const events = projects?.map((project, index) => {
    let bgColor = '#ccc';

    if (project.priority === 'Hard') {
      bgColor = 'red';
    } else if (project.priority === 'Medium') {
      bgColor = 'orange';
    } else if (project.priority === 'Easy') {
      bgColor = 'green';
    }

    return {
      id: String(index),
      title: project.title,
      start: new Date(project.deadline),
      end: new Date(project.deadline),
      allDay: true,
      resource: { bgColor }
    };
  }) || [];

  const eventStyleGetter = (event) => {
    const backgroundColor = event.resource?.bgColor || '#ccc';
    const style = {
      backgroundColor,
      color: '#fff',
      borderRadius: '5px',
      border: 'none',
      padding: '4px',
    };
    return { style };
  };

  return (
    <div
      className='flex flex-col items-center justify-center w-full h-screen overflow-hidden border-none '>
      <div className="absolute inset-0 -z-10">
        <BackgroundAnimation />
      </div>
      <div style={{ width: '85%' , height : '100%', backgroundColor: 'white' }} className='border-2 border-gray-300 rounded-lg shadow-xl'>
        <h1 className="text-2xl text-center font-bold mb-4">Calendar {new Date().getFullYear()}</h1>
        <BigCalendar
          localizer={localizer}
          events={events}
          defaultView="month"
          views={['month', 'week', 'day', 'agenda']}
          startAccessor="start"
          endAccessor="end"
          date={currentDate}
          onNavigate={(date) => setCurrentDate(date)}
          style={{ height: '100%' }}
          eventPropGetter={eventStyleGetter}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
