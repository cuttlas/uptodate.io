const twitterHandler = require("./auth").twitter;
const userRepo = require("../repos/users");
const redirect = jest.fn();

userRepo.insert = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
});

it("should create a new user when the user doesn't exists", async () => {
  userRepo.find = jest.fn();

  await twitterHandler.call({
    query: {
      "raw[screen_name]": "cuttlas",
      "raw[user_id]": "1234",
      access_token: "5678"
    },
    redirect
  });

  expect(userRepo.find).toHaveBeenCalledWith({
    nick: "cuttlas"
  });

  expect(userRepo.insert).toHaveBeenCalledWith({
    nick: "cuttlas",
    twitterId: "1234",
    token: "5678"
  });

  expect(redirect).toHaveBeenCalledWith("http://localhost:3000?token=5678");
});

it("should do nothing and redirect when the user exists", async () => {
  userRepo.find = jest.fn(async () => ({
    id: 1
  }));

  await twitterHandler.call({
    query: {
      "raw[screen_name]": "cuttlas",
      access_token: "5678"
    },
    redirect
  });

  expect(userRepo.find).toHaveBeenCalledWith({
    nick: "cuttlas"
  });

  expect(userRepo.insert).not.toHaveBeenCalled();
  expect(redirect).toHaveBeenCalledWith("http://localhost:3000?token=5678");
});

it("should redirect with an error param when the find method throws an error", async () => {
  userRepo.find = jest.fn(async () => {
    throw "error";
  });

  await twitterHandler.call({
    query: {
      "raw[screen_name]": "cuttlas",
      access_token: "5678"
    },
    redirect
  });

  expect(userRepo.insert).not.toHaveBeenCalled();
  expect(redirect).toHaveBeenCalledWith("http://localhost:3000?error=true");
});

it("should redirect with an error param when the insert method throws an error", async () => {
  userRepo.find = jest.fn();
  userRepo.insert = jest.fn(async () => {
    throw "error";
  });

  await twitterHandler.call({
    query: {
      "raw[screen_name]": "cuttlas",
      access_token: "5678"
    },
    redirect
  });

  expect(redirect).toHaveBeenCalledWith("http://localhost:3000?error=true");
});
