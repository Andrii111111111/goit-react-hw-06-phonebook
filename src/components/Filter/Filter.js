import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Label, Input, CenteredContainer } from './Filter.style';
import { setFilter } from '../../redux/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <CenteredContainer>
      <Label>
        Filter by name:
        <Input type="text" value={filter} onChange={handleFilterChange} />
      </Label>
    </CenteredContainer>
  );
};
export default Filter;
