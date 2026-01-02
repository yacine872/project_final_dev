import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AddItem, RemoveItem } from '../../cartSlice';

function Productdetails({ product }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const productID = Number(id);
  const prod = product.find((p) => p.id === productID);
  return (
    <div className="bodysite">
      <div key={id} className="product-details">
        <img src={prod.image} alt={prod.title} width={150} height={170} />
        <h3>{prod.title}</h3>
        <h5>${prod.price}</h5>
        <p>{prod.description}</p>
        <h6>
          {prod.rating.rate} ({prod.rating.count})
        </h6>

        <button onClick={() => dispatch(AddItem(prod))}>Add to Cart</button>
        <button onClick={() => dispatch(RemoveItem(prod))}>
          Remove from Cart
        </button>
      </div>
    </div>
  );
}

export default Productdetails;
