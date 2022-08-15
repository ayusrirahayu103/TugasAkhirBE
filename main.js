import express from "express";
import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();

const app = express();

app.use(express.json());

const port = 12000;

app.get("/mahasiswa", async (req, res) => {
  try {
    const mahasiswa = await database.mahasiswa.findMany();
    if (!mahasiswa) throw new Error("Data Mahasiswa Tidak Ditemukan");
    res.send(mahasiswa);
  } catch (err) {
    res.send({ status: 404, message: err.message });
  }
});

//mengambil data mahasiswa berdasarkan id nya
app.get("/mahasiswa/:id", async (req, res) => {
  try {
    const mahasiswa = await database.mahasiswa.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!mahasiswa) throw new Error("Data Mahasiswa Tidak Ditemukan");
    res.send(mahasiswa);
  } catch (err) {
    res.send({ status: 404, message: err.message });
  }
});

//Untuk membuat data baru pada tabel
app.post("/mahasiswa/create", async (req, res) => {
  try {
    const mahasiswa = await database.mahasiswa.create({
      data: {
        nama: req.body.nama,
        email: req.body.email,
        nim: req.body.nim,
        kelas: req.body.kelas,
      },
    });
    res.send({ message: "Data Mahasiswa Berhasil di Buat", data: mahasiswa });
  } catch (err) {}
});

//Untuk menambahkan/perbaharui data mahasiswa
app.put("/mahasiswa/update/", async (req, res) => {
  try {
    const mahasiswa = await database.mahasiswa.update({
      where: {
        id: req.body.id,
      },
      data: {
        nama: req.body.nama,
        email: req.body.email,
        nim: req.body.nim,
        kelas:req.body.kelas,
      },
    });
    res.send({ message: "Mahasiswa Berhasil di update", data: mahasiswa });
  } catch (err) {}
});

 //Untuk menghapus data mahasiswa
app.delete("/mahasiswa/delete", async (req, res) => {
  await database.mahasiswa.delete({
    where: {
      id: req.body.id,
    },
  });
  res.send({ message: "Data Mahasiswa Berhasil Dihapus" });
});

app.listen(port, () => {
  console.log(`Aplikasi nya berjalan di port ${port}`);
});