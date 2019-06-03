import React from "react";
import { ShallowWrapper } from "enzyme";
import { createShallow } from "@material-ui/core/test-utils";

import Navbar from "./Navbar";
import { findByTestAtter } from "../../../helpers/findBy";

let shallow;
const setup = (props = {}) => {
  const wrapper = shallow(<Navbar {...props} />);
  return wrapper;
};

describe("<Navbar />", () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    shallow = createShallow({ untilSelector: `[data-test="app-bar"]` });
    wrapper = setup();
  });
  test("renders without component error", () => {
    const AppBar = findByTestAtter(wrapper, "app-bar");
    expect(AppBar.length).toBe(1);
  });
});
