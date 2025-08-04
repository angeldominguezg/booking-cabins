import React from 'react'
import Select from './Select'
import { useSearchParams } from 'react-router-dom';

function SortBy({options}) {

  const [searchParams, setSearchParams] = useSearchParams();
  const sortedBy = searchParams.get("sortBy") || '';


  function handleChange(e) {
    // console.log(e.target.value);
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }


  return (
    <div>
      <Select options={options} value={sortedBy} type="white" onChange={handleChange} />
    </div>
  )
}

export default SortBy