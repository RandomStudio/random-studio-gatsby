import React from 'react';
import Layout from '../../components/Layout/Layout';
import ProjectDetail from '../../components/ProjectDetail/ProjectDetail';

export default ({ entry }) => {
  console.log('Success');
  return (
    <Layout>
      <ProjectDetail {...entry.toJSON().data} />
    </Layout>
  );
};
