import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import * as sections from "../components/sections"
import Fallback from "../components/fallback"
import SEOHead from "../components/head"

interface HomepageProps {
  json: {
    data: {
      homepage: {
        id: string
        title: string
        description: string
        image: { id: string; url: string }
        blocks: sections.HomepageBlock[]
      }
    }
  }
}

export default function Homepage() {
  const { json: { data } }: HomepageProps = useStaticQuery(graphql`
    query HomepageQuery {
      json(uid: {eq: "index"}) {
        data {
          homepage {
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
  const { homepage } = data;

  return (
    <Layout>
      {homepage.blocks.map((block) => {
        const { id, blocktype, ...componentProps } = block
        const Component = sections[blocktype] || Fallback
        return <Component key={id} {...(componentProps as any)} />
      })}
    </Layout>
  )
}
export const Head = () => {
  const { json: { data } }: HomepageProps = useStaticQuery(graphql`
    query HomepageQuery {
      json(uid: {eq: "index"}) {
        data {
          homepage {
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
  const { homepage } = data;
  return <SEOHead {...homepage} />
}
