/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { userService } from "services";

import styles from "~styles/pages/account/success.module.scss";

const Success = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        profile_path: "",
        email_newsletter: false,
        share_custom_varieties: false
    });

    const router = useRouter()

    useEffect(() => {
        getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.query])

    const getUser = async () => {
        if(userService.getId() !== null){
            const _result = await userService.getById(userService.getId());
            const _user = _result.data;
            setUser(_user);
            if(router.query.session_id !== null && router.query.session_id !== undefined){
                user.share_custom_varieties = true;
                await userService.update(userService.getId(), user);
            }
        }else{
            router.push("/account/login")
        }
    }

    return (
        <div className={styles.screen}>
            <img className={styles.logo} src={"/assets/logo.png"} alt="logo" />
            <h2>You&apos;re good to go!</h2>
            <h3>Let&apos;s make this season the best ever.</h3>

            <div
                className={styles.nextButtonContainer}
                onClick={() => router.push("/")}
            >
                <h5>Plan Season</h5>
            </div>
        </div>
    );
};

export default Success;
