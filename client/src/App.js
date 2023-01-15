import './App.css';
import io from "socket.io-client"
import {useState, useEffect} from 'react'
import e from 'cors';

const socket = io('http://localhost:4000/')

function App() {

const [mensaje , setMensaje] = useState('')
const [mensajes, setMensajes] = useState([])


const handelSubmit = (e) => {
  e.preventDefault()
  socket.emit('mensaje', mensaje)
  const nuevoMensaje = {
    body:mensaje,
    from:"tu",
  }
  setMensajes([ nuevoMensaje, ...mensajes])
  setMensaje('')
}

useEffect(() => {
  const recibirMensaje = mensaje => {
    setMensajes([mensaje, ...mensajes])
  }
  socket.on('mensaje', recibirMensaje )

  return () => {
    socket.off('mensaje', recibirMensaje )
  }

}, [mensajes])

  return (
    <div className="App">
      <form onSubmit={handelSubmit}>
     <input type="text" onChange={e => setMensaje(e.target.value)}
     value={mensaje}/>
     <button>Send</button>
     </form>
     {mensajes.map((mensaje, index) =>(
      <div key={index}>
        <p>{mensaje.from}: {mensaje.body}</p>
      </div>
     ))}
    </div>
  );
}

export default App;
