/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";

import { Modal, ModalBody } from "reactstrap";
import { plantingService, planService, userService } from "services";

import 'bootstrap/dist/css/bootstrap.css';
import styles from "~styles/components/masterplan/byplant.module.scss";

import ByPlantDetail from "./ByPlantDetail";

const ByPlant = () => {
    const [plantingEditModalOpen, setPlantingEditModalOpen] = useState(false);
    const [plantings, setPlantings] = useState([]);
    const [plantId, setPlantId] = useState("");
    const [plantingId, setPlantingId] = useState("");
    const [plan, setPlan] = useState("");
    
    const openPlanEditModal = async (id, plant_id) => {
        setPlantingEditModalOpen(true);
        setPlantId(plant_id);
        setPlantingId(id);
    }
    const savePlanting = () => {
        getAllPlantings();
        setPlantingEditModalOpen(false);
    }

    const [origialArray, setOrigialArray] = useState([]);
    const [query, setQuery] = useState('');
    const [filteredArray, setFilteredArray] = useState([]);

    useEffect(() => {
        getAllPlantings();
        getUserPlan();
    }, [])

    const getAllPlantings = async () => {
        var _result = await plantingService.getAll();
        setPlantings(_result.data);
        setOrigialArray(_result.data)
        setFilteredArray(_result.data)
    }

    const getUserPlan = async () => {
        const _plan = await planService.getByUserId(userService.getId());
            if(_plan.data !== null){
                setPlan(_plan.data.name);
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

        setFilteredArray(_filteredArray)
    }
   
    const close = () => {
        setPlantingEditModalOpen(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <h2>{plan} Plantings</h2>
                <input className={styles.searchButton} placeholder={'Search'} onChange={(e) => setQuery((e.target.value).toLowerCase())} />
            </div>
            <div className={styles.plantsContainer}>
                {filteredArray.map((planting, i) => (
                    <div className={styles.plantContainer} key={i}>
                        <div className={styles.plantImage}>
                            {
                                planting.image && (
                                    <img src={planting.image } alt="image" />
                                )
                            }
                        </div>
                        <div className={styles.plantInfoContainer}>
                            <div className={styles.plantInfoHeaderContainer}>
                                <div className={styles.plantInfoHeader}>
                                    <div>
                                        <h3>{planting.name}</h3>
                                        <h5>{planting.species}</h5>
                                    </div>
                                    <h4>{planting.seeds}ct</h4>
                                </div>
                                <div className={styles.plantOptionsContainer}>
                                    <h5>{planting.direct_sow ? "Start" : "Direct"}</h5>
                                    <h5>{planting.harvest}</h5>
                                    <h5>{planting.pinch ? "Pinch" : ""}</h5>
                                    <h5>{planting.pot_on ? "Pot On" : ""}</h5>
                                </div>
                            </div>
                            <div className={styles.plantInfoFooterContainer}>
                                <button onClick={() => {openPlanEditModal(planting._id, planting.plant_id)}}>View & Edit</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Modal toggle={() => setPlantingEditModalOpen(!plantingEditModalOpen)} isOpen={plantingEditModalOpen} centered modalClassName="modifyPlanModal">
                <ModalBody>
                    <ByPlantDetail plantId={plantId} plantingId={plantingId} savePlanting={savePlanting} close={close} />
                </ModalBody>
            </Modal>
        </div>
    );
};

export default ByPlant;
