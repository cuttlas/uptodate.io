import { truncate } from "./utils";

describe("Truncate", () => {
  it("shouldn't add a dot when it's an empty string", () => {
    const res = truncate("", 5);
    expect(res).toEqual("");
  });

  it("shouldn't add a dot when it ends with !", () => {
    const res = truncate("hola!", 5);
    expect(res).toEqual("hola!");
  });

  it("should add a dot at the end of the string if it doesn't have it", () => {
    const res = truncate("patata", 500);
    expect(res).toEqual("patata.");
  });

  it("shouldn't add a dot at the end of the string if already has it", () => {
    const res = truncate("patata.", 500);
    expect(res).toEqual("patata.");
  });

  it("should truncate and add an elipsis when there is no previous end of line", () => {
    const res = truncate("patata", 4);
    expect(res).toEqual("p...");
  });

  it("should truncate and add an elipsis even where there are end of lines", () => {
    const res = truncate("patata. mongeta. sindria.", 4);
    expect(res).toEqual("p...");
  });

  it("should truncate to the first end of line that doesn't exceed the limit", () => {
    const res = truncate("patata. mongeta. sindria. llimona.", 20);
    expect(res).toEqual("patata. mongeta.");
  });
});
