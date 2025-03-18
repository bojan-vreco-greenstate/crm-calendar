import {
  Calendar,
  dateFnsLocalizer,
  Event,
  View,
  Views,
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import events from './events';
import { CustomEvent } from './CustomEvent';
import { EventType } from './enums/eventType';
import { useState } from 'react';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const defaultDate = new Date(2015, 3, 12);

const eventPropGetter = (event: Event) => {
  return {
    style: {
      backgroundColor:
        event.resource === EventType.CALL ? '#03AC93' : '#FF9F1A',
      borderRadius: '4px',
      fontSize: '14px',
      borderColor: '#F9F9FB',
    },
  };
};

export const MyCalendar = () => {
  const [view, setView] = useState<View>(Views.DAY);
  const [currentDate, setCurrentDate] = useState(defaultDate);

  const handleNavigate = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  const handleViewChange = (newView: View) => {
    setView(newView);
  };

  return (
    <div style={{ height: '80vh', overflowY: 'auto' }}>
      <Calendar
        defaultDate={currentDate}
        date={currentDate}
        view={view}
        onNavigate={handleNavigate}
        onView={handleViewChange}
        defaultView={Views.DAY}
        events={events}
        localizer={localizer}
        step={15}
        timeslots={4}
        components={{
          event: CustomEvent,
        }}
        eventPropGetter={eventPropGetter}
      />
    </div>
  );
};
