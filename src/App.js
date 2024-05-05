import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addInUserIndicators, addInUserWatchList, analyzeAllStocks, deleteItem, deleteUserIndicator, fetchData } from './sliceReducer';

import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const Select = styled.select`
  padding: 8px;
  font-size: 16px;
`;

const Option = styled.option`
  font-size: 16px;
`;
function App() {
  useEffect(() => {
    dispatch(analyzeAllStocks());

  }, []);
  const dispatch = useDispatch();
  const appData = useSelector(state => state.slice);
  const [searchValue, setSearchValue] = useState('');
  const handleSelect = (item) => {
    dispatch(addInUserWatchList({ item: item }));
  };
  const handleDelete = (index) => {
    dispatch(deleteItem(index));
  };
  const handleSelect2 = (item) => {
    dispatch(addInUserIndicators({ item: item }));
  };
  const handleDelete2 = (index) => {
    dispatch(deleteUserIndicator(index));
  };
  return (
    <div className='chase-alerts bg-red'>
      <h1 style={{fontFamily:'sans-serif'}} className='text-center mt-3'>CHASE ALERTS</h1>
      <div className="App row">
        <h4 className='mt-3'>STOCKS</h4>
        <div className="dropdown m-5 col-3">
          <b>Add to your watch list</b>
          <select className="custom-select mt-2" onChange={(e) => handleSelect(e.target.value)}>
            <option value="">Select an item</option>
            {appData.US_STOCKS.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className='col-3 m-5'>
          <b>YOUR WATCH LIST</b>
          <div className='mt-2'>
            {appData.USER_WATCHLIST.map((item, index) => (
              <div key={index} className="list-item">
                {item}
                <button className="delete-btn ml-2 bg-red" onClick={() => handleDelete(index)}>X</button>

              </div>
            ))}
          </div>

        </div>
        <div className='col-3 m-5'>
          <b>YOUR REMINDERS</b>
          <div className='mt-2'>
            {appData.REMINDERS.map((item, index) => (
              <div key={index} className="list-item">
                {item}
              </div>
            ))}
          </div>

        </div>
      </div>
      <div className="App row">
        <h4 className='mt-3'>INDICATORS</h4>
        <div className="dropdown m-5 col-3">
          <b>Add to your indicators</b>
          <select className="custom-select mt-2" onChange={(e) => handleSelect2(e.target.value)}>
            <option value="">Select an item</option>
            {appData.INDICATORS.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className='col-3 m-5'>
          <b>YOUR INDICATORS</b>
          <div className='mt-2'>
            {appData.USER_INDICATORS.map((item, index) => (
              <div key={index} className="list-item">
                {item}
                <button className="delete-btn ml-2 bg-red" onClick={() => handleDelete2(index)}>X</button>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>

  );
}

export default App;
