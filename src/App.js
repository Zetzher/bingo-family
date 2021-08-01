import { useState } from 'react';
import logo from './logo.svg';
import Bingo from './bingo-logo.jpeg'
import './App.css';

function App() {

  const [numbers, setNumbers] = useState([]);
  const [backup, setBackup] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99]);
  const [numberChosen, setNumberChosen] = useState();


  const chooseNumber = (arrNumbers) => {
    const randomNumber = arrNumbers[Math.floor(Math.random() * arrNumbers.length - 1)];
    const copyArr = [...backup];

    copyArr.map((data, key) => data === randomNumber && copyArr.splice(key, 1));

    setNumberChosen(randomNumber);
    if (randomNumber === undefined) {
      chooseNumber(arrNumbers);
      return;
    }

    const copyNumbersArr = [...numbers, randomNumber];

    setBackup(copyArr);
    setNumbers(copyNumbersArr);
  }


  return (
    <>
      {numbers.length === 98 ?
        <>
          <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className="bingo-container"><button className="play-again" onClick={() => window.location.reload()}><h1 className="title-play-again">Jugar otra vez</h1></button><img src={Bingo} className="bingo-final" /></div>
          </div>
        </>
        :
        <>
          <div className="tablero-numeros">
            {numbers.map((data, key) => {
              return (
                <>
                  <div className="bola-bingo">
                    <div className="circle-bola-bingo">
                      <h3 className="number-bola-bingo">{data}</h3>
                    </div>
                  </div>
                </>
              )
            })}
          </div>


          <button style={{width: "100px", height: "60px", borderRadius: "20%", position: 'absolute', bottom: '20vh', left: '50vw'}} onClick={() => chooseNumber(backup)}>Sacar bola de bingo</button>
        </>
      }
    </>
  );
}

export default App;
