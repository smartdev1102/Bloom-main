/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

import { plantService } from "services";
import Plant from "./Plant";

import 'bootstrap/dist/css/bootstrap.css';
import styles from "~styles/components/plantsettings/plants.module.scss";

const Plants = (props) => {
    const [origialArray, setOrigialArray] = useState([]);
    const [query, setQuery] = useState('');
    const [filteredArray, setFilteredArray] = useState([]);
    const [filteredPresets, setFilteredPresets] = useState([]);
    // Add this new state variable for original presets
    const [originalPresets, setOriginalPresets] = useState([]);

    useEffect(() => {
        getOriginalArray();
    }, [])

    const getOriginalArray = async () => {
        const response = await plantService.getAll();
        setOrigialArray(response.data)
        setFilteredArray(response.data)
        if(response.presets !== undefined){
            setFilteredPresets(response.presets)
            // Set the original presets here
            setOriginalPresets(response.presets)
        }else{
            setFilteredPresets([])
            setOriginalPresets([])
        }
    }

    useEffect(() => {
        refreshFilterdArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])

    const refreshFilterdArray = async () => {
        var _filteredArray =  origialArray.filter(
            (el) => el.name.toLowerCase().includes(query)
        )      

        if (query === '') {
            setFilteredPresets(originalPresets);
        } else {
            var _filteredPresets = originalPresets.filter(
                (el) => el.name.toLowerCase().includes(query)
            );
            setFilteredPresets(_filteredPresets);
        }

        setFilteredArray(_filteredArray)
    }

    const [modalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [isShowActionText, setIsShowActionText] = useState(-1);
    const [isShowActionPreset, setIsShowActionPreset] = useState(-1);
    const [isShowPresets, setIsShowPresets] = useState(true);
    const [id, setId] = useState("");

    const openModal = (type, id) => {
        setModalOpen(true);
        setId(id);
        if(type === "create"){
            setId(0)
            setTitle("Add New Custom Plant")
        }else{
            setId(id)
            setTitle("Edit Plant")
        }
    }
    const savePlant = () => {
        setModalOpen(false);
        getOriginalArray();
    }
    const cancelPlant = () => {
        setModalOpen(false);
    }

    //... clone and duplcate plant
    const clonePlant = async (plant) => {
        swal({
            title: "Wait!",
            text: "Are you sure you want to copy this plant?",
            className: "custom-swal",
            icon: "warning",
            buttons: [
                'Cancel',
                'Yes, I am sure!'
            ],
            dangerMode: true,
        }).then(async function (isConfirm) {
            if (isConfirm) {
                await plantService.clone(plant);
                getOriginalArray();
            }
        })
    }

    const deletePlant = async (id) => {
        swal({
            title: "Wait!",
            text: "Are you sure you want to delete this plant?",
            className: "custom-swal",
            icon: "warning",
            buttons: [
                'Cancel!',
                'Yes, I am sure!'
            ],
            dangerMode: true,
        }).then(async function (isConfirm) {
            if (isConfirm) {
                await plantService.delete(id);
                getOriginalArray();
            }
        })
    }

    return (
        <>
            <div className={styles.headerContainer}>
                <div className={styles.addCustomContainer} onClick={() => openModal("create")}>
                    <button>Add New Custom</button>
                </div>
                <div>
                    {
                        props.isPro && (
                            <button className={styles.presetsButton} onClick={() => setIsShowPresets(!isShowPresets)}>{isShowPresets ? "Hide " : "Show "} Presets</button>
                        )
                    }                    
                    <input className={styles.searchButton} placeholder={'Search'} onChange={(e) => setQuery((e.target.value).toLowerCase())} />
                </div>
            </div>
            <div className={styles.plantsContainer}>
                {filteredArray.map((plant, i) => (
                    <div className={styles.plantContainer} key={i} onMouseEnter={() => setIsShowActionText(i)} onMouseLeave={() => setIsShowActionText(-1)}>
                        <div className={styles.plantImage}>
                            {
                                plant.image && (
                                    <img src={plant.image } alt="image" />
                                )
                            }
                        </div>
                        <div className={styles.plantInfoContainer}>
                            <h3>{plant.name}</h3>
                            <h4>{plant.species}</h4>
                            <h5>{plant.description}</h5>
                        </div>
                        {
                            i === isShowActionText && (
                                <div className={styles.plantHoverText}>
                                    <button onClick={() => openModal("edit", plant._id)}>Edit</button>
                                    <button onClick={() => deletePlant(plant._id)}>Remove</button>
                                </div>
                            )
                        }
                    </div>
                ))}
                {isShowPresets && filteredPresets.map((plant, i) => (
                    <div className={styles.plantContainer} key={i} onMouseEnter={() => setIsShowActionPreset(i)} onMouseLeave={() => setIsShowActionPreset(-1)}>
                        <div className={styles.plantImage}>
                            {
                                plant.image && (
                                    <img src={plant.image } alt="image" />
                                )
                            }
                        </div>
                        <div className={styles.plantInfoContainer}>
                            <button>pro preset</button>
                            <h3>{plant.name}</h3>
                            <h4>{plant.species}</h4>
                            <h5>{plant.description}</h5>
                        </div>
                        {
                            i === isShowActionPreset && (
                                <div className={styles.plantHoverText}>
                                    <button onClick={() => clonePlant(plant)}>Duplicate And Edit</button>
                                </div>
                            )
                        }
                    </div>
                ))}
            </div>
            <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen} modalClassName="customPlantModal">
                <ModalHeader>
                    {title}
                </ModalHeader>
                <ModalBody>
                    <Plant  id={id} savePlant={savePlant} cancelPlant={cancelPlant} />
                </ModalBody>
            </Modal>
        </>
    );
};

export default Plants;
