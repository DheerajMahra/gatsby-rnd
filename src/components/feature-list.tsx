import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Container, Box, Kicker, Heading, Text } from "./ui"
import Feature, { FeatureDataProps } from "./feature"

export interface FeatureListProps {
  kicker?: string
  heading: string
  text?: string
  content: FeatureDataProps[]
}

export default function FeatureList(props: FeatureListProps) {
  const { json: { kicker, heading, text, content } } = useStaticQuery(graphql`
    query {
      json(uid: {eq: "feature-list"}) {
        kicker,
        heading,
        text,
        content {
          id,
          kicker,
          heading,
          text,
          links {
            id,
            href,
            url,
            text
          }
        }
      }
    }
  `)

  return (
    <Container width="fullbleed">
      <Box background="muted" radius="large">
        <Box center paddingY={5}>
          <Heading>
            {kicker && <Kicker>{kicker}</Kicker>}
            {heading}
          </Heading>
          {text && <Text>{text}</Text>}
        </Box>
        {content.map((feature, i) => (
          <Feature key={feature.id} {...feature} flip={Boolean(i % 2)} />
        ))}
      </Box>
    </Container>
  )
}