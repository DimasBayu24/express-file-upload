const uploadFile = require("../middleware/upload");
const fs = require("fs");
const baseUrl = "http://localhost:8080/files/";
const connection = require('../config');

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);
    console.log(req.file);
    var gambar = req.file.originalname
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO `soal` (`pertanyaan`,`jawaban`,`gambar`,`nama_gambar`,`kategori`,`subkategori`) VALUES ('" + req.body.pertanyaan + "','" + req.body.jawaban + "','" + baseUrl + gambar + "','" + gambar + "','" + req.body.kategori + "','" + req.body.subkategori + "')", (err, result) => {
        if (!err) {
          res.send("Soal berhasil disimpan")
          // resolve(result)
          console.log(result);
        } else {
          reject(new Error(err))
        }
      })
    })
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const createKategori = (req, res) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO kategori (kategori) VALUES ('" + req.body.kategori + "')", (err, result) => {
      if (!err) {
        res.send(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const createSubKategori = (req, res) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO subkategori (subkategori) VALUES ('" + req.body.subkategori + "')", (err, result) => {
      if (!err) {
        res.send(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const getAll = (req, res) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM soal', (err, result) => {
      if (!err) {
        res.send(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const getKategori = (req, res) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM kategori', (err, result) => {
      if (!err) {
        res.send(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const getSubKategori = (req, res) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM subkategori', (err, result) => {
      if (!err) {
        res.send(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  console.log(res);
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

const deleteKategori = (req, res) => {
  return new Promise((resolve, reject) => {
    connection.query("DELETE FROM kategori WHERE id=?", req.body.id, (err, result) => {
      if (!err) {
        res.send(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const deleteSubKategori = (req, res) => {
  return new Promise((resolve, reject) => {
    connection.query("DELETE FROM subkategori WHERE id=?", req.body.id, (err, result) => {
      if (!err) {
        res.send(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const deleteSoalByKategori = (req, res) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM soal WHERE kategori=?', req.params.id, (err, result) => {
      if (!err) {
        res.send(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}
const deleteSoalBySubKategori = (req, res) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM soal WHERE subkategori=?', req.params.id, (err, result) => {
      if (!err) {
        res.send(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}
const deleteSoal = (req, res) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM soal WHERE id=?', req.params.id, (err, result) => {
      if (!err) {
        res.send(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const updateSoal = async (req, res) => {
  try {
    await uploadFile(req, res);
    console.log(req.file);
    var gambar = req.file.originalname
    // console.log(req.body);
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    return new Promise((resolve, reject) => {
      connection.query("UPDATE `soal` SET pertanyaan='" + req.body.pertanyaan + "',jawaban='" + req.body.jawaban + "' ,gambar='" + baseUrl + gambar + "' ,nama_gambar='" + gambar + "' ,kategori='" + req.body.kategori + "' ,subkategori='" + req.body.subkategori + "' WHERE id='" + req.body.id + "'  ", (err, result) => {
        if (!err) {
          res.send("Soal berhasil diubah")
          // resolve(result)
          console.log(result);
        } else {
          reject(new Error(err))
        }
      })
    })
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const updateKategori = (req, res) => {
  return new Promise((resolve, reject) => {
    connection.query("UPDATE kategori SET kategori='" + req.body.kategori + "' WHERE id='" + req.body.id + "' ", (err, result) => {
      if (!err) {
        res.send(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const updateSubKategori = (req, res) => {
  return new Promise((resolve, reject) => {
    connection.query("UPDATE subkategori SET subkategori='" + req.body.subkategori + "' WHERE id='" + req.body.id + "' ", (err, result) => {
      if (!err) {
        res.send(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

module.exports = {
  upload,
  createKategori,
  createSubKategori,
  deleteKategori,
  deleteSubKategori,
  deleteSoal,
  deleteSoalBySubKategori,
  deleteSoalByKategori,
  updateKategori,
  updateSoal,
  updateSubKategori,
  getKategori,
  getSubKategori,
  download,
  getAll,
};
