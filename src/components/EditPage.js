import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import TextInput from "./TextInput";
import { useForm } from 'react-hook-form'
import { ANIMAL_TYPES } from "./AdminCatalogPage";

const BASE_URL = "https://localhost:7039/patients"

function Edit() {
    let {id} = useParams();
    const navigate = useNavigate();

    const { handleSubmit, control, setValue, getValues, register } = useForm({
        defaultValues: {
            animalName: "",
            dateOfBirth: null,
            animalType: 0,
            diagnosis: "",
        },
        mode: "onChange"
    });

    useEffect(() => {
        fetch(`${BASE_URL}/${id}`)
            .then((res) => res.json())
            .then(
                (result) => {
                    setValue('animalName', result.animalName);
                    setValue('dateOfBirth', result.dateOfBirth);
                    setValue('animalType', ANIMAL_TYPES.filter(t => t.title === result.animalType).index);
                    setValue('diagnosis', result.diagnosis);
                },
                (error) => {
                    alert("Something went wrong");
                }
            );
    }, [])

    const editItem = (data) => {
        fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                dateOfBirth: data.dateOfBirth,
                animalName: data.animalName,
                animalType: Number(data.animalType),
                diagnosis: data.diagnosis
            })
        })
        .then((res) => res.json())
        .then(
            (result) => {
                alert("Successfuly edited.")
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
    const deleteItem = e => {
        e.preventDefault();
        fetch(`${BASE_URL}/${id}`, {
                method: 'DELETE'
            })
            .then(
                (result) => {
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

     
    return (
        <>
            <div className="edit-page">
                <div>
                    <form
                        style={{padding: "2rem 1rem"}}
                        onSubmit={handleSubmit(editItem)}
                        onReset={deleteItem}
                        action={"/"}
                    >
                        <TextInput control={control} name="animalName" label="Patient's name"/>
                        <TextInput control={control} name="dateOfBirth"  label="Date of birth"/>
                        <TextInput control={control} name="diagnosis" label="Diagnosis"/>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <select {...register("animalType")}>
                                <option value="" disabled>Select animal type</option>
                                {ANIMAL_TYPES?.map((type, index) => (
                                    <option key={index} value={type.index}>{type.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className="controls">
                            <div style={{marginTop: "50px", marginRight:"5px"}}>
                                <button type="submit" className="btn btn-success" style={{width: "300px"}}>Edit</button>
                            </div>
                            <div style={{marginTop: "50px"}}>
                                <button type="reset" className="btn btn-danger" style={{width: "300px"}}>Delete</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Edit;