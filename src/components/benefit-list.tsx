import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import {
  Container,
  Section,
  FlexList,
  Box,
  Icon,
  Heading,
  Text,
  Space,
  HomepageImage,
} from "./ui"

interface BenefitProps {
  id: string
  image?: HomepageImage
  heading: string
  text: string
}

function Benefit(props: BenefitProps) {
  return (
    <Box as="li" width="third" padding={4} paddingY={3}>
      {props.image && (
        <Icon
          alt={props.image.alt}
          image={props.image.gatsbyImageData}
          size="small"
        />
      )}
      <Space size={2} />
      <Heading variant="subheadSmall">{props.heading}</Heading>
      <Text>{props.text}</Text>
    </Box>
  )
}

export interface BenefitListProps {
  heading?: string
  text?: string
  content: BenefitProps[]
}

export default function BenefitList(props: BenefitListProps) {
  const { json: { heading, text, content } } = useStaticQuery(graphql`
    query {
      json(uid: {eq: "benefit-list"}) {
        heading,
        text,
        content {
          id,
          heading,
          text
        }
      }
    }
  `)

  return (
    <Section>
      <Container>
        <Box center>
          {heading && <Heading>{heading}</Heading>}
          {text && <Text variant="lead">{text}</Text>}
        </Box>
        <Space size={3} />
        <FlexList gutter={3} variant="start" responsive wrap>
          {content.map((benefit) => (
            <Benefit key={benefit.id} {...benefit} />
          ))}
        </FlexList>
      </Container>
    </Section>
  )
}