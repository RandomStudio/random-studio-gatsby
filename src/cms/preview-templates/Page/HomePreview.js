import React from 'react';
import Layout from '../../../components/Layout/Layout';
import HomeVideo from '../../../templates/Home/HomeVideo/HomeVideo';
import ProjectList from '../../../templates/Home/ProjectList/ProjectList';

export default ({ entry }) => {
  const { data } = entry.toJSON();

  const {
    collaborationCredits,
    layout,
    projects,
    video,
  } = data;

  const formattedProjects = (projects && projects.length > 0) ? projects.map(({
    caption,
    project,
    thumbnail,
  }) => ({
    slug: null,
    title: caption || project,
    thumbnail,
  })) : [];

  return (
    <Layout>
      <HomeVideo
        layout={layout}
        videoUrl={video}
        collaborationCredits={collaborationCredits}
      />
      <ProjectList
        {...data}
        projects={formattedProjects}
      />
    </Layout>
  );
};