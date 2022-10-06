const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const authorize = require("../middleware/authorize");

const pacienteInit = {
   id : 0,
   run: "",
   nombres : "",
   apellido_paterno : "",
   apellido_materno : "",
   fecha_nacimiento : "",
   fono : "",
   email: "",
   direccion : "",
   motivo_consulta : "",
   id_profesion: 0,
}

/* Listado de pacientes */
router.get("/", authorize, async(req, res, next) => {
    try {
        const listPacientes = await pool.query("SELECT paciente.* FROM paciente");
        res.status(200).json(listPacientes.rows);
    } catch (error) {
        next(error);
    }
});

/* Obtener un paciente */
router.get("/:id", authorize, async(req, res, next) => {
    try {
        const id = req.params.id;
        const paciente = await pool.query("SELECT paciente.* , profesion.nombre profesion FROM paciente INNER JOIN profesion ON profesion.id = paciente.id_profesion WHERE paciente.id = $1", [id]);

        if(paciente.rows.length !== 0) {
            res.status(200).json(paciente.rows);
        }else{
            res.status(404).json({message: "Paciente no encontrado"});
        }
    } catch (error) {
        next(error);
    }
});

/* grabar paciente */
router.post("/", authorize,  async(req, res, next) => {
    try {
        const paciente = req.body;
        
        const pacienteExist = await pool.query("SELECT * FROM paciente Where id = $1", [paciente.id]);
        if(pacienteExist.rows.length !== 0) {
            return res.status(500).json({ message: "Error al grabar el paciente, el paciente ya existe"});
        }
        
        const query = "INSERT INTO paciente " +
                    " (run, nombres, apellido_paterno, apellido_materno,fecha_nacimiento, fono, email, direccion, motivo_consulta, id_profesion) " +
                    " VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *"

        const pacienteNuevo = await pool.query(query, [paciente.run, paciente.nombres, paciente.apellido_paterno, paciente.apellido_materno, paciente.fecha_nacimiento, paciente.fono, paciente.email, paciente.direccion, paciente.motivo_consulta, paciente.id_profesion]);

        if(pacienteNuevo.rows.length !== 0) {
            const pac = await pool.query("SELECT paciente.* , profesion.nombre profesion FROM paciente INNER JOIN profesion ON profesion.id = paciente.id_profesion WHERE paciente.id = $1", [pacienteNuevo.rows[0].id]);
            res.status(200).json(pac.rows);
        }//res.status(200).json(usuario.rows);
        else res.status(500).json({ message: "Error al grabar el paciente"});
    } catch (error) {
        next(error);
    }
});

/* Modificar un paciente */
router.put("/:id", authorize, async(req, res, next) => {
    try {
        const id = req.params.id;
        const paciente = req.body;
        const pacienteExist = await pool.query("SELECT * FROM paciente Where id = $1", [paciente.id]);
        if(pacienteExist.rows.length === 0) return res.status(500).json({ message: "No existe el paciente"});


        const query = "UPDATE public.paciente " +
        " SET run = $1, nombres = $2, apellido_paterno = $3, apellido_materno = $4, fecha_nacimiento = $5, fono = $6, email = $7, " +
        " direccion = $8, motivo_consulta = $9, id_profesion = $10 " +
        " WHERE id = $11 RETURNING * ";

        const pacienteUpdate = await pool.query(query, [paciente.run, paciente.nombres, 
            paciente.apellido_paterno, paciente.apellido_materno, 
            paciente.fecha_nacimiento, paciente.fono, 
            paciente.email, paciente.direccion, 
            paciente.motivo_consulta, paciente.id_profesion,
            paciente.id
        ]);
        
        if(pacienteUpdate.rows.length !== 0)  {
            const pac = await pool.query("SELECT paciente.* , profesion.nombre profesion FROM paciente INNER JOIN profesion ON profesion.id = paciente.id_profesion WHERE paciente.id = $1", [id]);
            res.status(200).json(pac.rows);
        }//res.status(200).json(usuario.rows);
        else res.status(500).json({ message: "Error al actualizar el usuario"});
    } catch (error) {
        next(error);
    }
});

module.exports = router;