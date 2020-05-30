import React from 'react';
import { Spin } from 'antd';
import { useRequireAuth } from '../hooks/useRequireAuth';

export default function Projects() {
    const auth = useRequireAuth();

    if (!auth) {
        return <Spin size="large" />;
    }

    return <h1>Projects</h1>;
}
