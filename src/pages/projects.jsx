import React from 'react';
import { Spin } from 'antd';
import axios from 'axios';
import useSWR from 'swr';
import { useParams } from 'react-router-dom';

import { URLS } from '../constants';
import ListingCard from '../components/projects/ListingCard';
import DetailCard from '../components/projects/DetailCard';

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
        <DetailCard project={data} />
    ) : (
        data.map(project => <ListingCard key={project.id} project={project} />)
    );
}
