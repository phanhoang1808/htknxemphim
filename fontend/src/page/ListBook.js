
import { useEffect } from "react";
import { useState } from "react";
import SearchForm from "./SearchForm";




const ListBook = () => {
    const [page, setPage] = useState(0);
    const [books, setBooks] = useState([]);
    const [listbook, setListbook] = useState(true);
    const [dem, setdem] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:5000/home?page=${page}`)
            .then((response) => response.json())
            .then((data) => { console.log(data); setBooks(data); })
            .catch((err) => { console.log(err) });
    }, [page]);
    const getMovieData = (key) => {
        if (key !== '') fetch(`http://localhost:5000/recomment?name=${key}`)
            .then((response) => response.json())
            .then((data) => { console.log(data); setBooks(data); })
            .catch((err) => { console.log(err) });
    }

    return (
        <>

            {listbook && (<>
                <SearchForm getMovieData={getMovieData} />
                <div class="pagination">
                    <button class="prev" onClick={() => { setPage(prevState => prevState - 1) }}>&laquo; Previous</button>
                    <button class="next" onClick={() => { setPage(prevState => prevState + 1) }}>Next &raquo;</button>
                </div>
                <section className="section-products">
                    <div className="container">

                        <div className="row">
                            {books.map((item) => {
                                const updatedDescription = item.description.replace(/[^\w\s]/g, '');
                                const updatedGenre = item.genre.replace(/[^\w\s]/g, '');
                                return (
                                    <div className="col-md-6 col-lg-4 col-xl-3" key={item.bookID}>
                                        <div className="single-product">
                                            <div className="part-1 img-fluid" style={{
                                                background: `url("images/${item.bookImage}") no-repeat center`,
                                                backgroundSize: 'cover',
                                            }}>
                                            </div>
                                            <div className="part-2">
                                                <h3 className="product-title">{`${item.name}`}</h3>
                                                <p>{updatedDescription}</p>
                                                <h4 className="product-price">{updatedGenre}</h4>
                                            </div>
                                            <button type="button" class="btn btn-secondary" onClick={() => getMovieData(item.name)}>Get Recomment</button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

            </>)}
            {/* </>)} */}

        </>
    )
}
export default ListBook;