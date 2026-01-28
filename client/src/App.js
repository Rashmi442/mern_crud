import { useEffect, useState } from "react";
import axios from "axios";
const API = process.env.REACT_APP_API_URL||"http://localhost:4000";

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

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h3 className="text-center text-primary mb-4">MERN Stack CRUD</h3>

            {/* INPUTS */}
            <input
              className="form-control mb-2"
              placeholder="Enter Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="form-control mb-3"
              placeholder="Enter Age"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
            />

            {/* BUTTON */}
            <div className="d-grid mb-3">
              {editId ? (
                <button className="btn btn-warning" onClick={updatePerson}>
                  Update
                </button>
              ) : (
                <button className="btn btn-success" onClick={addPerson}>
                  Add
                </button>
              )}
            </div>

            <hr />

            {/* LIST */}
            {people.map((p) => (
              <div
                key={p._id}
                className="d-flex justify-content-between align-items-center mb-2"
              >
                <span>
                  <strong>{p.name}</strong> - {p.age}
                </span>

                <div>
                  <button
                    className="btn btn-sm btn-info me-2"
                    onClick={() => {
                      setEditId(p._id);
                      setForm({ name: p.name, age: p.age });
                    }}
                  >
                    Edit
                  </button>

                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => deletePerson(p._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
