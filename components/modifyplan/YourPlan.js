import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";

import { plantingService, taskService } from "services";
import CurrentPlan from "./CurrentPlan";
import UserSettings from "~components/plantsettings/UserSettings";

import 'bootstrap/dist/css/bootstrap.css';
import styles from "~styles/components/modifyplan/yourplan.module.scss";

const YourPlan = (props) => {
    //... get all plantings
    const [plantings, setPlantings] = useState([]);
    const [planEditModalOpen, setPlanEditModalOpen] = useState(false);
    const [isShowActionText, setIsShowActionText] = useState(-1);

    //... get a planting
    const [plantId, setPlantId] = useState("");
    const [planting, setPlanting] = useState({});
    const openPlanEditModal = async (id, plant_id) => {
        setPlanEditModalOpen(true);
        setPlantId(plant_id);
        var _result = await plantingService.getById(id);
        setPlanting(_result.data);
    }
    const savePlanting = () => {
        getAllPlantings();
        setPlanEditModalOpen(false);
    }
    const deletePlanting = async (id) => {
        swal({
            title: "Wait!",
            text: "Are you sure you want to delete this planting?",
            icon: "warning",
            className: "custom-swal",
            buttons: [
                'Cancel',
                'Yes, I am sure!'
            ],
            dangerMode: true,
        }).then(async function (isConfirm) {
            if (isConfirm) {
                await taskService.deleteByPlantingId(id);
                await plantingService.delete(id);
                getAllPlantings();
            }
        })
    }

    useEffect(() => {
        getAllPlantings();
    }, [])

    const getAllPlantings = async () => {
        var _result = await plantingService.getAll();        
        setPlantings(_result.data);
    }

    const [planSettingsModalOpen, setPlanSettingsModalOpen] = useState(false);
    const openPlanSettingsModal = () => {
        setPlanSettingsModalOpen(true);
    }
    const closePlanSettingsModal = () => {
        setPlanSettingsModalOpen(false)
    }
    const cancelSetting = () => {
        setPlanSettingsModalOpen(false)
    }

    return (
        <>
            <div className={styles.container}>
                <h2>Your Plan</h2>

                <div className={styles.scrollContainer}>
                    {plantings.map((planting, i) => (
                        <div className={styles.planContainer} key={i} onMouseEnter={() => setIsShowActionText(i)} onMouseLeave={() => setIsShowActionText(-1)}>
                            <div className={styles.planHeader}>
                                <h3>{planting.name}</h3>
                                <h3>{planting.seeds}ct</h3>
                            </div>
                            <h4 className={styles.planSpecies}>{planting.species}</h4>
                            <div className={styles.planOptionsContainer}>
                                <h5>{planting.direct_sow ? "Start" : "Direct"}</h5>
                                <h5>{planting.harvest}</h5>
                                <h5>{planting.pinch ? "Pinch" : ""}</h5>
                                <h5>{planting.pot_on ? "Pot On" : ""}</h5>
                            </div>
                            {
                                i === isShowActionText && (
                                    <div className={styles.plantHoverText}>
                                        <button onClick={() => deletePlanting(planting._id)}>Delete</button>
                                        <button onClick={() => openPlanEditModal(planting._id, planting.plant_id)}>Edit</button>
                                    </div>
                                )
                            }
                        </div>
                    ))}
                </div>

                <div className={styles.planSettings}>
                    {
                        props.isPro && (
                            <button>Add Plan</button>
                        )
                    }
                    <h3 onClick={() => openPlanSettingsModal()}>Plan Settings</h3>
                </div>
            </div>
            <Modal toggle={() => setPlanEditModalOpen(!planEditModalOpen)} isOpen={planEditModalOpen} centered modalClassName="modifyPlanModal">
                <ModalBody>
                    <CurrentPlan type="edit" plantId={plantId} planting={planting} savePlanting={savePlanting} />
                </ModalBody>
            </Modal>
            <Modal toggle={() => setPlanSettingsModalOpen(!planSettingsModalOpen)} isOpen={planSettingsModalOpen} centered>
                <ModalBody>
                    <UserSettings closePlanSettingsModal={closePlanSettingsModal} cancelSetting={cancelSetting} />
                </ModalBody>
            </Modal>
        </>
    );
};

export default YourPlan;
