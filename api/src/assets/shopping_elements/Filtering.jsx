import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function Filtering({ setSelectedcategory }) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const axiosDataCate = async () => {
      try {
        const res = await axios.get(
          'https://fakestoreapi.com/products/categories'
        );
        setCategories(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    axiosDataCate();
  }, []);

  const filteringOption = (clicked_option) => {
    setSelectedcategory(clicked_option);
  };

  return (
    <div className="button-handle">
      <button onClick={() => filteringOption('all')}>All</button>
      {categories.map((category) => (
        <button onClick={() => filteringOption(category)} key={category}>
          {category}
        </button>
      ))}
    </div>
  );
}

export default Filtering;
