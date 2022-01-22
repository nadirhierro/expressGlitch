import Container from "./container.js";
import express from "express";

const products = new Container("./products.txt");

const app = express();

const PORT = 8080;

app.get("/", (req, res, next) => {
  res.send({ mensaje: "hola mundo" });
});

app.get("/productos", async (req, res, next) => {
  try {
    let data = await products.getAll();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/productoRandom", async (req, res, next) => {
  try {
    let data = await products.getAll();
    let idRandom = () => {
      return Math.floor(Math.random() * data.length + 1);
    };
    let product = data.find((producto) => producto.id == idRandom());
    res.json(product);
  } catch (err) {
    console.log(err);
  }
});

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
