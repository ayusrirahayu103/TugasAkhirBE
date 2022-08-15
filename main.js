import express from "express";
import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();

const app = express();

app.use(express.json());

const port = 12000;

app.get("/bayi", async (req, res) => {
  try {
    const bayi = await database.bayi.findMany();
    if (!bayi) throw new Error("Data Bayi Tidak Terdaftar");
    res.send(bayi);
  } catch (err) {
    res.send({ status: 404, message: err.message });
  }
});

//mengambil data bayi  berdasarkan id nya
app.get("/bayi/:id", async (req, res) => {
  try {
    const bayi = await database.bayi.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!bayi) throw new Error("Data Bayi Tidak Ditemukkan");
    res.send(bayi);
  } catch (err) {
    res.send({ status: 404, message: err.message });
  }
});

//Untuk membuat data baru pada tabel
app.post("/bayi/create", async (req, res) => {
  try {
    const bayi = await database.bayi.create({
      data: {
        namabayi: req.body.namabayi,
        umur: req.body.umur,
        namaibu: req.body.namaibu,
        tahunlahir: req.body.tahunlahir,
      },
    });
    res.send({ message: "Data Bayi Telah Ditambahkan ", data: bayi });
  } catch (err) {}
});

//Untuk menambahkan/perbaharui data mahasiswa
app.put("/bayi/update/", async (req, res) => {
  try {
    const bayi = await database.bayi.update({
      where: {
        id: req.body.id,
      },
      data: {
        namabayi: req.body.namabayi,
        umur: req.body.umur,
        namaibu: req.body.namaibu,
        tahunlahir: req.body.tahunlahir,
      },
    });
    res.send({ message: "Data Berhasil di Update", data: bayi });
  } catch (err) {}
});

 //Untuk menghapus data mahasiswa
app.delete("/bayi/delete", async (req, res) => {
  await database.bayi.delete({
    where: {
      id: req.body.id,
    },
  });
  res.send({ message: "Data Berhasil Dihapus" });
});

app.listen(port, () => {
  console.log(`Aplikasi nya berjalan di port ${port}`);
});