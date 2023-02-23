import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import * as sections from "../components/sections"
import Fallback from "../components/fallback"
import SEOHead from "../components/head"

interface AboutProps {
  json: {
    data: {
      aboutPage: {
        id: string
        title: string
        description: string
        image: { id: string; url: string }
        blocks: sections.HomepageBlock[]
      }
    }
  }
}

export default function About() {
  const { json: { data } }: AboutProps = useStaticQuery(graphql`
    query AboutpageQuery {
      json(uid: {eq: "about"}) {
        data {
          aboutPage {
            id
            title
            description
            image {
              id
              url
            },
            blocks {
              id
              blocktype
            }
          }
        }
      }
    }
  `)
  const { aboutPage } = data;

  return (
    <Layout>
      {aboutPage.blocks.map((block) => {
        const { id, blocktype, ...componentProps } = block
        const Component = sections[blocktype] || Fallback
        return <Component key={id} {...(componentProps as any)} />
      })}
    </Layout>
  )
}
export const Head = () => {
  const { json: { data } }: AboutProps = useStaticQuery(graphql`
    query AboutpageQuery {
      json(uid: {eq: "about"}) {
        data {
          aboutPage {
            id
            title
            description
            image {
              id
              url
            },
            blocks {
              id
              blocktype
            }
          }
        }
      }
    }
  `)
  const { aboutPage } = data;
  return <SEOHead {...aboutPage} />
}


//         ...AboutHeroContent
//         ...AboutStatListContent
//         ...HomepageProductListContent
//         ...AboutLeadershipContent
//         ...HomepageBenefitListContent
//         ...AboutLogoListContent
//         ...HomepageCtaContent
