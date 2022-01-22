import * as fs from "node:fs";

export default class Container {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async write(data) {
    try {
      return await fs.promises.writeFile(
        `${this.fileName}`,
        `${JSON.stringify(data, null, 2)}`
      );
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    try {
      let data = await fs.promises.readFile(`${this.fileName}`, "utf-8");
      if (data) {
        return JSON.parse(data);
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
    }
  }

  async save(obj) {
    try {
      let data = await this.getAll();
      if (data.find((product) => product.title == obj.title)) {
        console.log(
          `El producto ya se encuentra en el archivo, no se puede agregar...`
        );
        return null;
      } else {
        let id = 1;
        if (data.length > 0) {
          let ids = data.map((product) => product.id);
          id = Math.max.apply(null, ids) + 1;
        }
        let newObject = {
          id: id,
          ...obj,
        };
        data.push(newObject);
        await this.write(data);
        return id;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getById(id) {
    let data = await this.getAll();
    console.log(data.find((data) => data.id == id));
    return data.find((data) => data.id == id);
  }

  async deleteById(id) {
    try {
      let data = await this.getAll();
      if (data.find((product) => product.id == id)) {
        let newData = data.filter((data) => data.id != id);
        await this.write(newData);
        console.log(`Producto borrado`);
      } else {
        console.log(`No existe un producto con ese id`);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async deleteAll() {
    try {
      await this.write([]);
      console.log(`Todos los productos fueron borrados`);
    } catch (err) {
      console.log(err);
    }
  }
}
