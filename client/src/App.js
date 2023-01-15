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
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      <form onSubmit={handelSubmit} className="bg-zinc-900 p-10">
      <h1 className="text-3xl font-bold text-center">Chat de prueba</h1>
     <input type="text" onChange={e => setMensaje(e.target.value)}
     value={mensaje}
     className="border-2 border-zinc-500 p-2 text-black w-full"/>
     <ul className='h-80 overflow-y-auto'>
     {mensajes.map((mensaje, index) =>(
      <li key={index} className={`my-2 p-2 table text-sm rounded-md ${mensaje.from === "tu" ? "bg-sky-700 ml-auto": "bg-black"}`}>
        <p>{mensaje.from}: {mensaje.body}</p>
      </li>
     ))}
     </ul>
     </form>
    </div>
  );
}

export default App;
