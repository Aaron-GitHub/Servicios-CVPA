const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const authorize = require("../middleware/authorize");

const userInit = {
    id: 0,
    nombres: "",
    apellidos: "",
    run: "",
    email: "",
    id_profesion: 0,
    activo: false
}

/* Listado de usuarios */
router.get("/", authorize, async(req, res, next) => {
    try {
        const listUser = await pool.query("SELECT usuario_profesional.*, profesion.nombre profesion FROM usuario_profesional " +
                                        " INNER JOIN profesion ON profesion.id = usuario_profesional.id_profesion");
        res.status(200).json(listUser.rows);
    } catch (error) {
        next(error);
    }
});

/* Obtener un usuario */
router.get("/:id", authorize, async(req, res, next) => {
    try {
        const id = req.params.id;
        const user = await pool.query("SELECT usuario_profesional.*, profesion.nombre profesion FROM usuario_profesional " +
                                    " INNER JOIN profesion ON profesion.id = usuario_profesional.id_profesion WHERE usuario_profesional.id = $1", [id]);

        if(user.rows.length !== 0) {
            res.status(200).json(user.rows);
        }else{
            res.status(404).json({message: "Usuario no encontrado"});
        }
    } catch (error) {
        next(error);
    }
});

/* grabar usuario */
router.post("/", authorize,  async(req, res, next) => {
    try {
        const user = req.body;
        
        const userExist = await pool.query("SELECT * FROM usuario_profesional Where email = $1", [user.email]);
        if(userExist.rows.length !== 0) {
            return res.status(500).json({ message: "Error al grabar el usuario, el usuario ya existe"});
        }
        
        let pass = user.run.replace(".", "").slice(0,5);
        const password = pass;
        //Encriptar password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const query = "INSERT INTO usuario_profesional " +
                    " (nombres, apellidos, run, email, contrasena, id_profesion, activo, administrador) " +
                    " VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *"

        const usuario = await pool.query(query, [ user.nombres, user.apellidos, user.run, user.email, bcryptPassword, user.id_profesion, user.activo, user.administrador]);

        if(usuario.rows.length !== 0) {
            const user = await pool.query("SELECT usuario_profesional.*, profesion.nombre profesion FROM usuario_profesional " +
                                    " INNER JOIN profesion ON profesion.id = usuario_profesional.id_profesion WHERE usuario_profesional.id = $1", [usuario.rows[0].id]);
            res.status(200).json(user.rows);
        }//res.status(200).json(usuario.rows);
        else res.status(500).json({ message: "Error al grabar el usuario"});
    } catch (error) {
        next(error);
    }
});

/* Modificar un usuario */
router.put("/:id", authorize, async(req, res, next) => {
    try {
        const id = req.params.id;
        const user = req.body;

        const userExist = await pool.query("SELECT * FROM usuario_profesional WHERE id = $1", [id]);
        if(userExist.rows.length === 0) return res.status(500).json({ message: "No existe el usuario"});

        const query = "UPDATE public.usuario_profesional " +
        " SET nombres= $1, apellidos= $2, run= $3, email= $4, id_profesion= $5, activo= $6, administrador = $7 " +
        " WHERE id = $8 RETURNING * ";

        const usuario = await pool.query(query, [user.nombres, user.apellidos, 
            user.run, user.email, 
            user.id_profesion, user.activo, 
            user.administrador, user.id]);

        if(usuario.rows.length !== 0)  {
            const user = await pool.query("SELECT usuario_profesional.*, profesion.nombre profesion FROM usuario_profesional " +
                                    " INNER JOIN profesion ON profesion.id = usuario_profesional.id_profesion WHERE usuario_profesional.id = $1", [id]);
            res.status(200).json(user.rows);
        }//res.status(200).json(usuario.rows);
        else res.status(500).json({ message: "Error al actualizar el usuario"});
    } catch (error) {
        next(error);
    }
});

module.exports = router;