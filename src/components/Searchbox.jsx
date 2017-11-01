import React from 'react';
import { connect } from 'react-redux';
import { Input, Button } from 'semantic-ui-react';
import { searchboxChange, takeSearchInput } from '../actions';

const mapStateToProps = state => ({
  searchboxValue: state.searchboxValue,
  errors: state.errors,
});

const mapDispatchToProps = dispatch => ({
  searchboxChange: value => dispatch(searchboxChange(value)),
  takeSearchInput: searchValue => dispatch(takeSearchInput(searchValue)),
});

const Searchbox = props => (
  <Input
    placeholder="Gituser..."
    value={props.searchboxValue}
    onChange={e => props.searchboxChange(e.target.value)}
    action={
      <Button
        content="Search"
        onClick={() => props.takeSearchInput(props.searchboxValue)}
      />
    }
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(Searchbox);
