import React, { useState, useEffect } from "react";
import { userService, planService } from "services";

import styles from "~styles/pages/masterplan.module.scss";

import Sidebar from "~components/Sidebar";
import Calendar from "~components/masterplan/Calendar";
import List from "~components/masterplan/List";
import ByPlant from "~components/masterplan/ByPlant";

const MasterPlan = () => {
    const [activeTab, setActiveTab] = useState("calendar");
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
                <h2 className={styles.subHeader}>Master Plan</h2>

                <div className={styles.tabsContainer}>
                    <div
                        onClick={() => setActiveTab("calendar")}
                        className={`${styles.tab} ${activeTab === "calendar" ? styles.active : null}`}
                    >
                        <h2>Calendar</h2>
                    </div>
                    <div
                        onClick={() => setActiveTab("list")}
                        className={`${styles.tab} ${activeTab === "list" ? styles.active : null}`}
                    >
                        <h2>List</h2>
                    </div>
                    <div
                        onClick={() => setActiveTab("plant")}
                        className={`${styles.tab} ${activeTab === "plant" ? styles.active : null}`}
                    >
                        <h2>By Planting</h2>
                    </div>
                </div>

                <div className={styles.contentContainer}>
                    {activeTab === "calendar" && <Calendar />}
                    {activeTab === "list" && <List />}
                    {activeTab === "plant" && <ByPlant />}
                </div>
            </div>
        </div>
    );
};

export default MasterPlan;
