import React, { useState, useEffect } from "react";
import { userService, planService } from "services";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GoogleMap from "pages/account/google-map";

import styles from "~styles/components/plantsettings/userSettings.module.scss";

const NewPlan = (props) => {
    const [plan, setPlan] = useState({
        userid: "",
        name: "",
        last_frost: new Date(),
        first_frost: new Date(),
        location: {}
    });

    const dateFormat = (date) =>{
        return moment(date).format("YYYY/MM/DD")
    }

    const getPosition = (e) => {
        plan.location = e
    }

    const saveSetting = async () => {
        swal({
            title: "Wait!",
            text: "Are you sure you want to create a new plan?",
            className: "custom-swal",
            icon: "info",
            buttons: [
                'No, cancel it!',
                'Yes, I am sure!'
            ],
            dangerMode: true,
        }).then(async function (isConfirm) {
            if (isConfirm) {
                plan.userid = userService.getId();
                var _result = await planService.create(plan);
                swal({
                    title: "Success!",
                    text: _result.message,
                    icon: "success",
                }).then(function(){
                    props.closePlanSettingsModal();
                });
            }
        })
    }

    return (
        <div className={styles.userSettingsContainer}>
            <div className={styles.userSettingsPaper}>
                <div className={styles.userSettingsOptionsContainer}>
                    <h2 className="text-center">A New Plan</h2>
                    <div className={styles.userSettingsInputRow}>
                        <small>Farm/Garden Name</small>
                        <input
                            type="text"
                            className={styles.input}
                            value={plan.name}
                            onChange={(e) => {
                                setPlan({
                                    ...plan,
                                    name: e.target.value,
                                });
                            }}
                        />
                        <small>Last Frost - Spring</small>
                        <DatePicker
                            value={dateFormat(plan.last_frost)}
                            selected={new Date(plan.last_frost)}
                            format='YYYY/MM/DD'
                            onChange={(e) => {
                                setPlan({
                                    ...plan,
                                    last_frost: moment(e).format("YYYY/MM/DD"),
                                });
                            }}
                        />
                        <small>First Frost - Fall</small>
                        <DatePicker
                            value={dateFormat(plan.first_frost)}
                            selected={new Date(plan.first_frost)}
                            format='YYYY/MM/DD'
                            onChange={(e) => {
                                setPlan({
                                    ...plan,
                                    first_frost: moment(e).format("YYYY/MM/DD"),
                                });
                            }}
                        />
                    </div>
                    <div className={styles.userSettingsInputRow}>
                        <div className={styles.mapContainer + " settingMapContainer"}>
                            <GoogleMap getPosition={getPosition} currentLocation={plan.location} />
                        </div>
                    </div>
                </div>
                <button className={styles.settingsButton} onClick = {() => { saveSetting() }}>Save Changes</button>
                <button className={styles.settingsButton} onClick = {props.cancelSetting}>Cancel</button>
            </div>
        </div>
    );
};

export default NewPlan;
