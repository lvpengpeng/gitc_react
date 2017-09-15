import React from 'react';
import ReactDOM from 'react-dom';
import ClassDetails from './ClassDetails';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ClassDetails />, div);
});
