import React from 'react';
import Header from "./components/Header";
import TableFans from "./components/TableFans"



function App() {
  return (
    <div>
      <Header/>
      <div className="container">
        <TableFans/>
      </div>
    </div>
  );
}

export default App;
