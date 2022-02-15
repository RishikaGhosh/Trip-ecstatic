import { addCityToDOM, fetchCities } from "../../modules/landing_page.js";
require("jest-fetch-mock").enableMocks();
const fs = require("fs");
const path = require("path");
const mockCitiesData = require("../fixtures/cities.json");

const html = fs.readFileSync(
  path.resolve(__dirname, "../../index.html"),
  "utf8"
);
jest.dontMock("fs");

describe("Landing Page Tests", function () {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  });

  afterEach(() => {
    // restore the original func after test
    jest.resetModules();
    fetch.resetMocks();
  });

  it("fetchCities() - Makes a fetch call for /cities API endpoint and returns an array with the cities data", async () => {
    // Ref: https://www.leighhalliday.com/mock-fetch-jest
    // fetch.mockResponseOnce argument has to be string
    fetch.mockResponseOnce(JSON.stringify(mockCitiesData));

    let data = await fetchCities();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).not.toHaveBeenCalledWith(expect.stringContaining("//cities"));
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/cities"));
    expect(data).toBeInstanceOf(Array);
    expect(data).toEqual(mockCitiesData);
  });

  it("fetchCities() - Catches error and returns null, if fetch call fails ", async () => {
    fetch.mockReject(new Error(null));

    const data = fetchCities();

    await expect(data).resolves.toEqual(null);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).not.toHaveBeenCalledWith(expect.stringContaining("//cities"));
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/cities"));
  });

  it("addCityToDOM() - Adds a new city, London with id value of <a> tag set as london", function () {
    addCityToDOM("london", "London", "London is the capital of UK", "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format");
    expect(document.getElementById("london")).toBeTruthy();
  });

  it("addCityToDOM() - Correctly links city card to the corresponding Adventures page", function () {
    const expected = "adventures/?city=london";
    addCityToDOM("london", "London", "London is the capital of UK", "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format");
    expect(document.getElementById("london").href).toEqual(
      expect.stringContaining(expected)
    );
  });
});
