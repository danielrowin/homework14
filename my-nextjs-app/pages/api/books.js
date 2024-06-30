import multer from multer;
import nextConnect from next-connect;
import { verify } from jsonwebtoken;

const upload = multer({ dest: 'public/uploads/' });

const handler = nextConnect();

handler.use(upload.single('image'));

handler.post(async (req, res) => {
  const { title, author, publisher, year, pages } = req.body;
  const image = req.file.filename;
  const token = req.headers.authorization.split(' ')[1];
  const decoded = verify(token, 'secretkey');
  const userId = decoded.userId;

  const book = await prisma.book.create({
    data: {
      title,
      author,
      publisher,
      year,
      pages,
      image,
    },
  });

  res.status(201).json({ book });
});

handler.get(async (req, res) => {
  const books = await prisma.book.findMany();
  res.status(200).json({ books });
});

export default handler;

