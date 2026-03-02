"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function TestClient({ initialItems }) {
    const [tests, setTests] = useState(initialItems);
    const [loading, setLoading] = useState(true);
    const [editId, setEditId] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        name: "",
        age: "",
        image: null
    });

    useEffect(() => {
        const fetchTesting = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/testing");
                setTests(res.data.data);
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchTesting()
    }, []);

    const handleChange = (e) => {
        if (e.target.type === "file") {
            setForm({
                ...form,
                image: e.target.files[0]
            })
        } else {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
        }
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
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("age", form.age);
            formData.append("image", form.image);

            let res;

            if (editId) {
                res = await axios.post(`http://localhost:3000/api/testing/update/${editId}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                setTests(prev =>
                    prev.map(
                        item =>
                            item._id === editId ?
                                res.data.data :
                                item
                    )
                )
                setEditId(null);
            } else {
                res = await axios.post(`http://localhost:3000/api/testing/add`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                setTests(prev => [...prev, res.data.data])
            }
            setForm({
                name: "",
                age: "",
                image: null
            })
        } catch (err) {
            console.error(err)
        } finally {
            setSubmitting(false)
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.post(`http://localhost:3000/api/testing/delete/${id}`, form)
            setTests(prev => prev.filter(
                item => item._id !== id
            ))
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <h2>Testing</h2>
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
                    <div>
                        <label>Image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
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
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tests.length === 0 ? (
                                <tr><td colSpan={4}>No data found</td></tr>
                            ) : (
                                tests.map((test, index) => (
                                    <tr key={test._id}>
                                        <td>{index + 1}</td>
                                        <td>{test.name}</td>
                                        <td>{test.age}</td>
                                        <td>{test.image && (
                                            <img src={test.image} alt="Test" width={50} />
                                        )}</td>
                                        <td>
                                            <button onClick={() => handleEdit(test)}>Edit</button>
                                            <button onClick={() => handleDelete(test._id)}>Delete</button></td>
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