import React, { useEffect, useState } from 'react';
import macaco from './imgs/macaco.png'
import coin from './imgs/coin.png'
import card from './imgs/card.png'
import './App.css';

function App() {

  const imgs = [macaco, coin, card]; 
  const [imagem1, setImagem1] = useState(0)
  const [imagem2, setImagem2] = useState(0)
  const [imagem3, setImagem3] = useState(0)
  const [valorImagem, setValorImagem] = useState(0);
  const [saldo, setSaldo] = useState(100);
  const [ganho, setGanho] = useState(null);
  const [multiplicador, setMultiplicador] = useState(null);
  const [valorAposta, setValorAposta] = useState(0);

  useEffect(() => {
    setImagem1(imgs[randImg()]);
    setImagem2(imgs[randImg()]);
    setImagem3(imgs[randImg()]);
  }, []);

  const randImg = () => {
    return Math.floor(Math.random() * imgs.length);
  }

  const handleAumentaAposta = () => {
    const verificaSaldo = valorAposta + 0.5;
    setValorAposta(verificaSaldo);
  }

  const handleDiminuiAposta = () => {
    const verificaSaldo = valorAposta - 0.5;
    if (valorAposta <= 0) {
      setValorAposta(0.5);
    }
    else {
      setValorAposta(verificaSaldo);
    }
  }

  const handleGirar = () => {
    setGanho(null);
    setMultiplicador(null);
      if (valorAposta > saldo) {
        alert('Saldo Insuficiente para a aposta!')
      }
      else {
        const newImagem1 = randImg();
        const newImagem2 = randImg();
        const newImagem3 = randImg();

        setImagem1(imgs[newImagem1]);
        setImagem2(imgs[newImagem2]);
        setImagem3(imgs[newImagem3]);

        setSaldo(saldo - valorAposta);

        // Verifica combinações
        if (newImagem1 === newImagem2 && newImagem2 === newImagem3) {
          if (newImagem1 === 0) {
            const lucro = valorAposta * 10;
            setSaldo(saldo + lucro);
            setGanho(lucro);
            setMultiplicador(10);
          } else if (newImagem1 === 1) {
            const lucro = valorAposta * 2;
            setSaldo(saldo + lucro);
            setGanho(lucro);
            setMultiplicador(2);
          } else if (newImagem1 === 2) {
            const lucro = valorAposta * 5;
            setSaldo(saldo + lucro);
            setGanho(lucro)
            setMultiplicador(5);
          }
        }

        console.log(newImagem1, newImagem2, newImagem3); // Verifica os índices
      }
  }

  return (
    <div className="App">
  <h1>Slot Machine</h1>
  <div className='saldo'>
    <p>Saldo: </p>
    <input type='text' readOnly value={`R$${saldo}`} className='inputSaldo'/>
    <p>Aposta: </p>
    <input type='text' readOnly value={`R$${valorAposta}`} className='inputSaldo'/>
  </div>
  <div className='box'>
    <img src={imagem1} className='imgContainer' alt="Imagem 1" />
    <img src={imagem2} className='imgContainer' alt="Imagem 2" />
    <img src={imagem3} className='imgContainer' alt="Imagem 3" />
  </div>
  <br />
  <button onClick={handleDiminuiAposta}>Diminuir Aposta</button>
  <button onClick={handleAumentaAposta}>Aumentar Aposta</button>
  <br />
  {ganho && (
    <div className='info'>
      <p className='infoP'>Ganhou: R${ganho}, multiplicador: {multiplicador}x</p>
    </div>
  )}
  <button onClick={handleGirar}>Girar a roleta</button>
</div>

  );
}

export default App;
