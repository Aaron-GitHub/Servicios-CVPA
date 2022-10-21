const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const authorize = require("../middleware/authorize");

const calendarioInit = {
    id : 0,
    title: "",
    start: "",
    end: "",
    descripcion: "",
    color: "",
    activo: true,
    id_profesion: 0,
    id_paciente: 0
}

const QueryDefaultSelect = "SELECT agenda.id, agenda.title, agenda.starts start, agenda.ends end, agenda.descripcion, agenda.color, agenda.activo, agenda.id_profesion, agenda.id_paciente, profesion.nombre nombre_profesion, " +
" id_paciente, concat(paciente.nombres, ' ', paciente.apellido_paterno, ' ', paciente.apellido_materno ) nombre_paciente " +
" FROM agenda INNER JOIN profesion ON profesion.id = agenda.id_profesion INNER JOIN paciente ON paciente.id = agenda.id_paciente ";

/* Listado de calendario */
router.get("/", authorize, async(req, res, next) => {
    try {
        const listCalendario = await pool.query(QueryDefaultSelect + " Where agenda.activo = $1", [true]);
        res.status(200).json(listCalendario.rows);
    } catch (error) {
        next(error);
    }
});

/* Obtener un calendario */
router.get("/:id", authorize, async(req, res, next) => {
    try {
        const id = req.params.id;
        const agenda = await pool.query(QueryDefaultSelect + " WHERE agenda.id = $1", [id]);

        if(agenda.rows.length !== 0) {
            res.status(200).json(agenda.rows);
        }else{
            res.status(404).json({message: "Reserva no encontrada"});
        }
    } catch (error) {
        next(error);
    }
});

/* Obtener un calendario por paciente */
router.get("/paciente/:id", authorize, async(req, res, next) => {
    try {
        const id = req.params.id;
        const agenda = await pool.query(QueryDefaultSelect + " WHERE agenda.id_paciente = $1 order by start desc", [id]);

        if(agenda.rows.length !== 0) {
            res.status(200).json(agenda.rows);
        }else{
            res.status(404).json({message: "Reserva no encontrada"});
        }
    } catch (error) {
        next(error);
    }
});

/* grabar calendario */
router.post("/", authorize,  async(req, res, next) => {
    try {
        const calendario = req.body;
        
        const calendarioExist = await pool.query("SELECT * FROM agenda Where id = $1", [calendario.id]);
        if(calendarioExist.rows.length !== 0) {
            return res.status(500).json({ message: "Error al grabar la reserva, ya existe"});
        }
        
        const query = "INSERT INTO agenda " +
                    " (title, starts, ends, descripcion, color, activo, id_paciente, id_profesion) " +
                    " VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *"

       
        const calendarioNuevo = await pool.query(query, [calendario.title, calendario.start, 
                                                        calendario.end, calendario.descripcion, 
                                                        calendario.color, calendario.activo,
                                                        calendario.id_paciente, calendario.id_profesion]);

        if(calendarioNuevo.rows.length !== 0) {
           const cal = await pool.query(QueryDefaultSelect + " WHERE agenda.id = $1 ", [calendarioNuevo.rows[0].id]);
            res.status(200).json(cal.rows);
        }//res.status(200).json(usuario.rows);
        else res.status(500).json({ message: "Error al grabar la reserva"});
    } catch (error) {
        next(error);
    }
});

/* Modificar un calendario */
router.put("/:id", authorize, async(req, res, next) => {
    try {
        const id = req.params.id;
        const calendario = req.body;

        const calendarioExist = await pool.query("SELECT * FROM agenda Where id = $1", [calendario.id]);
        if(calendarioExist.rows.length === 0) return res.status(500).json({ message: "No existe la reserva"});


        const query = "UPDATE public.agenda " +
        " SET title = $1, starts = $2, ends = $3, descripcion = $4, color = $5, activo = $6 , id_paciente = $7, id_profesion = $8 " +
        " WHERE id = $9 RETURNING * ";

        const calendarioUpdate = await pool.query(query, [calendario.title, calendario.start, 
            calendario.end, calendario.descripcion, 
            calendario.color, calendario.activo, 
            calendario.id_paciente, calendario.id_profesion,
            calendario.id
        ]);

        if(calendarioUpdate.rows.length !== 0)  {
            const pac = await pool.query( QueryDefaultSelect + " WHERE agenda.id = $1 ", [id]);
            
            console.log(pac);

            res.status(200).json(pac.rows);
        }//res.status(200).json(usuario.rows);
        else res.status(500).json({ message: "Error al actualizar la reserva"});
    } catch (error) {
        console.log(error.message);
        next(error);
    }
});

module.exports = router;