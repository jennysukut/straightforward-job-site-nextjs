import SiteButton from "@/components/siteButton";

export default function Home() {
  return (
    <main className="Main flex min-h-screen flex-col items-center bg-cream p-24 align-middle">
      <h1 className="Title text-3xl text-jade">Straightforward Job Site</h1>
      <p className="Subtitle italic text-lilac">
        testing out some tailwind classes + options
      </p>

      <div className="ButtonContainer my-5 flex flex-col items-center gap-6">
        <SiteButton variant="hollow">{`I'm a Normal button`}</SiteButton>
        <SiteButton
          variant="filled"
          colorScheme="e3"
          addClasses="max-w-72"
          size="large"
        >
          {`I'm a Large Button!`}
        </SiteButton>
        <SiteButton variant="filled" colorScheme="d4" disabled>
          {`I don't work :(`}
        </SiteButton>
      </div>

      <div className="flex flex-row items-center justify-evenly">
        <div className="borderContainer">
          <h3 className="text-lg text-jade">{`Here's a Heading`}</h3>
          <p className="text-jade">
            {`Regular text test. Let's see what happens when we put more and more
            info in here.`}
          </p>
        </div>

        <div className="borderContainer">
          <h3 className="text-lg text-jade">Another Box</h3>
          <p className="text-sm italic text-jade">
            {`Here goes some italic text. Let's try and make it a bit smaller too
            and see what that does.`}
          </p>
        </div>

        <div className="solidContainer bg-emerald drop-shadow-apricot">
          <h3 className="text-lg">Testing</h3>
          <p className="text-xs">
            Smaller text going here - it should be cream.
          </p>
        </div>
      </div>
    </main>
  );
}
