import React, { useState } from 'react';
import './style.css';
import Lift from './Lift/index.js';
import Floor from './Floor';

export default function App() {
  const [requests, setRequestedFloors] = useState([]);

  const setRequests = ({ floorNo, direction }) => {
    setRequestedFloors((prevState) => {
      const newFloorRequest = {
        floor: floorNo,
        direction,
        processed: false,
      };

      return [...prevState, newFloorRequest];
    });
  };
  return (
    <div>
      <h1>Lift Simulation</h1>

      {[...Array(10)].map((arr, index) => {
        if (index === 9) {
          return (
            <>
              <Lift
                id="lift-1"
                requests={requests}
                setRequestedFloors={setRequestedFloors}
              />
              <Floor
                key={`id-${index}`}
                floorNo={10 - index - 1}
                setRequests={setRequests}
              />
            </>
          );
        } else
          return <Floor floorNo={10 - index - 1} setRequests={setRequests} />;
      })}
      <span> Requested floor , {JSON.stringify(requests)}</span>
    </div>
  );
}
