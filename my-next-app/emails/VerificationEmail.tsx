import * as React from 'react';
import { Html, Head,Font,Preview,Heading,Row,Section,Text,Button} from "@react-email/components";

interface verificationEmailProps{
    username:string;
    otp:string;
}
export default function VerificationEmail({username,otp}:verificationEmailProps){
    return(
        <Html>
            <Head>
                <title>Verification code</title>
            </Head>
            <Preview>Here&apos;s your verification code:{otp}</Preview>
            <Section>
                <Row>
                    <Heading as="h2">Hello {username}</Heading>
                </Row>
                <Row>
                    <Text>
                        Thank you for registration.Please use the
                        following verification
                        code to complete your registration.
                        {otp}
                    </Text>
                </Row>
            </Section>
        </Html>
        
    )
}