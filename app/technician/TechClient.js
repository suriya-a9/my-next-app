"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function TechClient({ initialItems }) {
    const [technicians, setTechnicians] = useState(initialItems);
    const [loading, setLoading] = useState(true);
    const [editId, setEditId] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        name: "",
        age: ""
    });

    useEffect(() => {
        const fetchTechnicians = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/technician");
                setTechnicians(res.data.data);
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchTechnicians()
    }, []);

    const handleChange = async (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleEdit = (item) => {
        setForm({
            name: item.name,
            age: item.age
        })
        setEditId(item._id)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true)
        try {
            if (editId) {
                const res = await axios.post(`http://localhost:3000/api/technician/update/${editId}`, form);
                setTechnicians(prev =>
                    prev.map(
                        item =>
                            item._id === editId ?
                                res.data.data :
                                item
                    )
                )
                setEditId(null);
            } else {
                const res = await axios.post(`http://localhost:3000/api/technician/add`, form);
                setTechnicians(prev => [...prev, res.data.data])
            }
            setForm({
                name: "",
                age: ""
            })
        } catch (err) {
            console.error(err)
        } finally {
            setSubmitting(false)
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.post(`http://localhost:3000/api/technician/delete/${id}`, form)
            setTechnicians(prev => prev.filter(
                item => item._id !== id
            ))
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <h2>Technicians</h2>
            <>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Name"
                        />
                    </div>
                    <div>
                        <label>Age</label>
                        <input
                            type="Number"
                            name="age"
                            value={form.age}
                            onChange={handleChange}
                            placeholder="Age"
                        />
                    </div>
                    <button type="submit" disabled={submitting}>{submitting ? "Submmiting" : editId ? "update" : "submit"}</button>
                </form>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>S/no</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {technicians.length === 0 ? (
                                <tr><td colSpan={4}>No data found</td></tr>
                            ) : (
                                technicians.map((technician, index) => (
                                    <tr key={technician._id}>
                                        <td>{index + 1}</td>
                                        <td>{technician.name}</td>
                                        <td>{technician.age}</td>
                                        <td>
                                            <button onClick={() => handleEdit(technician)}>Edit</button>
                                            <button onClick={() => handleDelete(technician._id)}>Delete</button></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </>
        </div>
    )
}