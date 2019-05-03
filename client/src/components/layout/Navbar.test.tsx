import React from "react";
import { shallow, ShallowWrapper } from "enzyme";

import Navbar from "./Navbar";
import { findByElement } from "../../helpers/findBy";

const setup = (props = {}) => {
  const wrapper = shallow(<Navbar {...props} />);
  return wrapper;
};

describe("<Navbar />", () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = setup();
  });
  test("renders without component error", () => {
    const nav = findByElement(wrapper, "nav");
    expect(nav.length).toBe(1);
  });
});
