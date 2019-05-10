import React from "react";
import TypeWriter from "../common/type_writer/TypeWriter";

export default function Landing() {
  return (
    <section>
      <p>DECREE Digital</p>
      <TypeWriter
        words={[
          "First line of words.",
          "That was sick, let's try this one.",
          "Nice!!! Let's top it off with this last one."
        ]}
        wait={4000}
      />
    </section>
  );
}
