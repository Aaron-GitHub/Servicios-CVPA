import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import { useContext, useEffect, useMemo, useState } from "react";
import { CalendarioContext } from "../context/calendarioContext";
import { formatDate } from "../../../utilities/Utiles";

const FullCalendario = () => {
  const calendarioDefault = useMemo(() => {
    return {
      id: 0,
      title: "",
      start: "",
      end: "",
      descripcion: "",
      color: "",
      activo: true,
    };
  }, []);

  const [newCalendar, SetNewCalendar] = useState(calendarioDefault);

  const { obtenerCalendarioList, calendarioList, newCalendario } =
    useContext(CalendarioContext);

  const handleSelect = (info) => {
    const { start, end } = info;

    let calendarioTmp = { ...newCalendar };
    calendarioTmp.start = formatDate(start);
    calendarioTmp.end = formatDate(end);

    newCalendario(calendarioTmp);

    let close = document.querySelector("#agendar-new");
    close.click();
  };

  useEffect(() => {
    obtenerCalendarioList();
  }, []);

  return (
    <>
      <FullCalendar
        allDayText="all day"
        displayEventTime={true}
        dayMaxEvents={true}
        dateClick={(e) => console.log(e.dateStr)}
        events={calendarioList}
        editable={true}
        eventClick={(e) => console.log(e.event.id)}
        headerToolbar={{
          start: "today prev next",
          center: "title",
          end: "dayGridMonth timeGridWeek timeGridDay listWeek",
        }}
        initialView="timeGridWeek"
        locale="es"
        navLinks={true}
        nowIndicator
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        select={(e) => handleSelect(e)}
        selectable={true}
        selectMirror={true}
      />
    </>
  );
};

export default FullCalendario;
