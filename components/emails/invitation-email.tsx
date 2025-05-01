import { configuration } from "@/lib/config"
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
  brandName?: string
}

export function InvitationMail({
  link,
  brandName = configuration.site.name,
}: MagicLinkMailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your {brandName} Invitation Link</Preview>
      <Tailwind>
        <Body className="m-auto bg-gray-100 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-lg bg-white p-[20px] shadow-sm">
            <Heading className="text-[24px] font-semibold text-gray-800">
              <strong>✨ Your {brandName} Invitation</strong>
            </Heading>
            <Text className="text-[16px] leading-[24px] text-gray-600">
              Welcome! We've reserved a special spot for you. Click the button
              below to join {brandName} instantly.
            </Text>
            <Section className="my-6 text-center">
              <Link
                href={link}
                className="inline-block rounded-lg bg-indigo-600 px-6 py-3 text-[16px] font-medium text-white transition-colors duration-200 hover:bg-indigo-700"
              >
                Join {brandName} Now
              </Link>
            </Section>
            <Text className="text-[14px] leading-[20px] text-gray-500">
              Or copy and paste this link into your browser:
            </Text>
            <Section className="mt-2 rounded-md bg-gray-50 p-4">
              <Text className="break-all text-[13px] text-gray-600">
                {link}
              </Text>
            </Section>
            <Section className="mt-8 border-t border-gray-200 pt-4">
              <Text className="text-[12px] text-gray-500">
                This invitation was sent by {brandName}. If you didn't expect
                this email, you can safely ignore it.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
