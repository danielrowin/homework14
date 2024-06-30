import { verify } from jsonwebtoken;

export default async function handler(req, res) {
  const { id } = req.query;
  const token = req.headers.authorization.split(' ')[1];
  const decoded = verify(token, 'secretkey');

  if (req.method === 'PUT') {
    const { title, author, publisher, year, pages } = req.body;
    const book = await prisma.book.update({
      where: { id: parseInt(id) },
      data: { title, author, publisher, year, pages },
    });
    res.status(200).json({ book });
  } else if (req.method === 'DELETE') {
    const book = await prisma.book.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ book });
  } else if (req.method === 'GET') {
    const book = await prisma.book.findUnique({ where: { id: parseInt(id) } });
    res.status(200).json({ book });
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
