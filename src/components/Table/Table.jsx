import React from 'react';
import "./table.css";
import Spinner from '../Spinner/Spinner';

const Table = ({results,loading}) => {
    if(loading){
        return<Spinner/>
    }
    if(results.length === 0){
        return <div className="no-results-container">
            <div className='no-results'>
            No result found
            </div>
            </div>;
    }
   
  return (
    <table className="results-table">
    <thead>
        <tr>
            <th>#</th>
            <th>Place Name</th>
            <th>Country</th>
        </tr>
    </thead>
    <tbody>
        {results.map((result,index)=>{
            
            return(
                <tr key={result.id}>
                <td>{index +1}</td>
                <td>{result.name}</td>
                <td>
                <img src={`https://flagsapi.com/${result.countryCode}/shiny/32.png`} alt={result.country} />
                {result.country}
                </td>
            </tr>
            )
           
        })}
    </tbody>
   </table>
  )
}

export default Table