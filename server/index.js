const express = require("express")
const app = express();
const cors = require("cors");
require("dotenv").config();

const authRoute =  require("./routes/auth");
const agendaRoute = require("./routes/agenda");
const userRoute =  require("./routes/users");
const profesionRoute =  require("./routes/profesion");
const pacienteRoute =  require("./routes/pacient");

const PUERTO = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(cors());

//Routes
app.use("/calendario", agendaRoute);
app.use("/usuario", userRoute);
app.use("/profesion", profesionRoute);
app.use("/paciente", pacienteRoute);


//login routes
app.use("/auth", authRoute);

//Manejo de errores
app.use((err, req, res, next ) => {
    return res.status(500).json({message: err.message});
})


app.listen(PUERTO, () => {
    console.log("Server iniciado en el puerto " + PUERTO)
})