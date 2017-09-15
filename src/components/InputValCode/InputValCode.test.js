import React from 'react';
import ReactDOM from 'react-dom';
import InputValCode from './InputValCode';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<InputValCode />, div);
});
