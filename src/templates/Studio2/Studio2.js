import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import Highlight from './Highlight/Highlight';
import ServiceList from './ServiceList/ServiceList';
import SEO from '../../components/SEO/SEO';
import Footer from '../../components/Footer/Footer';
import Message from './Message/Message';
import Recruitee from '../Studio/Recruitee/Recruitee';

export const query = graphql`
  query StudioPage($templateKey: String!) {
    studioPage: markdownRemark(
      frontmatter: { templateKey: { eq: $templateKey } }
    ) {
      fields {
        slug
      }
      frontmatter {
        message
        highlights: highlight {
          copy
          image {
            childImageSharp {
              fluid(maxWidth: 1280, quality: 70) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        services {
          title
          list {
            title
            copy
            image {
              childImageSharp {
                fluid(maxWidth: 1280, quality: 70) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }

    indexPage: markdownRemark(frontmatter: { templateKey: { eq: "Home" } }) {
      frontmatter {
        address
        email
        phone
      }
    }
  }
`;

const Studio2 = ({
  data: {
    studioPage: { fields, frontmatter },
    indexPage,
  },
  location,
}) => {
  return (
    <Layout>
      <SEO title="Studio" pathName={fields.slug} />
      <Highlight highlights={frontmatter.highlights} />
      <Message message={frontmatter.message} />

      <ServiceList
        services={frontmatter.services.list}
        headerTitle={frontmatter.services.title}
      />
      <Recruitee location={location} />
      <Footer {...indexPage.frontmatter} />
    </Layout>
  );
};

export default Studio2;
