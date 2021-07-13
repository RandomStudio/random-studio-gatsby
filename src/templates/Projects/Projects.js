import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout/Layout';
import Footer from '../../components/Footer/Footer';
import ProjectList from './ProjectList/ProjectList';
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
        collaborationCredits {
          collaborator
          url
        }
        email
        intro
        layout
        middle
        articles {
          article
          position
        }
        projects {
          caption
          project
          thumbnail {
            marginLeft
            marginTop
            video
            width
            image {
              childImageSharp {
                fluid(maxWidth: 1280, quality: 80) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        phone
        video
      }
    }
  }
`;

const Home = ({ data: { allArticles, allMarkdownRemark, markdownRemark } }) => {
  const edges = allMarkdownRemark.edges || [];
  const fields = markdownRemark ? markdownRemark.fields : {};
  const frontmatter = markdownRemark ? markdownRemark.frontmatter : {};

  const articles = (frontmatter.articles || []).map((relation) => {
    const article = (allArticles.edges || []).find(
      (item) => item.node.frontmatter.title === relation.article,
    );

    return {
      ...article.node.frontmatter,
      position: relation.position,
    };
  });

  return (
    <Layout>
      <SEO pathName={fields.slug} />
      <ProjectList
        {...frontmatter}
        projects={(frontmatter.projects || [])
          .map(({ caption, project: projectTitle, thumbnail }) => {
            const project = edges.find(
              ({
                node: {
                  frontmatter: { title },
                },
              }) => title === projectTitle,
            );

            if (!project) {
              return null;
            }

            return {
              slug: project.node.fields.slug,
              title: caption || project.node.frontmatter.title,
              thumbnail,
            };
          })
          .filter((project) => project !== null)}
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