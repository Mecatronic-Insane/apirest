import express from "express";
import morgan from "morgan";
import brandRoutes from "./routes/brand.routes";

const app=express();

//setting
app.set("port",4000);

//middleware
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use(brandRoutes);

module.exports = app;                                                                                                                                