import React from "react";
import { ShallowWrapper } from "enzyme";
import { createShallow } from "@material-ui/core/test-utils";

import NavDrawer from "./NavDrawer";
import { findByTestAtter, findByElement } from "../../../helpers/findBy";

let shallow;
const setup = (props = {}) => {
  const wrapper = shallow(<NavDrawer {...props} />);
  return wrapper;
};

describe("<NavDrawer />", () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    shallow = createShallow({ untilSelector: `[data-test="nav-drawer"]` });
    wrapper = setup();
  });
  test("renders without component error", () => {
    const NavDrawer = findByTestAtter(wrapper, "nav-drawer");
    expect(NavDrawer.length).toBe(1);
  });
  test("is closed by default", () => {
    expect(wrapper.state("open")).toBe(false);
  });
  test("menu button is displayed", () => {
    const menuButton = findByTestAtter(wrapper, "menu-button");
    expect(menuButton.length).toBe(1);
  });
});

describe("...After menu button is clicked", () => {
  let wrapper: ShallowWrapper;
  let menuButton: ShallowWrapper;
  beforeEach(() => {
    shallow = createShallow({ untilSelector: `[data-test="nav-drawer"]` });
    wrapper = setup();

    menuButton = findByTestAtter(wrapper, "menu-button");
    menuButton.simulate("click", { preventDefault() {} });
  });
  test("opens the drawer", () => {
    expect(wrapper.state("open")).toBe(true);
  });
  test("closes when the a destination is clicked", () => {
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Click a random destination
    const destinations = wrapper.find(".destination");
    expect(destinations.length).toBeGreaterThan(0);
    const destinationIndex = getRandomInt(0, destinations.length - 1);
    destinations
      .at(destinationIndex)
      .simulate("click", { preventDefault() {} });
    expect(wrapper.state("open")).toBe(false);
  });
});
