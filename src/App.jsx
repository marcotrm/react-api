import axios from "axios";
import { useState, useEffect } from "react";

const initialData = {
  titolo: "",
  immagine: "",
  contenuto: "",
  tags: "",
};

function App() {
  //Stato che viene aggiornato dopo l'inserimento dei dati nel form
  const [formData, setFormData] = useState([]);
  const [users, setUsers] = useState(initialData);

  function fetchData() {
    axios
      .get("http://localhost:3000/posts")
      .then((res) => setFormData(res.data));
  }

  const handleFormData = (fieldName, value) => {
    setUsers((prev) => {
      return { ...prev, [fieldName]: value };
    });
  };

  useEffect(fetchData, []);

  const handleSubmitForm = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3000/posts", users).then((response) => {
      setFormData((prev) => [...prev, response.data]);
      setUsers(initialData);
    });
  };

  //funzione per rimuovere un "prodotto"
  function handleDelete(id) {
    axios
      .delete(`http://localhost:3000/posts/${id}`)
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
              <div>
                <strong>{item.titolo}</strong>
              </div>
              <img
                src={item.immagine}
                alt={item.titolo}
                style={{ width: "100px" }}
              />
              <div>{item.contenuto}</div>
              <p>
                #{Array.isArray(item.tags) ? item.tags.join("#") : item.tags}
              </p>
              <div className="btn-delete-container">
                <button onClick={() => handleDelete(item.id)}>🗑 Elimina</button>
              </div>
            </li>
          </div>
        ))}
      </ul>
      <hr />
      <h2>Aggiungi Prodotto</h2>
      <form onSubmit={handleSubmitForm}>
        <input
          id="titolo"
          type="text"
          placeholder="Insersci il titolo"
          value={formData.titolo}
          onChange={(event) => handleFormData("titolo", event.target.value)}
          required
        />
        <input
          id="immagine"
          type="text"
          placeholder="Insersci il url immagine"
          value={formData.immagine}
          onChange={(event) => handleFormData("immagine", event.target.value)}
          required
        />
        <input
          id="contenuto"
          type="text"
          placeholder="Insersci il contenuto"
          value={formData.contenuto}
          onChange={(event) => handleFormData("contenuto", event.target.value)}
          required
        />
        <input
          id="tags"
          type="text"
          placeholder="Insersci i tags"
          value={formData.tags}
          onChange={(event) => handleFormData("tags", event.target.value)}
          required
        />
        <button type="submit">Invia</button>
      </form>
    </div>
  );
}
export default App;
