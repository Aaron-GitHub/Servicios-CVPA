import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import { useContext, useEffect, useMemo, useState } from "react";
import { CalendarioContext } from "../context/calendarioContext";
import { formatDate } from "../../../utilities/Utiles";
import { SelectsContext } from "../../../context/SelectsContext";

const FullCalendario = () => {
  const { obtenerProfesiones, obtenerPacientes } = useContext(SelectsContext);
  const calendarioDefault = useMemo(() => {
    return {
      id: 0,
      title: "",
      start: "",
      end: "",
      descripcion: "",
      color: "",
      id_profesion: 0,
      profesion: "",
      id_paciente: 0,
      paciente: "",
      activo: true,
    };
  }, []);
  const [newCalendar, SetNewCalendar] = useState(calendarioDefault);
  const { obtenerCalendarioList, calendarioList, newCalendario } =
    useContext(CalendarioContext);
  useEffect(() => {
    obtenerCalendarioList();
    obtenerProfesiones();
    obtenerPacientes();
  }, []);
  const handleSelect = (info) => {
    const { start, end } = info;
    let calendarioTmp = { ...newCalendar };
    calendarioTmp.start = formatDate(start);
    calendarioTmp.end = formatDate(end);
    newCalendario(calendarioTmp);
    let close = document.querySelector("#agendar-new");
    close.click();
  };
  const handleEventSelect = (info) => {
    console.log(info);
    const { publicId } = info._def;
    const { start, end, title, backgroundColor } = info;
    const { descripcion, id_profesion, id_paciente } = info.extendedProps;
    let calendarioTmp = { ...newCalendar };
    calendarioTmp.id = publicId;
    calendarioTmp.start = formatDate(start);
    calendarioTmp.end = formatDate(end);
    calendarioTmp.title = title;
    calendarioTmp.descripcion = descripcion;
    calendarioTmp.color = backgroundColor;
    calendarioTmp.id_profesion = id_profesion;
    calendarioTmp.id_paciente = id_paciente;
    newCalendario(calendarioTmp);
    let close = document.querySelector("#agendar-new");
    close.click();
  };
  return (
    <>
      <FullCalendar
        allDayText="all day"
        displayEventTime={true}
        dayMaxEvents={true}
        dateClick={(e) => console.log(e.dateStr)}
        events={calendarioList}
        editable={true}
        eventClick={(e) => handleEventSelect(e.event)}
        firstDay={1}
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
