import React, { useEffect, useState } from "react";


const Alerts = ({ messages }) => {
    const [alerts, setAlerts] = useState(messages);
    useEffect(() => {
        setAlerts(messages.map(messages => [...messages]));
    }, []);

    return (
        <div>
            We have a problem Houston!
            <ul>
                {alerts.map(m => <li>{m}</li>)}
            </ul>
        </div>
    )

}

export default Alerts;