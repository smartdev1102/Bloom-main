/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { taskService, plantingService, plantService } from "services";
import moment from "moment";

import styles from "~styles/components/masterplan/calendardetail.module.scss";

const CalendarDetail = (props) => {
    const [task, setTask] = useState({});
    const [nextTask, setNextTask] = useState({});
    const [noNextTask, setNoNextTask] = useState("");
    const [plant, setPlant] = useState({});
    
    useEffect(() => {
        getTask();
        getPlant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [duration, setDuration] = useState(0);

    const getTask = async () => {
        const _task = await taskService.getById(props.taskId);
        setTask(_task.data);

        const _tasks = await taskService.getByPlantingId(_task.data.planting_id);
        const tmpIndex = _tasks.data.findIndex(x => x._id === props.taskId);
        if(tmpIndex >= 0){
            const _nextItem = _tasks.data[tmpIndex + 1];
            if(_nextItem == undefined){
                setNoNextTask("Done for the Season!") 
            }else{
                setNextTask(_nextItem);
                setDuration(calcDuration(_nextItem.scheduled_at, _task.data.scheduled_at, _task.data.duration))
            }
        }
    }

    const calcDuration = (date1, date2, duration) => {
        return moment(date1).diff(moment(date2), 'days') - duration;
    }

    const getPlant = async () => {
        const _planting = await plantingService.getById(props.schedule.planting_id);
        var _plantId = _planting.data.plant_id;

        const _plant = await plantService.getById(_plantId);
        setPlant(_plant.data);
    }


    return (
        <div className={styles.container}>
            <div className={styles.calendarTitle}>
                <h3>{plant ? plant.name : ""}</h3>
                <h5>{plant ? plant.species : ""}</h5>
                <h5>Planting ID: {props.plantingId}</h5>
            </div>
            <div className={styles.eventContainer}>
                <div className={styles.noteContainer}>
                    <div className={styles.noteImage}>
                        {
                            plant ? plant.image && (
                                <img src={plant.image } alt="image" />
                            ) : ''
                        }
                    </div>
                    <div className={styles.noteInfo}>
                        <h5>{plant ? plant.name : ""}</h5>
                        <h6>{plant ? plant.species : ""}</h6>
                        <h6>{plant ? plant.description : ""}</h6>
                    </div>
                </div>
                <div className={styles.taskContainer}>
                    <div className={styles.detailContainer}>
                        <h3>
                            {
                                (task.title) === "Seed Indoors" ? "Seed " + plant.name + " Indoors" : 
                                (task.title) === "Direct Seed/Sow" ? "Direct Seed " + plant.name :
                                plant && plant.name ? task.title + " " + plant.name : task.title
                            }
                        </h3>
                        <h5>{task ? task.note : ""}</h5>
                    </div>
                    <div className={styles.nextContainer}>
                        <h4>Next Task:</h4>
                        {
                            Object.keys(nextTask).length > 0 ? (
                                <h5><i>{nextTask.title}</i> in {duration === 0 ? '1 day' : duration + " days"}</h5>
                            ):(
                               <h5> { noNextTask } </h5>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className={styles.buttonsContainer}>
                {
                    task.type === "complete" ? (
                        <button className={styles.active}>Completed</button>
                    ) : (
                        <button onClick={() => props.completeTask(props.taskId)}>Mark Complete</button>
                    )
                }
                
                <button onClick={props.cancelSchedule}>Cancel</button>
            </div>
        </div>
    );
};

export default CalendarDetail;
