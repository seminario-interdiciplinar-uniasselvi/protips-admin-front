import React from 'react';
import Cron from "react-cron-generator";

const CronEditor = ({setCron}) => {
    const handleCronChange = (newCron) => {
        setCron(newCron);
    };

    return (
        <Cron
            onChange={handleCronChange}
            allowInput={false}
            showResultCron={false}
            showResultText={false}
            options={{
                headers: ['DAILY', 'WEEKLY', 'MONTHLY'],
            }}
        />
    );
};

export default CronEditor;