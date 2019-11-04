import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout/Layout';
import Footer from '../../components/Footer/Footer';
import ProjectList from './ProjectList/ProjectList';
import HomeVideo from './HomeVideo/HomeVideo';
import SEO from '../../components/SEO/SEO';

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      sort: { fields: frontmatter___priority, order: DESC }
      filter: { frontmatter: { templateKey: { eq: "Project" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            thumbnail {
              ratio
              marginLeft
              marginTop
              video
              width
              image {
                childImageSharp {
                  fluid(maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
    markdownRemark(frontmatter: { templateKey: { eq: "Home" } }) {
      fields {
        slug
      }
      frontmatter {
        address
        contact
        collaborationCredits {
          collaborator
          url
        }
        intro
        layout
        middle
        video
      }
    }
  }
`;

const Home = ({
  data: {
    allMarkdownRemark,
    markdownRemark,
  },
}) => {
  const edges = allMarkdownRemark.edges || [];
  const fields = markdownRemark ? markdownRemark.fields : {};
  const frontmatter = markdownRemark ? markdownRemark.frontmatter : {};

  return (
    <Layout>
      <SEO pathName={fields.slug} />
      <HomeVideo
        collaborationCredits={frontmatter.collaborationCredits}
        layout={frontmatter.layout}
        videoUrl={frontmatter.video}
      />
      <ProjectList
        {...frontmatter}
        projects={edges.map(
          ({
            node: {
              fields: { slug },
              frontmatter: { title, thumbnail },
            },
          }) => ({ slug, title, thumbnail }),
        )}
      />
      <Footer {...frontmatter} />
    </Layout>
  );
};

Home.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
    markdownRemark: PropTypes.shape({
      fields: PropTypes.shape,
      frontmatter: PropTypes.shape,
    }),
  }).isRequired,
};

export default Home;