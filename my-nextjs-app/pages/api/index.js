export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/books');
    const { books } = await res.json();
  
    return {
      props: {
        books,
      },
    };
  }
  
  function HomePage({ books }) {
    return (
      <div>
        <h1>Static Generated Books</h1>
        {books.map(book => (
          <div key={book.id}>
            <h2>{book.title}</h2>
            <p>{book.author}</p>
          </div>
        ))}
      </div>
    );
  }
  
  export default HomePage;
  