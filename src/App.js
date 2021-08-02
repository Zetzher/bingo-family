import { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import Bingo from './bingo-logo.jpeg'
import BolasBingo from './sonido_bolas_bingo.mp3';
import './App.css';

function App() {

  const [numbers, setNumbers] = useState([]);
  const [lastNumbers, setLastNumbers] = useState([]);
  const [backup, setBackup] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99]);
  const [numberChosen, setNumberChosen] = useState();
  const [beginning, setBeginning] = useState(false);
  const [styleChanged, setStyleChanged] = useState("intro-animation")
  const [sound, setSound] = useState(false);


  const chooseNumber = (arrNumbers) => {
    setSound(true);
    setTimeout(function () { setSound(false); }, 4000);

    setTimeout(function () {
      const randomNumber = arrNumbers[Math.floor(Math.random() * arrNumbers.length - 1)];
      beginning === false && setBeginning(true);
      const copyArr = [...backup];

      copyArr.map((data, key) => data === randomNumber && copyArr.splice(key, 1));

      setNumberChosen(randomNumber);
      if (randomNumber === undefined) {
        chooseNumber(arrNumbers);
        return;
      }

      const copyNumbersArr = [...numbers, randomNumber];

      const lastFourNumbers = [...lastNumbers];

      if (lastFourNumbers.length === 4) {
        lastFourNumbers.shift();
        lastFourNumbers.push(randomNumber);
      } else {
        lastFourNumbers.push(randomNumber);
      }

      setLastNumbers(lastFourNumbers);


      setBackup(copyArr);
      setNumbers(copyNumbersArr);

      if (copyNumbersArr.length % 10 === 0) {
        copyNumbersArr.sort((a, b) => {
          if (a > b) {
            return 1;
          }
          if (a < b) {
            return -1;
          }
          return 0;
        })
      };
    }, 3500)


  }

  const introAnimation = () => {
    const changingStyle = (style) => {
      setTimeout(function () { setStyleChanged(style); }, 3000);
    }

    if (beginning) {
      changingStyle('finish-intro');
      return <div className={styleChanged}><h1 className="title-animation">Empezamos!</h1></div>
    }
  }


  return (
    <section className="base-background">
      {numbers.length === 98 ?
        <>
          <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="bingo-container"><button className="play-again" onClick={() => window.location.reload()}><h1 className="title-play-again">Jugar otra vez</h1></button><img src={Bingo} className="bingo-final" /></div>
          </div>
        </>
        :
        <>
          {introAnimation()}
          <div className="tablero-numeros">
            {numbers.map((data, key) => {
              return (
                <>
                  <div className="bola-bingo">

                    <div className="circle-bola-bingo">
                      {beginning ? <h3 className="number-bola-bingo">{data}</h3> : <h3 style={{ color: 'white' }}>{null}</h3>}
                    </div>

                  </div>
                </>
              )
            })}
          </div>

          <section style={{ display: 'flex', justifyContent: 'space-between', marginTop: '100px' }}>
            <div style={{ position: 'relative', top: 50, left: 100 }}>
              <h4 className="last-value">Bola Elegida</h4>
              <div className="bola-bingo">
                <div className="circle-bola-bingo">
                  <h3 className="number-bola-bingo">{numberChosen}</h3>
                </div>
              </div>
            </div>
            <button style={{ borderWidth: '3px', borderColor: '#DEDEDE', backgroundColor: '#f5b957', width: "100px", height: "80px", borderRadius: "100%", position: 'absolute', bottom: '20vh', left: '50vw' }} onClick={() => chooseNumber(backup)}><h3 className="title-button">{beginning ? 'Sacar bola de bingo' : 'Empezar'}</h3></button>
            <div style={{ position: 'absolute', right: 10, marginTop: 50 }}>
              <h4 className="last-value">Últimas cuatro bolas</h4>
            </div>
            <div style={{ width: '400px', height: '150px', backgroundColor: 'white', borderRadius: '20%', position: 'relative', right: '50px', top: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>


              {lastNumbers.map(data => {
                return (
                  <>
                    <div className="bola-bingo-last">

                      <div className="circle-bola-bingo">
                        {beginning ? <h3 className="number-bola-bingo">{data}</h3> : <h3 style={{ color: 'white' }}>{null}</h3>}
                      </div>

                    </div>
                  </>
                )
              })}


            </div>
          </section>
        </>
      }
      {sound && <ReactAudioPlayer
        src={BolasBingo}
        autoPlay
      />}
      {console.log(sound)}
    </section>
  );
}

export default App;
