import React from 'react';
import { Card } from 'antd';

export default function ListingCard({ project }) {
    return (
        <Card key={project.id} title={project.name}>
            {project.area_of_interest_name}
            {project.scenarios.map(scenario => (
                <Card
                    type='inner'
                    key={scenario.id}
                    title={scenario.name}
                    style={{ marginTop: '16px' }}
                >
                    <p>Weather Type: {scenario.weather_type}</p>
                </Card>
            ))}
        </Card>
    );
}
