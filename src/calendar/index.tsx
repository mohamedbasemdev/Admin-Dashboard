import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import type {
  EventApi,
  DateSelectArg,
  EventClickArg,
} from "@fullcalendar/core";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

import { Box, Typography, useTheme } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { tokens } from "../theme";
import { useState } from "react";
import Header from "../component/Header";

const CalendarComponent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [currentEvents, setCurrentEvent] = useState<EventApi[]>([]);

  const handleDateClick = (selected: DateSelectArg) => {
    const title = prompt("please enter an event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.startStr}-${title}`,
        title: title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };
  const deleteEvent = (selected: EventClickArg) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };
  return (
    <Box>
      <Box className="px-3">
        <Header title={"CALENDAR"} subtitle={"Manging the Calendar Member"} />
      </Box>
      <Box className="flex md:flex-row flex-col gap-3" sx={{ width: "98%", m: "auto" }}>
        <Box
          className="flex-2"
          sx={{ background: colors.primary[600], p: "10px" }}
        >
          <List>
            <Typography>Events</Typography>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{ background: colors.greenAccent[500], m: "10px 0" }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    event.start &&
                    formatDate(event.start, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box className="flex-8">
          <FullCalendar
            height={"75vh"}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
              interactionPlugin,
            ]}
            editable={true}
            select={handleDateClick}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            eventClick={deleteEvent}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialEvents={[
              { id: "1234", title: "birthday", date: "2026-07-14" },
              { id: "4321", title: "work", date: "2026-07-25" },
            ]}
            initialView="dayGridMonth"
            eventsSet={(events) => setCurrentEvent(events)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CalendarComponent;
