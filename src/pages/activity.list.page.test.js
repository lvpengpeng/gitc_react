import React from 'react';
import ReactDOM from 'react-dom';
import ActivityList from './activity.list.page';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ActivityList/>, div);
});
