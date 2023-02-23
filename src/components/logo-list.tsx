import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import {
  Space,
  Container,
  Section,
  FlexList,
  Text,
  Logo,
  HomepageImage,
} from "./ui"

export interface LogoItemProps {
  id: string
  alt: string
  image: HomepageImage
}

export function LogoItem(props: LogoItemProps) {
  if (!props.image) return null

  return (
    <Logo alt={props.alt} image={props.image.gatsbyImageData} size="medium" />
  )
}

export interface LogoListProps {
  text?: string
  logos: LogoItemProps[]
}

export default function LogoList() {
  const { json: { text, logos } } = useStaticQuery(graphql`
    query {
      json(uid: {eq: "homepage-logo-list"}) {
        text,
        logos {
          id,
          alt,
          image
        }
      }
    }
  `)
  return (
    <Section paddingY={4}>
      <Container width="narrow">
        {text && (
          <Text center variant="lead">
            {text}
          </Text>
        )}
        <Space size={4} />
        <FlexList gap={4} variant="center">
          {logos.map(
            (logo) =>
              logo && (
                <li key={logo.id}>
                  <LogoItem {...logo} />
                </li>
              )
          )}
        </FlexList>
      </Container>
    </Section>
  )
}
