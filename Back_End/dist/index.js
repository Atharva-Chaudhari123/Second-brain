import express from "express";
import dotenv from "dotenv";
//configs and constants
dotenv.config();
const app = express();
const port = process.env.PORT;
//middlewares
app.use(express.json());
app.use(express.urlencoded());
app.get("/", (req, res) => {
    res.send("Hello there !!! we finally ran TS code");
    res.end();
});
//starting server
app.listen(port, () => {
    console.log("Server Started Successfully");
});
//# sourceMappingURL=index.js.map