import express, { Express, Request, Response } from 'express';

const app:Express = express();
app.get("/", (req:Request, res:Response) => {
    res.json({message: "BlogX backend"})
}) 
app.listen(4000, () => console.log("Listening on port 4000!!"));
