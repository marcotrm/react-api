import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  //Stato che viene aggiornato dopo l'inserimento dei dati nel form
  const [formData, setFormData] = useState([]);

  function fetchData() {
    axios
      .get("http://localhost:3000/posts")
      .then((res) => setFormData(res.data));
  }

  useEffect(fetchData, []);

  //funzione per rimuovere un "prodotto"
  function handleDelete(id) {
    axios
      .delete(`http://localhost:3000/posts${id}`)
      .then(() =>
        setFormData((current) => current.filter((item) => item.id !== id))
      );
  }

  return (
    <div className="container">
      <h1>Lista Spesa</h1>
      <ul>
        {formData.map((item, index) => (
          <div key={index} className="list-container">
            <li>
              <strong>{item.titolo}</strong> - {item.immagine} {item.contenuto}
              <p>{item.tags}</p>
              <div className="btn-delete-container">
                <button onClick={() => handleDelete(item.id)}>🗑 Elimina</button>
              </div>
            </li>
          </div>
        ))}
      </ul>
      <hr />
      <h2>Aggiungi Prodotto</h2>
      <form>
        <input
          type="text"
          name="product"
          value={formData.product}
          placeholder="Nome Prodotto"
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          placeholder="Autore"
        />
        <input
          type="text"
          name="content"
          value={formData.content}
          placeholder="Descrizione"
        />
        <select name="category" value={formData.category}>
          <option value="FrontEnd">FrontEnd</option>
          <option value="BackEnd">BackEnd</option>
          <option value="UI/UX">UI/UX</option>
        </select>
        <label>
          <input type="checkbox" name="published" />
          Pubblicato
        </label>
        <button type="submit">Invia</button>
      </form>
    </div>
  );
}
export default App;
