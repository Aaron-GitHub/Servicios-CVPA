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
    activo: true
}

/* Listado de calendario */
router.get("/", authorize, async(req, res, next) => {
    try {
        const listCalendario = await pool.query("SELECT title, starts start, ends end, descripcion, color, activo FROM agenda Where activo = $1", [true]);
        res.status(200).json(listCalendario.rows);
    } catch (error) {
        next(error);
    }
});

/* Obtener un calendario */
router.get("/:id", authorize, async(req, res, next) => {
    try {
        const id = req.params.id;
        const agenda = await pool.query("SELECT agenda.* FROM agenda WHERE agenda.id = $1", [id]);

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
                    " (title, starts, ends, descripcion, color, activo) " +
                    " VALUES ($1, $2, $3, $4, $5, $6) RETURNING *"

        const calendarioNuevo = await pool.query(query, [calendario.title, calendario.start, calendario.end, calendario.descripcion, calendario.color, calendario.activo]);

        if(calendarioNuevo.rows.length !== 0) {
            const cal = await pool.query("SELECT title, starts start, ends end, descripcion, color, activo FROM agenda WHERE agenda.id = $1", [calendarioNuevo.rows[0].id]);
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
        " SET title = $1, starts = $2, ends = $3, descripcion = $4, color = $5, activo = $6 " +
        " WHERE id = $7 RETURNING * ";

        const calendarioUpdate = await pool.query(query, [calendario.title, calendario.start, 
            calendario.end, calendario.descripcion, 
            calendario.color, calendario.activo, calendario.id
        ]);

        if(calendarioUpdate.rows.length !== 0)  {
            const pac = await pool.query("SELECT title, starts start, ends end, descripcion, color, activo FROM agenda WHERE id = $1", [id]);
            res.status(200).json(pac.rows);
        }//res.status(200).json(usuario.rows);
        else res.status(500).json({ message: "Error al actualizar la reserva"});
    } catch (error) {
        next(error);
    }
});

module.exports = router;