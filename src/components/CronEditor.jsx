import React from 'react';
import Cron from "react-cron-generator";

const CronEditor = ({setCron}) => {
    const handleCronChange = (newCron) => {
        setCron(newCron);
        console.log(newCron);
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
            locale={'pt-BR'}
        />
    );
};

export default CronEditor;