import express from "express";
import dotenv from 'dotenv';
dotenv.config()
import bodyParser from "body-parser";
import methodOverride from 'method-override';
import cookieParser from "cookie-parser";

import connection from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
// import configCors from "./config/cors";

const app = express();

//config cors
// configCors(app)

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config cookie-parser
app.use(cookieParser());

//test connection
connection();

//congfig view engine
configViewEngine(app);

//config method-override
app.use(methodOverride('_method'));

//config web routes
initWebRoutes(app);
initApiRoutes(app)




const PORT = process.env.PORT || 8081



app.listen(PORT, () => {
    console.log(`Server is runing on port: `, PORT);
})
