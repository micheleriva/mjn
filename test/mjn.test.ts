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
  expect(mjn(SimpleObj, "_")).toBeUndefined();
  expect(mjn(SimpleObj, "*[]^^!!!")).toBeUndefined();
  expect(mjn(SimpleObj, "id[20]")).toBeUndefined();
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
  expect(
    mjn(ComplexObject, "matrix[2][1][10][100].foo.bar.baz")
  ).toBeUndefined();
  expect(mjn(ComplexObject, "matrix.idonotexist")).toBeUndefined();
  expect(mjn(ComplexObject, "matrix[0][1]")).toBe(2);
  expect(mjn(ComplexObject, "matrix[1][0]")).toBe(4);
  expect(mjn(ComplexObject, "matrix[1][2]")).toBe(6);
  expect(mjn(ComplexObject, "nested.object.and.useless")).toBe("values");
  expect(mjn(ComplexObject, "nested.object.with.arrays[0].a[0]")).toBe(1);
  expect(mjn(ComplexObject, "nested.object.with.arrays[0].a[4]")).toBe(5);
  expect(mjn(ComplexObject, "nested.object.with.arrays[1].b[1]")).toBe(7);
  expect(mjn(ComplexObject, "nested.object.with.arrays[1].b[2]")).toBe(8);
  expect(
    mjn(ComplexObject, "nested.object.with.arrays[3].a[0]")
  ).toBeUndefined();
});

const nestedArrays = [
  [1, 2, 3, 4],
  ["foo", "bar", "baz"],
  [[0], [1], [10, 100, 1000]],
  [[[[[[[9]]]]]]]
];

test("Testing MJN on nestedArrays", () => {
  expect(mjn(nestedArrays, "[0][0]")).toBe(1);
  expect(mjn(nestedArrays, "[0][1]")).toBe(2);
  expect(mjn(nestedArrays, "[1][1]")).toBe("bar");
  expect(mjn(nestedArrays, "[1][2]")).toBe("baz");
  expect(mjn(nestedArrays, "[2][0][0]")).toBe(0);
  expect(mjn(nestedArrays, "[2][1][0]")).toBe(1);
  expect(mjn(nestedArrays, "[2][2][2]")).toBe(1000);
  expect(mjn(nestedArrays, "[3][0][0][0][0][0][0][0]")).toBe(9);
  expect(mjn(nestedArrays, "[3][0][0][0][0][0][0][1]")).toBeUndefined();
  expect(mjn(nestedArrays, "[3][0][0][1][0][0][0][0]")).toBeUndefined();
  expect(mjn(nestedArrays, "[4]")).toBeUndefined();
});

test("Testing MJN on non object/array types", () => {
  expect(mjn("foo", "[0]")).toBeUndefined();
  expect(mjn("foo", "[4][2]")).toBeUndefined();
  expect(mjn("2", "key.key2")).toBeUndefined();
  expect(mjn(423, "[1]")).toBeUndefined();
  expect(mjn(423, "k.s")).toBeUndefined();
  expect(mjn("foo", "a.b")).toBeUndefined();
  expect(mjn("[2345, 123]", "[1]")).toBeUndefined();
  expect(mjn("{a: 2}", "a")).toBeUndefined();
});
