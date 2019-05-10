import React from "react";
import { shallow, ShallowWrapper } from "enzyme";

import TypeWriter, { ITypeWriterProps } from "./TypeWriter";
import { findByTestAtter } from "../../../helpers/findBy";

const words = ["test #1", "test #2", "test #3"];
const wait = 4000;
const setup = (props: ITypeWriterProps) => {
  /* Disabling the Lifecycle Methods seems to prevent line 34 from being tested.
     This does not seem to be a real issue, but this can be changed if it does prove to be problematic.
  */
  const wrapper = shallow(<TypeWriter words={words} wait={wait} />, {
    disableLifecycleMethods: true
  });

  return wrapper;
};

describe(`<TypeWriter words={[${words}]} wait={${wait}} /> (life cycle methods disabled)`, () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = setup({ words, wait });
  });
  test("Renders without component error", () => {
    const typeWriterParagraph = findByTestAtter(wrapper, "type-writer-text");

    expect(typeWriterParagraph.length).toBe(1);
  });
  test(`Initial text is blank`, () => {
    expect(findByTestAtter(wrapper, "type-writer-text").text()).toBe("");
  });
  test(`Adds one letter at a time`, () => {
    const typeWriterInstance = wrapper.instance() as TypeWriter;
    typeWriterInstance.type();
    typeWriterInstance.type();
    typeWriterInstance.type();
    expect(findByTestAtter(wrapper, "type-writer-text").text()).toBe("tes");
  });
});

describe(`...After each word is completed`, () => {
  let wrapper: ShallowWrapper,
    typeWriterInstance: TypeWriter,
    wordLetterArray: string[];

  beforeEach(() => {
    wrapper = setup({ words, wait });
    typeWriterInstance = wrapper.instance() as TypeWriter;
    const wordIndex = typeWriterInstance.state.wordIndex;
    wordLetterArray = words[wordIndex].split("");

    wordLetterArray.forEach((letter, index) => {
      // Used for checking the pause after the last letter
      if (index === wordLetterArray.length - 1) {
        jest.useFakeTimers();
      }
      typeWriterInstance.type();
    });
  });
  test(`The full word is displayed`, () => {
    expect(findByTestAtter(wrapper, "type-writer-text").text()).toBe("test #1");
  });
  test(`Pauses for the wait time`, () => {
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), wait);
    expect(findByTestAtter(wrapper, "type-writer-text").text()).toBe("test #1");
  });
  test(`Removes one letter at a time`, () => {
    typeWriterInstance.type();
    typeWriterInstance.type();
    typeWriterInstance.type();
    expect(findByTestAtter(wrapper, "type-writer-text").text()).toBe("test");
  });
  test(`Continually cycles through an array of words.`, () => {
    let wordIndex: number = wrapper.state("wordIndex");
    const typeOrDeleteWord = () => {
      wordLetterArray.forEach(letter => {
        typeWriterInstance.type();
      });
    };
    const typeNextWord = () => {
      wordIndex = wrapper.state("wordIndex");
      wordLetterArray = words[wordIndex].split("");
      typeOrDeleteWord();
    };

    // Delete the first word
    typeOrDeleteWord();

    // Type the second word
    typeNextWord();
    wordLetterArray = words[wordIndex].split("");
    // Delete the second word
    typeOrDeleteWord();

    // Type the third word
    typeNextWord();
    expect(findByTestAtter(wrapper, "type-writer-text").text()).toBe("test #3");
    wordLetterArray = words[wordIndex].split("");
    // Delete the third word
    typeOrDeleteWord();

    // Cycle back to first word and type it
    typeNextWord();
    expect(findByTestAtter(wrapper, "type-writer-text").text()).toBe("test #1");
  });
});
