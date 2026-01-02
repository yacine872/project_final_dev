function Sorting({ setSorting }) {
  return (
    <div className="sorting">
      <select onChange={(e) => setSorting(e.target.value)}>
        <option value="highlow">Soft from highest to lowest Price</option>
        <option value="lowhigh">Sort from lowest to highest Price</option>
      </select>
    </div>
  );
}

export default Sorting;
