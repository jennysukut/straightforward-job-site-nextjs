import TestButton from "./button";

export default function Home() {
  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    console.log(button.classList);
    // setClickedButton(button.name);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-cream p-24 align-middle">
      <h1 className="text-3xl text-jade">Straightforward Job Site</h1>
      <p className="italic text-lilac">
        testing out some tailwind classes + options
      </p>

      <div className="my-5 flex flex-col items-center">
        <button className="button bg-jade drop-shadow-smLime">
          test button
        </button>
        <button className="button max-w-56 bg-watermelon py-4 drop-shadow-olive">
          new button with more text + options
        </button>
        <TestButton />
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
