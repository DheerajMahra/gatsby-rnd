import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  Container,
  FlexList,
  Heading,
  Section,
  Text,
  Box,
  Kicker,
  Space,
  HomepageImage,
} from "./ui"

interface AboutProfileProps {
  id: string
  image?: HomepageImage
  name?: string
  jobTitle?: string
}

function AboutProfile(props: AboutProfileProps) {
  return (
    <Box width="third" padding={4} center>
      {props.image && (
        <GatsbyImage
          alt={props.image.alt}
          image={getImage(props.image.gatsbyImageData)}
        />
      )}
      <Space size={3} />
      <Box>
        {props.name && (
          <Text variant="medium" bold center>
            {props.name}
          </Text>
        )}
        {props.jobTitle && (
          <Text variant="medium" center>
            {props.jobTitle}
          </Text>
        )}
      </Box>
    </Box>
  )
}

export interface AboutLeadershipProps {
  json: {
    kicker?: string
    heading?: string
    subhead?: string
    content: AboutProfileProps[]
  }
}

export default function AboutLeadership() {
  const { json: { kicker, heading, subhead, content }}: AboutLeadershipProps = useStaticQuery(graphql`
    query {
      json(uid: {eq: "about-leadership"}) {
        kicker
        heading
        subhead
      }
    }
  `)
  return (
    <Section>
      <Container width="tight">
        <Box center paddingY={4}>
          {kicker && <Kicker>{kicker}</Kicker>}
          {heading && <Heading as="h1">{heading}</Heading>}
          {subhead && <Text>{subhead}</Text>}
        </Box>
        <FlexList gap={0} variant="center" alignItems="start">
          {content?.map((profile) => (
            <AboutProfile key={profile.id} {...profile} />
          ))}
        </FlexList>
      </Container>
    </Section>
  )
}