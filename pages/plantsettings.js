import React, { useState, useEffect } from "react";
import { userService, planService } from "services";

import styles from "~styles/pages/plantsettings.module.scss";

import Sidebar from "~components/Sidebar";
import Plants from "~components/plantsettings/Plants";

const PlantSettings = () => {
    const [plan, setPlan] = useState("");
    const [isPro, setIsPro] = useState(false);

    useEffect(() => {
        getUserPlan();
    }, [])

    const getUserPlan = async () => {
        const _plan = await planService.getByUserId(userService.getId());
        if(_plan.data !== null){
            setPlan(_plan.data.name);
        }
        const _user = await userService.getById(userService.getId());
        if(_user.data.share_custom_varieties){
            setIsPro(true);
        }
    }
    return (
        <div className={styles.screen}>
            <Sidebar plan={plan} isPro={isPro} />
            <div className={styles.container}>
                <h1 className={styles.header}>{plan}</h1>
                <h2 className={styles.subHeader}>Plant Settings</h2>
                <Plants isPro={isPro} />
            </div>
        </div>
    );
};

export default PlantSettings;