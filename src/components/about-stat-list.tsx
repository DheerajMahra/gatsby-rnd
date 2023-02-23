import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Container, Section, FlexList, Box, Text } from "./ui"
import * as styles from "./about-stat-list.css"

interface AboutStatProps {
  id: string
  value?: string
  label?: string
}

function AboutStat(props: AboutStatProps) {
  return (
    <Box width="fitContent" className={styles.statContainer}>
      {props.value && <Text variant="stat">{props.value}</Text>}
      {props.label && <Text variant="statLabel">{props.label}</Text>}
    </Box>
  )
}

export interface AboutStatListProps {
  json: {
    content: AboutStatProps[]
  }
}

export default function AboutStatList() {
  const { json: { content } }: AboutStatListProps = useStaticQuery(graphql`
    query {
      json(uid: {eq: "about-stat-list"}) {
        content {
          id
          value
          label
        }
      }
    }
  `)
  return (
    <Section>
      <Container>
        <FlexList className={styles.statList} variant="center" responsive>
          {content.map((stat) => (
            <AboutStat key={stat.id} {...stat} />
          ))}
        </FlexList>
      </Container>
    </Section>
  )
}