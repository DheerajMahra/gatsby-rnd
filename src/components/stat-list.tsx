import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  Container,
  Section,
  FlexList,
  Text,
  Kicker,
  Heading,
  Flex,
  Box,
  Icon,
  ButtonList,
  Nudge,
  HomepageImage,
  HomepageLink,
} from "./ui"

interface StatProps {
  id: string
  value: string
  label: string
}

function Stat(props) {
  return (
    <Box>
      <Text variant="stat">{props.value}</Text>
      <Text variant="statLabel">{props.label}</Text>
    </Box>
  )
}

export interface StatListProps {
  icon?: HomepageImage
  kicker?: string
  heading: string
  text?: string
  content: StatProps[]
  links: HomepageLink[]
  image?: HomepageImage
}

export default function StatList(props: StatListProps) {
  const { json: { icon, image, kicker, heading, text, content, links } } = useStaticQuery(graphql`
    query {
      json(uid: {eq: "stat-list"}) {
        kicker,
        heading,
        text,
        content {
          id,
          value,
          label
        },
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
    <Container width="fullbleed">
      <Section padding={5} radius="large" background="primary">
        <Flex responsive variant="end">
          <Box width="half">
            {icon && (
              <Icon alt={icon.alt} image={icon.gatsbyImageData} />
            )}
            <Heading>
              {kicker && <Kicker>{kicker}</Kicker>}
              {heading}
            </Heading>
            {text && <Text variant="lead">{text}</Text>}
            <FlexList wrap gap={4}>
              {content.map((stat) => (
                <li key={stat.id}>
                  <Stat {...stat} />
                </li>
              ))}
            </FlexList>
            <ButtonList links={links} reversed />
          </Box>
          <Box width="half">
            {image && (
              <Nudge right={5} bottom={5}>
                <GatsbyImage
                  alt={image.alt}
                  image={getImage(image.gatsbyImageData)}
                />
              </Nudge>
            )}
          </Box>
        </Flex>
      </Section>
    </Container>
  )
}