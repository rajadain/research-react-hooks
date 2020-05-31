import React from 'react';
import { Button, Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';

import { URLS } from '../../constants';

export default function ListingCard({ project, mutate }) {
    const onProjectEdit = () => {
        const newName = window.prompt('Edit Project Name', project.name);
        const newProj = {
            ...project,
            name: newName,
        };
        axios.put(`${URLS.PROJECTS}${project.id}`, newProj);
        mutate(newProj);
    };

    return (
        <Card
            key={project.id}
            title={project.name}
            extra={
                <Button
                    type='dashed'
                    shape='round'
                    icon={<EditOutlined />}
                    onClick={onProjectEdit}
                />
            }
        >
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
