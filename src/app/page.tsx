import Image from "next/image";
import TestButton from "./button";

export default function Home() {

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    console.log(button.classList)
    // setClickedButton(button.name);
  };

  return (
    <main className="flex min-h-screen flex-col items-center align-middle p-24 bg-cream">
      <h1 className="text-jade text-3xl">Straightforward Job Site</h1>
      <p className="text-lilac italic">testing out some tailwind classes + options</p>

<div className="flex flex-col items-center my-5">
      <button className="button bg-jade drop-shadow-smLime">test button</button>
      <button className="button bg-watermelon drop-shadow-olive max-w-56 py-4">new button with more text + options</button>
      <TestButton />
</div>

<div className="flex flex-row justify-evenly items-center">
      <div className="borderContainer">
        <h3 className="text-jade text-lg">Here's a Heading</h3>
        <p className="text-jade">Regular text test. Let's see what happens when we put more and more info in here.</p>
      </div>

      <div className="borderContainer">
        <h3 className="text-jade text-lg">Another Box</h3>
        <p className="text-jade italic text-sm">Here goes some italic text. Let's try and make it a bit smaller too and see what that does.</p>
      </div>

      <div className="solidContainer bg-emerald drop-shadow-apricot">
        <h3 className="text-lg">Testing</h3>
        <p className="text-xs">Smaller text going here - it should be cream.</p>
      </div>
      </div>
    </main>
  );
}
