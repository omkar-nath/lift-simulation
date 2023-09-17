import React, { useState } from 'react';
import Button from '../components/Button.js';
import Lift from './Lift/index.js';
import './floor.css';
const Floor = ({ floorNo, setRequests }) => {
  return (
    <div class="floor">
      <div class="buttons">
        <Button
          up={true}
          onClick={() => setRequests({ floorNo, direction: 'UP' })}
        />
        <Button
          up={false}
          onClick={() => setRequests({ floorNo, direction: 'DOWN' })}
        />
      </div>

      <div></div>
      <span class="floorno">
        <b>{floorNo}</b>
      </span>
    </div>
  );
};

export default Floor;
