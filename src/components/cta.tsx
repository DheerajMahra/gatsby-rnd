import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  Nudge,
  Container,
  Section,
  Heading,
  Text,
  ButtonList,
  Kicker,
  HomepageLink,
  HomepageImage,
} from "./ui"

export interface CtaProps {
  id: string
  kicker?: string
  heading: string
  text: string
  links: HomepageLink[]
  image?: HomepageImage
}

export default function HomepageCta(props: CtaProps) {
  const { json: { kicker, heading, text, image, links } } = useStaticQuery(graphql`
    query {
      json(uid: {eq: "homepage-cta"}) {
        id,
        kicker,
        heading,
        text,
        links {
          id
          href
          text
        }
      }
    }
  `)

  return (
    <Container width="fullbleed">
      <Section padding={5} radius="large" background="primary">
        <Heading center>
          {kicker && <Kicker center>{kicker}</Kicker>}
          {heading}
        </Heading>
        <Text as="p" center variant="lead">
          {text}
        </Text>
        <ButtonList links={links} variant="center" reversed />
        {image && (
          <Nudge left={5} right={5} bottom={5}>
            <GatsbyImage
              alt={image.alt}
              image={getImage(image.gatsbyImageData)}
            />
          </Nudge>
        )}
      </Section>
    </Container>
  )
}
