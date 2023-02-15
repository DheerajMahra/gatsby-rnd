import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as React from "react"
import {
  Box,
  ButtonList,
  Container,
  Flex,
  Heading,
  HomepageImage,
  HomepageLink,
  Kicker,
  Section,
  Subhead,
  Text,
} from "./ui"

export interface HeroProps {
  image?: HomepageImage
  kicker?: string
  h1: string
  subhead: string
  text: string
  links: HomepageLink[]
}

export default function Hero(props: HeroProps) {
  const { json: { kicker, h1, subhead, text, image, links } } = useStaticQuery(graphql`
    query {
      json(uid: {eq: "hero"}) {
        image {
          id,
          alt,
          gatsbyImageData,
          url
        },
        kicker,
        h1,
        subhead,
        text,
        links {
          id,
          href,
          url,
          text
        }
      }
    }
  `)

  return (
    <Section>
      <Container>
        <Flex gap={4} variant="responsive">
          <Box width="half">
            {image && (
              <GatsbyImage
                alt={image.alt}
                image={getImage(image.gatsbyImageData)}
              />
            )}
          </Box>
          <Box width="half">
            <Heading as="h1">
              {kicker && <Kicker>{kicker}</Kicker>}
              {h1}
            </Heading>
            <Subhead as="h2">{subhead}</Subhead>
            <Text as="p">{text}</Text>
            <ButtonList links={links} />
          </Box>
        </Flex>
      </Container>
    </Section>
  )
}