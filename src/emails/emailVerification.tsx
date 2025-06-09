import {
  Tailwind,
  Html,
  Img,
  Head,
  Preview,
  Button,
} from "@react-email/components";
import * as React from "react";

type FellowVerificationEmailProps = {
  name: string;
};

export default function FellowVerificationEmail({
  name,
}: FellowVerificationEmailProps) {
  const baseUrl = "http://straightforwardjobsite.com";
  return (
    <Html>
      <Tailwind
        config={{
          theme: {
            fontFamily: {
              sans: ["satoshi", "sans-serif"],
              serif: ["courier", "serif"],
              helv: ["helvetica", "sans-serif"],
            },
            extend: {
              colors: {
                jade: "#50B09F",
                olive: "#A6A646",
                eggshell: "#FFF9F3",
                cream: "#F8F2EC",
                apricot: "#FDA26B",
                midnight: "#308B7B",
                watermelon: "#FFABDA",
                magenta: "#E673A9",
              },

              letterSpacing: {
                superwide: "0.15em",
              },
            },
          },
          plugins: [require("@mertasan/tailwindcss-variables")],
        }}
      >
        <body className="Email h-[100%] gap-12 bg-cream pb-40 font-sans font-semibold tracking-widest text-midnight">
          <Preview>Welcome to Straightforward Job Site {name}!</Preview>
          <Head>
            <Img
              //we'll need to make sure this logo is working + the baseUrl is updated when the site goes live so we can access the URL
              src={`${baseUrl}/sfjs-logo.png`}
              width="153"
              height="50"
              alt="straightforward job site"
              className="Email Header px-10 py-10"
            />
          </Head>
          <section className="EmailBody mb-8 px-[15%] py-[5%] text-left text-[1rem] leading-relaxed">
            <p className="EmailInfo text-jade">Hello there {name}!</p>
            <p className="EmailInfo">
              {`We just need to verify your email so you can have access to our Straightforward Job Site!`}
            </p>
            <p className="EmailInfo mt-12 text-end text-olive">
              {`Go ahead and click on the button below and we'll get you back to filling in your details so you can apply to jobs the easy way.`}
            </p>

            {/* BUTTON GOES HERE */}

            <Button
              className="box-border w-full rounded-full bg-jade px-[12px] py-[12px] text-center font-semibold text-eggshell"
              href="https://react.email"
            >
              Verify Email
            </Button>

            {/* <p className="EmailInfo mt-12 text-jade">
              {`We hope you'll enjoy the conscious + thoughtful +
              human-focused enviornment we're working so hard to create ✨`}
            </p>
            <p className="EmailInfo mt-20 text-end text-sm italic tracking-superwide text-olive">
              - the makers of straightforward job site
            </p> */}
          </section>
        </body>
      </Tailwind>
    </Html>
  );
}
