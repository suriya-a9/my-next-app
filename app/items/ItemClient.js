"use client";

import { useState } from "react";
import axios from "axios";

export default function ItemClient({ initialItems }) {
    const [items, setItems] = useState(initialItems);
    const [itemInput, setItemInput] = useState("");
    const [editingId, setEditingId] = useState(null);

    const API = "/api/items";

    const refreshItems = async () => {
        const res = await axios.get(API);
        setItems(res.data.data);
    };

    const handleSubmit = async () => {
        if (!itemInput) return alert("Fill all fields");

        if (editingId) {
            await axios.post(`${API}/update/${editingId}`, {
                item: itemInput,
            });
            setEditingId(null);
        } else {
            await axios.post(`${API}/add`, {
                item: itemInput,
            });
        }

        setItemInput("");
        refreshItems();
    };

    const deleteItem = async (id) => {
        await axios.post(`${API}/delete/${id}`);
        refreshItems();
    };

    const editItem = (item) => {
        setItemInput(item.item || "");
        setEditingId(item._id);
    };

    return (
        <div style={{ padding: 40 }}>
            <h1>Item CRUD</h1>

            <div style={{ marginBottom: 20 }}>
                <input
                    type="text"
                    value={itemInput}
                    onChange={(e) => setItemInput(e.target.value)}
                />

                <button onClick={handleSubmit}>
                    {editingId ? "Update" : "Add"}
                </button>
            </div>

            <table border="1" cellPadding="10" cellSpacing="5">
                <tbody>
                    {items.length === 0 ? (
                        <tr>
                            <td colSpan="2">No item found</td>
                        </tr>
                    ) : (
                        items.map((item) => (
                            <tr key={item._id}>
                                <td>{item.item}</td>
                                <td>
                                    <button onClick={() => editItem(item)}>Edit</button>
                                    <button onClick={() => deleteItem(item._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}