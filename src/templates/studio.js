import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout/layout"
import Navigation from "../components/Layout/navigation"
import Footer from "../components/Layout/footer"
import Intro from "../components/Studio/Intro/intro"
import InfoBlock from "../components/Studio/InfoBlock/infoBlock"
import Impression from "../components/Studio/Impression/impression"

export const query = graphql`
  {
    studioPage: markdownRemark(frontmatter: { templateKey: { eq: "studio" } }) {
      frontmatter {
        intro
        infoBlock {
          collection {
            showIndicator
            info
            images {
              caption
              image {
                childImageSharp {
                  fluid(maxWidth: 1920) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
        studioImpression {
          title
          showIndicator
          images {
            image {
              childImageSharp {
                fluid(maxWidth: 1920) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    indexPage: markdownRemark(frontmatter: { templateKey: { eq: "index" } }) {
      frontmatter {
        address
        contact
      }
    }
  }
`

export default ({ location, data: { indexPage, studioPage } }) => (
  <Layout>
    <Navigation />
    <Intro
      data={{ ...indexPage.frontmatter, ...studioPage.frontmatter }}
      location={location}
    />
    {studioPage.frontmatter.infoBlock.map(({ collection }, index) => (
      <InfoBlock key={index} collection={collection} />
    ))}
    <Impression data={studioPage.frontmatter.studioImpression} />
    <Footer {...indexPage.frontmatter} />
  </Layout>
)
