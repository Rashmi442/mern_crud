import { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:4000";

export default function App() {
  const [people, setPeople] = useState([]);
  const [form, setForm] = useState({ name: "", age: "" });
  const [editId, setEditId] = useState(null);

  // READ
  useEffect(() => {
    axios.get(API).then((res) => setPeople(res.data));
  }, []);

  // CREATE
  const addPerson = async () => {
    if (!form.name || !form.age) return alert("Enter name & age");

    const res = await axios.post(API, form);
    setPeople([...people, res.data]);
    setForm({ name: "", age: "" });
  };

  // UPDATE
  const updatePerson = async () => {
    const res = await axios.put(`${API}/${editId}`, form);
    setPeople(people.map((p) => (p._id === editId ? res.data : p)));
    setEditId(null);
    setForm({ name: "", age: "" });
  };

  // DELETE
  const deletePerson = async (id) => {
    await axios.delete(`${API}/${id}`);
    setPeople(people.filter((p) => p._id !== id));
  };

  return <div className="container mt-5">{/* UI unchanged */}</div>;
}
