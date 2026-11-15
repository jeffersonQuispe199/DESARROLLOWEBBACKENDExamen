import React, { useState, useEffect } from 'react';
import PuntoCard from './components/PuntoCard';
import './App.css';

function App() {
  const [puntos, setPuntos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    sector: '',
    material: '',
    capacidad: ''
  });

  const API_URL = 'http://localhost:8080/api/puntos';

  const obtenerPuntos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPuntos(data);
    } catch (error) {
      console.error('Error al obtener puntos:', error);
    }
  };

  useEffect(() => {
    obtenerPuntos();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          capacidad: parseInt(formData.capacidad)
        })
      });

      if (response.ok) {
        const nuevoPunto = await response.json();
        setPuntos([...puntos, nuevoPunto]);
        setFormData({ nombre: '', sector: '', material: '', capacidad: '' });
      }
    } catch (error) {
      console.error('Error al guardar el punto:', error);
    }
  };

  return (
    <div className="container">
      <h1>Sistema de Puntos de Reciclaje Urbano</h1>

      <form onSubmit={handleSubmit} className="form">
        <h2>Registrar Nuevo Punto</h2>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del punto"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="sector"
          placeholder="Sector o barrio"
          value={formData.sector}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="material"
          placeholder="Material que recibe"
          value={formData.material}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="capacidad"
          placeholder="Capacidad (unidades)"
          value={formData.capacidad}
          onChange={handleChange}
          required
        />
        <button type="submit">Guardar Punto</button>
      </form>

      <h2>Puntos Registrados</h2>
      <div className="grid-container">
        {puntos.map((punto) => (
          <PuntoCard key={punto.id} punto={punto} />
        ))}
      </div>
    </div>
  );
}

export default App;