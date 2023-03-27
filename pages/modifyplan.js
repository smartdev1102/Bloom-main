import React, { useState, useEffect } from "react";
import { userService, planService } from "services";

import styles from "~styles/pages/modifyplan.module.scss";

import Sidebar from "~components/Sidebar";
import AvailablePlans from "~components/modifyplan/AvailablePlans";
import YourPlan from "~components/modifyplan/YourPlan";

const ModifyPlan = () => {
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
            <div className={styles.modifyContent}>
                <div className={styles.container}>
                    <h1 className={styles.header}>{plan}</h1>
                    <h2 className={styles.subHeader}>Modify Plan</h2>
                    <AvailablePlans isPro={isPro} />
                </div>
                <YourPlan />
            </div>
        </div>
    );
};

export default ModifyPlan;
