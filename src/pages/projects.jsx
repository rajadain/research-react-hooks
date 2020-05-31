import React from 'react';
import { Card, Spin } from 'antd';
import axios from 'axios';
import useSWR from 'swr';
import { useParams } from 'react-router-dom';

import { URLS } from '../constants';
import ListingCard from '../components/projects/ListingCard';

export default function Projects() {
    const params = useParams();
    const url = params?.projectId
        ? `${URLS.PROJECTS}${params.projectId}`
        : URLS.PROJECTS;
    const { data, error } = useSWR(url, async () => {
        const { data } = await axios.get(url);
        return data;
    });

    if (error) {
        return <div>Error fetching data.</div>;
    }

    if (!data) {
        return <Spin size='large' />;
    }

    return params?.projectId ? (
        <Card key={data.id} title={data.name}>
            {data.area_of_interest_name}
            {data.scenarios.map(scenario => (
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
    ) : (
        data.map(project => <ListingCard key={project.id} project={project} />)
    );
}
