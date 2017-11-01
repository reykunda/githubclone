import React from 'react';
import Cards from '../../components/Cards';
import Searchbox from '../../components/Searchbox';
import Notification from '../../components/Notification';

const Gitusers = () => (
  <div className="Gitusers">
    <Searchbox />
    <Notification />
    <Cards />
  </div>
);

export default Gitusers;
