import React, { useState } from 'react';
import Sorting from './Sorting';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AddItem, RemoveItem } from '../../cartSlice';

function Shopping({ selectedcategory, product }) {
  const dispatch = useDispatch();
  const [sorting, setSorting] = useState('');

  const filteringFunction =
    selectedcategory === 'all'
      ? product
      : product.filter((item) => item.category === selectedcategory);

  const sortingFunction = [...filteringFunction].sort((a, b) => {
    if (sorting === 'lowhigh') return a.price - b.price;
    if (sorting === 'highlow') return b.price - a.price;
    return 0;
  });

  return (
    <div>
      <Sorting setSorting={setSorting} />
      <Link to={'/cart'}>
        <button>Check Cart</button>
      </Link>
      <div className="shoppingStyle">
        {sortingFunction.map((item) => (
          <div key={item.id}>
            <img src={item.image} alt={item.title} width={100} height={120} />
            <h3>{item.title}</h3>
            <h5>${item.price}</h5>
            <h6>
              {item.rating.rate} ({item.rating.count})
            </h6>
            <div className="button-card">
              <Link to={`/productdetails/${item.id}`}>
                <button>Product Details</button>
              </Link>
              <button onClick={() => dispatch(AddItem(item))}>
                Add to Cart
              </button>
              <button onClick={() => dispatch(RemoveItem(item.id))}>
                Remove from Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shopping;
