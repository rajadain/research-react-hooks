import React from 'react';
import { Card, Spin } from 'antd';
import axios from 'axios';
import useSWR from 'swr';

import { useRouter } from '../../hooks/useRouter';
import { URLS } from '../../constants';

export default function Projects() {
    const url = `${URLS.PROJECTS}`;
    const router = useRouter();
    const { data: projects, error } = useSWR(url, async () => {
        const { data } = await axios.get(url);
        return data;
    });

    if (error) {
        return <div>Error fetching data.</div>;
    }

    if (!projects) {
        return <Spin size='large' />;
    }

    return projects.map(project => (
        <Card
            key={project.id}
            title={project.name}
            onClick={() => router.push(`/projects/${project.id}`)}
        >
            {project.area_of_interest_name}
        </Card>
    ));
}
