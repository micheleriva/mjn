import mjn from "../main";

const SimpleObj: object = {
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
  expect(mjn(SimpleObj, "name.middle")).toBeUndefined();
  expect(mjn(SimpleObj, "birth.year")).toBe(1950);
  expect(mjn(SimpleObj, "children_ids[1]")).toBe(29381);
  expect(mjn(SimpleObj, "children_ids[4]")).toBeUndefined();
  expect(mjn(SimpleObj, "foo[4]")).toBeUndefined();
  expect(mjn(SimpleObj, "birth.day.k")).toBeUndefined();
});

const ComplexObject = {
  matrix: [[1, 2, 3], [4, 5, 6]],
  nested: {
    object: {
      with: {
        arrays: [
          {
            a: [1, 2, 3, 4, 5]
          },
          {
            b: [6, 7, 8, 9, 10]
          }
        ]
      },
      and: {
        useless: "values"
      }
    }
  }
};

test("Testing MJN on a complex object", () => {
  expect(mjn(ComplexObject, "foo")).toBeUndefined();
  expect(mjn(ComplexObject, "matrix[2][1][10][100]")).toBeUndefined();
  expect(mjn(ComplexObject, "matrix[0][1]")).toBe(2);
  expect(mjn(ComplexObject, "matrix[1][0]")).toBe(4);
  expect(mjn(ComplexObject, "nested.object.and.useless")).toBe("values");
  expect(mjn(ComplexObject, "nested.object.with.arrays[0].a[0]")).toBe(1);
  expect(mjn(ComplexObject, "nested.object.with.arrays[0].a[4]")).toBe(5);
  expect(mjn(ComplexObject, "nested.object.with.arrays[1].b[1]")).toBe(7);
  expect(
    mjn(ComplexObject, "nested.object.with.arrays[3].a[0]")
  ).toBeUndefined();
});
