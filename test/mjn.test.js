const mjn = require("./main");

const SimpleObj = {
  id: 29002,
  name: {
    first: "John",
    last: "Doe"
  },
  birth: {
    year: 1950,
    month: "Jan",
    day: 29
  },
  contacts: {
    email: {
      work: "foo@johndoefoo.foo",
      home: null
    }
  },
  children_ids: [29182, 29381, 29383]
};

test("Testing MJN on a simple object", () => {
  expect(mjn(SimpleObj, "name.first")).toBe("John");
  expect(mjn(SimpleObj, "name.last")).toBe("Doe");
  expect(mjn(SimpleObj, "name.middle")).toBe(null);
  expect(mjn(SimpleObj, "birth.year")).toBe(1950);
  expect(typeof mjn(SimpleObj, "birth")).toBe(Object);
  expect(mjn(SimpleObj, "children_ids[1]")).toBe(29381);
});
