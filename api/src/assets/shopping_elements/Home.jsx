import React from 'react';
import Filtering from './Filtering';
import Shopping from './Shopping';
import { useSelector } from 'react-redux';

function Home({ selectedcategory, setSelectedcategory, product }) {
  const currentUser = useSelector((state) => state.user.currentUser);

  console.log('HOME USER:', currentUser);
  return (
    <div className="bodysite">
      <Filtering setSelectedcategory={setSelectedcategory} />
      <Shopping selectedcategory={selectedcategory} product={product} />
    </div>
  );
}

export default Home;
