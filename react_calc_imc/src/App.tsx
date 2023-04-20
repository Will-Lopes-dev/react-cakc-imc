import { useState } from 'react'
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png';
import { GridItem } from './components/GridItem'


import { levels, calculateImc, Level } from './helpers/imc'


function App() {
  const [heightField, setHeightFiled] = useState<number>(0);
  const [weightField, setWeightFiled] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculateButton = () => {
    if(heightField && weightField) {
      setToShow(calculateImc(heightField, weightField));
    } else {
      alert("Preencha todos os campos!");
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setHeightFiled(0);
    setWeightFiled(0);
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150} />
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>
            IMC é a silga para Índice de Massa Corpórea, parâmetro adotado
            pela Organização Mundial da Saúdde para calcular o peso ideal de
            cada pessoa.
          </p>

          <input 
            type="number"
            placeholder='Digite a sua altura. ex: 1.5 (em metros)'
            value={heightField > 0? heightField: ''}
            onChange={e => setHeightFiled(parseFloat(e.target.value))} 
            disabled={toShow ? true : false}
          />

          <input 
            type="number"
            placeholder='Digite o seu peso. ex: 75.3 (em kg)'
            value={weightField > 0? weightField: ''}
            onChange={e => setWeightFiled(parseFloat(e.target.value))} 
            disabled={toShow ? true : false}
          />

          <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
        </div>

        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, key)=>(
              <GridItem key={key} item={item} />
              ))}
            </div>
          }
          {toShow &&
            <div className={styles.rightBig} onClick={handleBackButton}>
              <div className={styles.rightArrow}>
                <img src={leftArrowImage} alt="" width={25}/>
              </div>

              <GridItem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default App
