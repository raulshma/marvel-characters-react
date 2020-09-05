import React, { useEffect, useState } from 'react';
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';
import ReactPaginate from 'react-paginate';
import CharacterCard from './CharacterCard';
import './App.css';

const baseURL = 'https://marvel-apiproxy.herokuapp.com/api/v1/';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageState, setPageState] = useState({
    offset: 0,
    perPage: 20,
    currentPage: 0,
  });
  const getData = async () => {
    setLoading(true);
    const response = await fetch(
      `${baseURL}characters?offset=${pageState.offset}`
    );
    if (response.ok) {
      const { data: apiData } = await response.json();
      setData(apiData);
      setLoading(false);
    }
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * pageState.perPage;

    setPageState({
      ...pageState,
      currentPage: selectedPage,
      offset: offset,
    });
  };

  useEffect(() => {
    getData();
    //eslint-disable-next-line
  }, [pageState]);

  if (data.length === 0) {
    return <div className="loading">Fetching Data...</div>;
  }
  return (
    <SimpleReactLightbox>
      <div className="paging">
        <ReactPaginate
          previousLabel={'prev'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageState.perPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
      <SRLWrapper>
        <div className="wrapper">
          {!loading ? (
            data.results.map((e) => {
              return <CharacterCard data={e} key={e.id} />;
            })
          ) : (
            <div className="loading">Loading...</div>
          )}
        </div>
      </SRLWrapper>
    </SimpleReactLightbox>
  );
}

export default App;
