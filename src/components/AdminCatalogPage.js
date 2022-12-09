import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Modal from "react-bootstrap/Modal"
import ListCard from "./ListCard"
import TextInput from "./TextInput"
import { useForm } from 'react-hook-form'

const headerStyle = {
    display: 'flex',
    backgroundColor: '#D3D3D3',
    border: '1px solid black'
}

export const ANIMAL_TYPES = [
    {
        index: 0,
        title: 'Cat',
    },
    {
        index: 1,
        title: 'Dog',
    },
    {
        index: 2,
        title: 'Lizard',
    },
    {
        index: 3,
        title: 'Fish',
    },
    {
        index: 4,
        title: 'Turtle',
    },
]

const BASE_URL = "https://localhost:7039/patients"

function AdminCatalogPage() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [items, setItems] = useState([]);
    const [isUpdating, update] = useState(false);

    const { handleSubmit, control, register } = useForm({
        defaultValues: {
            animalName: "",
            ownerName: "",
            dateOfBirth: null,
            animalType: 0,
            diagnosis: "",
            futureVisit: null,
        },
        mode: "onChange"
    });

    const handleShow = () => setShow(true);

    const EditItem = (e, itemid) => {
        e.preventDefault();
        navigate("/edit/"+ itemid.toString())
    }

    const AddImage = (data) => {
        handleClose();
        fetch(`${BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                dateOfBirth: data.dateOfBirth,
                ownerName: data.ownerName,
                animalName: data.animalName,
                animalType: Number(data.animalType),
                diagnosis: data.diagnosis,
                futureVisit: data.futureVisit,

            })
        })
        .then((res) => res.json())
        .then(
            (result) => {
                alert("Successfuly added.")
                navigate("/");
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                alert("Something went wrong");
            }
        );
    }

   useEffect(() => {
        fetch(`${BASE_URL}`)
            .then((res) => res.json())
            .then(
                (result) => {
                    setItems(result);
                    update(false);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    alert("Something went wrong");
                }
            );
    }, [isUpdating]);

    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add new dress</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <TextInput control={control} name="animalName" label="Patient's name"/>
                    <TextInput control={control} name="ownerName" label="Owner's name"/>
                    <TextInput control={control} name="dateOfBirth"  label="Date of birth"/>
                    <TextInput control={control} name="diagnosis" label="Diagnosis"/>
                    <TextInput control={control} name="futureVisit"  label="Appointment"/>
                    <div style={{display: 'flex', gap: '10px'}}>
                        <select {...register("animalType")}>
                            <option value="" disabled>Select animal type</option>
                            {ANIMAL_TYPES?.map((type, index) => (
                                <option key={index} value={type.index}>{type.title}</option>
                            ))}
                        </select>
                    </div>
                </form>
                </Modal.Body>
                <Modal.Footer>
                    <button 
                        className="btn btn-danger"
                        onClick={handleClose}
                    >
                        Close
                    </button>
                    <button
                        className="btn btn-success"
                        onClick={handleSubmit(AddImage)}
                    >
                        Add
                    </button>
                </Modal.Footer>
            </Modal>
            <div className="page">
                <div className="main-container">
                    <button
                        className="btn btn-dark"
                        onClick={handleShow}
                    >
                        Add item
                    </button>
                    <div className="catalog">
                        <div style={headerStyle}>
                            <span className="header-section">Patient's name</span>
                            <span className="header-section">Breed</span>
                            <span className="header-section">Owner's name</span>
                            <span className="header-section">Date of birth</span>
                            <span className="header-section">Diagnosis</span>
                            <span className="header-section">Future Visit</span>
                        </div>
                        {items.map((item) => (
                            <ListCard patient={item} onClick={e => EditItem(e, item.id)}/>
                        ))}
                    </div>
                    {items.length === 0 && <h4 className="catalog">No items</h4>}
                </div>
            </div>
        </>
    )
}

export default AdminCatalogPage;