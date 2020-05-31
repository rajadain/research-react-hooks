import React from 'react';
import { Card } from 'antd';

import { useRouter } from '../../hooks/useRouter';

export default function ListingCard({ project }) {
    const { push } = useRouter();

    return (
        <Card
            title={project.name}
            onClick={() => push(`/projects/${project.id}`)}
        >
            {project.area_of_interest_name}
        </Card>
    );
}
