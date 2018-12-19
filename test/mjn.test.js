"use strict";
exports.__esModule = true;
var main_1 = require("../main");
var SimpleObj = {
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
test("Testing MJN on a simple object", function () {
    expect(main_1["default"](SimpleObj, "name.first")).toBe("John");
    expect(main_1["default"](SimpleObj, "name.last")).toBe("Doe");
    expect(main_1["default"](SimpleObj, "name.middle")).toBeUndefined();
    expect(main_1["default"](SimpleObj, "birth.year")).toBe(1950);
    expect(main_1["default"](SimpleObj, "children_ids[1]")).toBe(29381);
    expect(main_1["default"](SimpleObj, "children_ids[4]")).toBeUndefined();
    expect(main_1["default"](SimpleObj, "foo[4]")).toBeUndefined();
    expect(main_1["default"](SimpleObj, "birth.day.k")).toBeUndefined();
});
var ComplexObject = {
    matrix: [[1, 2, 3], [4, 5, 6]],
    nested: {
        object: {
            "with": {
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
test("Testing MJN on a complex object", function () {
    expect(main_1["default"](ComplexObject, "foo")).toBeUndefined();
    expect(main_1["default"](ComplexObject, "matrix[2][1][10][100]")).toBeUndefined();
    expect(main_1["default"](ComplexObject, "matrix[0][1]")).toBe(2);
    expect(main_1["default"](ComplexObject, "matrix[1][0]")).toBe(4);
    expect(main_1["default"](ComplexObject, "nested.object.and.useless")).toBe("values");
    expect(main_1["default"](ComplexObject, "nested.object.with.arrays[0].a[0]")).toBe(1);
    expect(main_1["default"](ComplexObject, "nested.object.with.arrays[0].a[4]")).toBe(5);
    expect(main_1["default"](ComplexObject, "nested.object.with.arrays[1].b[1]")).toBe(7);
    expect(main_1["default"](ComplexObject, "nested.object.with.arrays[3].a[0]")).toBeUndefined();
});
