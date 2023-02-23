import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import {
  Container,
  Section,
  FlexList,
  Text,
  Kicker,
  Heading,
  Subhead,
  Box,
  Icon,
  LinkList,
  HomepageImage,
  HomepageLink,
} from "./ui"

interface ProductProps {
  id: string
  image: HomepageImage
  heading: string
  text: string
  links: HomepageLink[]
}

function Product(props: ProductProps) {
  return (
    <Box center>
      {props.image && (
        <Icon
          alt={props.image.alt}
          image={props.image.gatsbyImageData}
          size="large"
        />
      )}
      <Subhead>{props.heading}</Subhead>
      <Text>{props.text}</Text>
      <LinkList links={props.links} />
    </Box>
  )
}

export interface ProductListProps {
  kicker?: string
  heading: string
  text?: string
  content: ProductProps[]
}

export default function ProductList(props: ProductListProps) {
  const { json: { kicker, heading, text, content } } = useStaticQuery(graphql`
    query {
      json(uid: {eq: "product-list"}) {
        kicker,
        heading,
        text,
        content {
          id,
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
    <Section>
      <Container>
        <Box center paddingY={4}>
          <Heading>
            {kicker && <Kicker>{kicker}</Kicker>}
            {heading}
          </Heading>
          {text && <Text>{text}</Text>}
        </Box>
        <FlexList gap={4} variant="responsive">
          {content.map((product) => (
            <li key={product.id}>
              <Product {...product} />
            </li>
          ))}
        </FlexList>
      </Container>
    </Section>
  )
}