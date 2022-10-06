const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorize = require("../middleware/authorize");

router.post("/", validInfo, async(req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query("SELECT usuario_profesional.*, profesion.nombre profesion " +
                                    " FROM usuario_profesional " +
                                    " INNER JOIN profesion ON profesion.id = usuario_profesional.id_profesion Where email = $1 and usuario_profesional.activo = 'true'", [email]);
        if(user.rows.length !== 0) {
            const userPass = user.rows[0].contrasena;
            const passValida = await bcrypt.compare(password, userPass);

            if (passValida) { 
                const token = jwtGenerator(user.rows[0].id);

                res.status(200).json({
                    token: token,
                    user : {
                        id: user.rows[0].id,
                        nombres: user.rows[0].nombres,
                        apellidos: user.rows[0].apellidos,
                        run: user.rows[0].run,
                        email: user.rows[0].email,
                        id_profesion: user.rows[0].id_profesion,
                        activo: user.rows[0].activo,
                        profesion: user.rows[0].profesion
                    }
                });
            } else res.status(403).json({message: "Contraseña incorrecta"});
        } else res.status(404).json({message: "Usuario o contraseña incorrectas."}); 
      
    } catch (error) {
        next(error);
    }
})


router.post("/verify", authorize, (req, res, next) => {
    try {
        res.status(200).json(true);
    } catch (error) {
        next(error);
    }
});

module.exports = router;