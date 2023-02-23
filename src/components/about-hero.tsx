import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Section, Text, SuperHeading, HomepageImage } from "./ui"
import * as styles from "./about-hero.css"

export interface AboutHeroProps {
  json: {
    heading: string
    text?: string
    image?: HomepageImage
  }
}

export default function AboutHero() {
  const { json: { heading, text, image } }: AboutHeroProps = useStaticQuery(graphql`
    query {
      json(uid: {eq: "about-hero"}) {
        heading
        text
        image {
          id
          alt
          gatsbyImageData
          url
        }
      }
    }
  `)

  return (
    <Section>
      <Container>
        <SuperHeading className={styles.aboutHeroHeader}>
          {heading}
        </SuperHeading>
        {text && (
          <Text className={styles.aboutHeroText}>{text}</Text>
        )}
      </Container>
      <Container width="wide">
        {image && (
          <GatsbyImage
            alt={image.alt}
            image={getImage(image.gatsbyImageData)}
            className={styles.aboutHeroImage}
          />
        )}
      </Container>
    </Section>
  )
}