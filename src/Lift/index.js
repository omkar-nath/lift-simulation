import React, { useState, useEffect, useRef } from 'react';
import './lift.css';

const Lift = ({ requests, setRequestedFloors, id }) => {
  const liftRef = useRef({});
  const [liftState, setLiftstate] = useState({
    floor: 0,
    id: id,
    isMoving: false,
    currentPassingFloor: '',
    isOpened: false,
    direction: 'UP',
  });
  const [currentRequestedFloor, setCurrentRequestedFloor] = useState({});

  const handleDoorOpening = (index, requests) => {
    setLiftstate((prevState) => {
      return { ...prevState, isMoving: false, isOpened: true };
    });

    console.log('Requests', requests);
  };

  useEffect(() => {
    const upRequests = requests.filter((req) => req.direction === 'UP');
    const downRequests = requests.filter((req) => req.direction === 'DOWN');
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      let upRequests = requests.filter((req) => {
        if (req.direction === 'UP') return req;
      });

      let downRequests = requests.filter((req) => {
        if (request.direction === 'DOWN') return req;
      });
    }, 0);
    return () => clearInterval(timer);
  }, [requests.length]);
  useEffect(() => {
    // Wait for lift to close after 4000s. Otherwise people will fall.
    if (liftState.isOpened) {
      setTimeout(() => {
        setLiftstate((prevState) => {
          return { ...prevState, isOpened: false };
        });
      }, 4000);
    }
  }, [liftState.isOpened]);

  // A function which will set the current passing floor in lift state
  // while the lift is moving either UP or DOWN
  const setCurrentPassingFloor = (times, startFloor) => {
    let i = 0;
    let current = startFloor;

    let timer = setInterval(() => {
      ++current;
      setLiftstate((prevState) => {
        return { ...prevState, currentPassingFloor: current };
      });
      if (++i === times) {
        setLiftstate((prevState) => {
          return { ...prevState, currentPassingFloor: '' };
        });
        clearInterval(timer);
      }
    }, 1000);
  };

  useEffect(() => {
    for (let i = 0; i < requests.length; i++) {
      let requestedFloor = requests[i].floor;
      let direction = requests[i].direction;
      let liftFloor = liftState.floor;
      if (!requestedFloor) return;
      if (liftState.floor === requestedFloor) return;
      // Assuming lift will take 1s to travel 1 floor.
      const secToTravel = Math.abs(liftState.floor - requestedFloor);
      liftRef.current.style.transition = `transform ${secToTravel}s`;
      // One floor height is 155px. That's why we are multiplying by 155
      let totalHeight = requestedFloor > 0 ? requestedFloor * 155 : 155;

      const liftMovingDirection =
        requestedFloor > liftState.floor ? 'UP' : 'DOWN';
      setLiftstate((prevState) => {
        return {
          ...prevState,
          floor: requestedFloor,
          isMoving: true,
          direction: liftMovingDirection,
        };
      });
      if (liftMovingDirection === 'UP') {
        const move = `translateY(${-totalHeight}px)`;
        liftRef.current.style.transform = move;
      }
      if (liftMovingDirection === 'DOWN') {
        // CONTROL the moving  otherwise lift will go to PATAL LOK

        const move = `translateY(${-totalHeight}px)`;
        liftRef.current.style.transform = move;
      }

      setCurrentPassingFloor(secToTravel, liftFloor);

      // Travel time between floors  2000 ms. That's why we are waiting for lift to reach the desired floor.
      setTimeout(() => {
        handleDoorOpening(i, requests);
      }, secToTravel * 1000);
    }
  }, [requests, liftState.floor, liftState.direction]);
  console.log('Lift state', liftState);
  return (
    <div class="lift" ref={liftRef}>
      <div
        class={`door ${liftState.isOpened ? 'door-open' : 'door-close'} `}
      ></div>
      <div
        class={`door ${liftState.isOpened ? 'door-open' : 'door-close'}`}
      ></div>
    </div>
  );
};
export default Lift;
