import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

type MagicLinkMailProps = {
  link: string
}

export function MagicLinkMail({ link }: MagicLinkMailProps) {
  return (
    <Html>
      <Head />
      <Preview>Magic login link</Preview>
      <Tailwind>
        <Body className="m-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] p-[20px]">
            <Heading className="text-[24px] font-normal">
              <strong>🪄 Your magic link</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px]">
              <Link
                href={link}
                className="rounded-md bg-black px-4 py-2 text-white"
              >
                👉 Click here to sign in 👈
              </Link>
            </Text>
            <Section className="rounded-md bg-[#d2d2d2] px-6 py-4">
              <Text className="text-[14px]">{link}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
