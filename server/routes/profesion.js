const router = require("express").Router();
const pool = require("../db");
const authorize = require("../middleware/authorize");

const profesionInit = {
    id: 0,
    nombre: "",
    activo: false
}

/* Listado de profesion */
router.get("/", authorize, async(req, res, next) => {
    try {
        const listProfesion = await pool.query("SELECT * FROM profesion");
        res.status(200).json(listProfesion.rows);
    } catch (error) {
        next(error);
    }
});

/* Obtener un profesion */
router.get("/:id", authorize, async(req, res, next) => {
    try {
        const id = req.params.id;
        const profesion = await pool.query("SELECT * FROM profesion WHERE id = $1", [id]);

        if(profesion.rows.length !== 0) {
            res.status(200).json(profesion.rows);
        }else{
            res.status(404).json({message: "Profesion no encontrada"});
        }
    } catch (error) {
        next(error);
    }
});

/* grabar profesion */
router.post("/", authorize,  async(req, res, next) => {
    try {
        const prof = req.body;
        
        const profesionExist = await pool.query("SELECT * FROM profesion Where nombre = $1", [prof.nombre]);
        if(profesionExist.rows.length !== 0) {
            return res.status(500).json({ message: "Error al grabar la profesión, ya existe"});
        }
        
        const query = "INSERT INTO profesion " +
                    " (nombre, activo) " +
                    " VALUES ($1, $2) RETURNING *"

        const profesion = await pool.query(query, [ prof.nombre, prof.activo]);
        if(profesion.rows.length !== 0) res.status(200).json(profesion.rows);
        else res.status(500).json({ message: "Error al grabar la profesion"});
    } catch (error) {
        next(error);
    }
});

/* Modificar un profesion */
router.put("/:id", authorize, async(req, res, next) => {
    try {
        const id = req.params.id;
        const prof = req.body;

        const profesionExist = await pool.query("SELECT * FROM profesion WHERE id = $1", [id]);
        if(profesionExist.rows.length === 0) return res.status(500).json({ message: "No existe la profesión"});

        const query = "UPDATE public.profesion " +
        " SET nombre= $1, activo= $2 " +
        " WHERE id = $3 RETURNING * ";

        const profesion = await pool.query(query, [prof.nombre, prof.activo, prof.id]);
        
        if(profesion.rows.length !== 0) res.status(200).json(profesion.rows);
        else res.status(500).json({ message: "Error al actualizar la profesión"});
    } catch (error) {
        next(error);
    }
});

module.exports = router;