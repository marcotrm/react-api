import { useState } from "react";

function App() {
  //Stato che viene aggiornato dopo l'inserimento dei dati nel form
  const [formData, setFormData] = useState({
    product: "",
    author: "",
    content: "",
    category: "FrontEnd",
    published: false,
  });

  //"modifica" dei dati
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();

    //verifica dei campi vuoti
    const { product, author, content, category } = formData;
    if (!product.trim() || !author.trim() || !content.trim()) {
      alert("Tutti i campi sono obbligatori!");
      return;
    }

    //reset dei campi input
    setList((current) => [...current, formData]);
    setFormData({
      product: "",
      author: "",
      content: "",
      category: "FrontEnd",
      published: false,
    });
  };

  const [list, setList] = useState([
    {
      product: "Gallette",
      author: "Mario",
      content: "Snack leggero",
      category: "UI/UX",
      published: true,
    },
    {
      product: "Pollo",
      author: "Luigi",
      content: "Proteina",
      category: "BackEnd",
      published: false,
    },
    {
      product: "Yogurt",
      author: "Anna",
      content: "Colazione",
      category: "FrontEnd",
      published: true,
    },
  ]);

  //funzione per rimuovere un "prodotto"
  const handleDelete = (index) => {
    setList((current) => current.filter((item, i) => i !== index));
  };

  return (
    <div className="container">
      <h1>Lista Spesa</h1>
      <ul>
        {list.map((item, index) => (
          <div key={index} className="list-container">
            <button onClick={() => handleDelete(index)}>🗑</button>
            <li>
              <strong>{item.product}</strong> - {item.author} ({item.category})
              <p>{item.content}</p>
              <p>{item.published ? "Pubblicato" : "Non Pubblicato"}</p>
            </li>
          </div>
        ))}
      </ul>
      <hr />
      <h2>Aggiungi Prodotto</h2>
      <form onSubmit={submit}>
        <input
          type="text"
          name="product"
          value={formData.product}
          onChange={handleChange}
          placeholder="Nome Prodotto"
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Autore"
        />
        <input
          type="text"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Descrizione"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="FrontEnd">FrontEnd</option>
          <option value="BackEnd">BackEnd</option>
          <option value="UI/UX">UI/UX</option>
        </select>
        <label>
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleChange}
          />
          Pubblicato
        </label>
        <button type="submit">Invia</button>
      </form>
    </div>
  );
}
export default App;
