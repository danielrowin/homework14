export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/books');
  const { books } = await res.json();

  return {
    props: {
      books,
    },
  };
}

function DataPage({ books }) {
  return (
    <div>
      <h1>Server-side Rendered Books</h1>
      {books.map(book => (
        <div key={book.id}>
          <h2>{book.title}</h2>
          <p>{book.author}</p>
        </div>
      ))}
    </div>
  );
}

export default DataPage;
