const multer = require('multer');
const path = require('path');

const fs = require('fs');

// путь к папке uploads внутри текущего проекта
const uploads = path.join(__dirname, '../../', 'uploads');

// если папки нет — создадим её
if (!fs.existsSync(uploads)) {
  fs.mkdirSync(uploads, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploads);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Фильтрация по типам файлов
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Только изображения!'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // максимум 1MB на файл
  fileFilter,
});

module.exports = upload;
