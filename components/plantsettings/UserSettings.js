import React, { useState, useEffect } from "react";
import { userService, planService } from "services";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GoogleMap from "pages/account/google-map";

import styles from "~styles/components/plantsettings/userSettings.module.scss";

const UserSettings = (props) => {
    const [userSettings, setUserSettings] = useState({
        name: "",
        last_frost: new Date(),
        first_frost: new Date(),
        location: {}
    });

    useEffect(() => {
        getUserPlan();
    }, [])

    const getUserPlan = async () => {
        const _plan = await planService.getByUserId(userService.getId());
        if(_plan.data !== null){
            setUserSettings(_plan.data);
        }
    }

    const dateFormat = (date) =>{
        return moment(date).format("YYYY/MM/DD")
    }

    const getPosition = (e) => {
        userSettings.location = e
    }

    const saveSetting = async () => {
        swal({
            title: "Wait!",
            text: "Are you sure you want to update your plan?",
            icon: "info",
            className: "custom-swal",
            buttons: [
                'No, cancel it!',
                'Yes, I am sure!'
            ],
            dangerMode: true,
        }).then(async function (isConfirm) {
            if (isConfirm) {
                var _result = await planService.update(userService.getId(), userSettings);
                swal({
                    title: "Success!",
                    text: _result.message,
                    className: "custom-swal",
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
                    <h2 className="text-center">{userSettings && userSettings.name ? userSettings.name : "Plan Settings"}</h2>
                    <div className="col-12 text-left">
                        <small>Last Frost - Spring</small>
                    </div>
                    <div className={styles.userSettingsInputRow}>  
                        <DatePicker
                            value={dateFormat(userSettings.last_frost)}
                            selected={new Date(userSettings.last_frost)}
                            format='YYYY/MM/DD'
                            onChange={(e) => {
                                setUserSettings({
                                    ...userSettings,
                                    last_frost: moment(e).format("YYYY/MM/DD"),
                                });
                            }}
                        />
                    </div>
                    <div className="col-12 text-left">
                        <small>First Frost - Fall</small>
                    </div>
                    <div className={styles.userSettingsInputRow}>
                        <DatePicker
                            value={dateFormat(userSettings.first_frost)}
                            selected={new Date(userSettings.first_frost)}
                            format='YYYY/MM/DD'
                            onChange={(e) => {
                                setUserSettings({
                                    ...userSettings,
                                    first_frost: moment(e).format("YYYY/MM/DD"),
                                });
                            }}
                        />
                    </div>
                    <div className={styles.userSettingsInputRow}>
                        <div className={styles.mapContainer + " settingMapContainer"}>
                            <GoogleMap getPosition={getPosition} currentLocation={userSettings.location} />
                        </div>
                    </div>
                </div>
                <button className={styles.settingsButton} onClick = {() => { saveSetting() }}>Save Changes</button>
                <button className={styles.settingsButton} onClick = {props.cancelSetting}>Cancel</button>
            </div>
        </div>
    );
};

export default UserSettings;
