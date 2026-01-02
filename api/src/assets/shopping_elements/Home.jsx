import React from 'react';
import Filtering from './Filtering';
import Shopping from './Shopping';

function Home({ selectedcategory, setSelectedcategory, product }) {
  return (
    <div className="bodysite">
      <Filtering setSelectedcategory={setSelectedcategory} />
      <Shopping selectedcategory={selectedcategory} product={product} />
    </div>
  );
}

export default Home;
