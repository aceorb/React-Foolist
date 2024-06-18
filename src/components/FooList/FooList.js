import React from 'react';

const randomIndex = (arrayLength) => (
  Math.floor(Math.random()*arrayLength)
);

const FooList = ({ fooList, createFoo, toggleCompleteFoo }) => {
  const newFoo = () => {
    const speed = ['slow', 'fast', 'very fast'];
    const colour = ['blue', 'white', 'black', 'blue'];
    const size = ['tiny', 'small', 'medium', 'large', 'jumbo'];

    const fooItem = {
      speed: speed[randomIndex(speed.length)],
      colour: colour[randomIndex(colour.length)],
      size: size[randomIndex(size.length)],
      id: Math.random().toString(36).substring(7)
    }
    console.log('creating a foo');
    createFoo(fooItem.id, fooItem.colour, fooItem.size, fooItem.speed);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
        <h1>List of foos</h1>
        {fooList.length > 0 && (
          <ul className="list-group">
            {fooList.map((item) => (
              <li key={item.id} className="list-group-item">
                {item.id} - {item.colour} - {item.speed} - {item.size}
                <button onClick={() => toggleCompleteFoo(item.id)}>Mark as complete</button>
              </li>
            ))}
          </ul>
        )}
        {!fooList.length && (
          <p>There are no foos</p>
        )}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2>New foo?</h2>
          <button onClick={newFoo}>Create foo</button>
        </div>
      </div>
    </div>
  )
}

export default FooList;