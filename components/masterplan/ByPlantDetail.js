/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { plantService, taskService, userService } from "services";

import styles from "~styles/components/masterplan/byplantdetail.module.scss";

const ByPlantDetail = (props) => {
    const [taskArr, setTaskArr] = useState([]);

    useEffect(() => {
        getPlantAndTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [plant, setPlant] = useState({});

    const getPlantAndTasks = async () => {
        var _plant = await plantService.getById(props.plantId);
        setPlant(_plant.data);
        var _tasks = await taskService.getByPlantingId(props.plantingId);
        var _taskArr = [];
        _tasks.data.forEach(element => {
            var _taskObj = {
                userid: userService.getId(),
                planting_id: props.plantingId,
                id: element._id,
                title: element.title,
                scheduled_at: element.scheduled_at,
                duration: parseInt(element.duration),
                note: element.note,
                type: element.type,
                rescheduled_at: element.rescheduled_at,
                completed_at: element.completed_at
            }
            _taskArr.push(_taskObj)
        });
        setTaskArr(_taskArr)
    }

    const dateFormat = (date) => {
        return moment(date).format("YYYY/MM/DD")
    }

    const [customTask, setCustomTask] = useState({
        planting_id: props.plantingId,
        userid: "",
        title: "",
        scheduled_at: moment().format('YYYY/MM/DD'),
        duration: "",
        note: "",
        type: "incomplete",
        rescheduled_at: "",
        completed_at: ""
    });


    const addCustomTask = () => {
        if (customTask.title === "" || customTask.scheduled_at === "" || customTask.duration === "" || customTask.note === "") {
            swal({
                title: "Oops!",
                text: "Please fill all fields",
                className: "custom-swal",
            });
        } else {
            setCustomTask(
                ...taskArr, {
                    planting_id: props.plantingId,
                    userid: userService.getId(),
                    title: "",
                    scheduled_at: moment().format('YYYY/MM/DD'),
                    duration: 0,
                    note: "",
                    type: "incomplete",
                    rescheduled_at: "",
                    completed_at: ""
                }
            )
            setTaskArr(taskArr => [...taskArr, customTask])
        }
    }

    const save = async () => {
        swal({
            title: "Wait!",
            text: "Are you sure you want to update?",
            icon: "info",
            className: "custom-swal",
            buttons: [
                'Cancel',
                'Yes, I am sure!'
            ],
            dangerMode: true,
        }).then(async function (isConfirm) {
            if (isConfirm) {
                var _result = await taskService.update(props.plantingId, taskArr);
                swal({
                    title: "Success!",
                    text: _result.message,
                    icon: "success",
                    className: "custom-swal",
                }).then(function(){
                    props.close();
                });
            }
        })
    }

    const deleteTask = async (id) => {
        swal({
            title: "Wait!",
            text: "Are you sure you want to delete this task?",
            icon: "warning",
            className: "custom-swal",
            buttons: [
                'Cancel',
                'Yes, I am sure!'
            ],
            dangerMode: true,
        }).then(async function (isConfirm) {
            if (isConfirm) {
                var _result = await taskService.delete(id);
                swal({
                    title: "Success!",
                    text: _result.message,
                    icon: "success",
                    className: "custom-swal",
                }).then(function(){
                    props.close();
                });
            }
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.plantTitle}>
                <h3>{plant.species}</h3>
                <h5>Planting ID #{props.plantingId}</h5>
            </div>
            <div className={styles.plantInfoContainer}>
                <div className={styles.detailContainer}>
                    <div className={styles.detailImage}>
                        {
                            plant.image && (
                                <img src={plant.image} alt="image" />
                            )
                        }
                    </div>
                    <div className={styles.detailInfo}>
                        <h3>{plant.name}</h3>
                        <h5>{plant.species}</h5>
                        <h6>{plant.description}</h6>
                    </div>
                </div>
                <div className={styles.taskContainer}>
                    <h3>Add Custom Task</h3>
                    <input
                        type="text"
                        placeholder="Title"
                        value={customTask.title}
                        onChange={(e) => {
                            setCustomTask({
                                ...customTask,
                                title: e.target.value,
                            });
                        }}
                    />
                    <DatePicker
                        placeholderText="Date"
                        value={dateFormat(customTask.scheduled_at)}
                        selected={new Date(customTask.scheduled_at)}
                        onChange={(e) => {
                            setCustomTask({
                                ...customTask,
                                scheduled_at: moment(e).format("YYYY/MM/DD"),
                            });
                        }}
                    />
                    <input
                        type="number"
                        placeholder="Duration"
                        value={customTask.duration}
                        onChange={(e) => {
                            setCustomTask({
                                ...customTask,
                                duration: parseInt(e.target.value),
                            });
                        }}
                    />
                    <textarea
                        placeholder="Note"
                        value={customTask.note}
                        rows="3"
                        onChange={(e) => {
                            setCustomTask({
                                ...customTask,
                                note: e.target.value,
                            });
                        }}
                    />
                    <button className={styles.add} onClick={() => addCustomTask()}>Add</button>
                </div>
            </div>
            <div className={styles.plantOptionsContainer}>
                {taskArr.map((task, i) => (
                    <div className={styles.plantOptionRow} key={i}>
                        <div className={styles.plantOptionsHeader}>
                            <div className={styles.plantOptionName}>
                                <h3>{task.title}</h3>
                                <div>
                                    <input
                                        type="number"
                                        placeholder=""
                                        value={parseInt(task.duration)}
                                        onChange={(e) => {
                                            let _taskArr = [...taskArr];
                                            _taskArr[i].duration = parseInt(e.target.value);
                                            setTaskArr(_taskArr);
                                        }}
                                    /> days
                                </div>
                            </div>
                            <DatePicker
                                placeholderText="Date"
                                className={styles.datebutton}
                                value={moment(task.scheduled_at).format("MMMM DD, YYYY")}
                                selected={new Date(task.scheduled_at)}
                                onChange={(e) => {
                                    let _taskArr = [...taskArr];
                                    _taskArr[i].scheduled_at = moment(e).format("YYYY/MM/DD");
                                    setTaskArr(_taskArr);
                                }}
                            />
                        </div>
                        <div className={styles.plantOptionsFooter}>
                            <select
                                value={task.type}
                                onChange={(e) => {
                                    let _taskArr = [...taskArr];
                                    _taskArr[i].type = e.target.value;
                                    setTaskArr(_taskArr);
                                }}
                            >
                                <option value="complete">Complete</option>
                                <option value="incomplete">Not Complete</option>
                            </select>
                            <div className={styles.buttons}>
                                {/* <button>Duplicate</button>  */}
                                <button onClick={() => deleteTask(task.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.buttonsContainer}>
                <button onClick={() => save()}>Save</button>
                <button onClick={props.close}>Cancel</button>
            </div>
        </div>
    );
};

export default ByPlantDetail;
