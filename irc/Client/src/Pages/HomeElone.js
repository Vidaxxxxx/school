import React from 'react';
import Style from '../Style/home.module.css';
import Input from '../Components/input';
import Channel from '../Components/Channel';




const center = () => {
    return (
        <div>
            <div className={Style.ctn}>


                <div className={Style.gauche}>

                    <div className={Style.box}>
                        <h1>Channel</h1>
                    </div>

                    <div className={Style.channel}>
                        <Channel />
                    </div>

                    <div className={Style.boxB}>
                        <h1>bha</h1>
                    </div>

                </div>


                <div className={Style.droit}>


                    <div className={Style.canal}>
                        <h1>Canal</h1>
                    </div>

                    <div className={Style.message}>
                        <h1> Message</h1>
                    </div>

                    <div className={Style.input}>
                        <Input />

                    </div>

                </div>

            </div >




        </div>
    );
};

export default center;