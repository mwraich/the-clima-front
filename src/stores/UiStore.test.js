import UiStore from "./UiStore";

it("toggles forecast flag", () => {
  UiStore.showForecast = false;

  UiStore.toggleForecast();

  expect(UiStore.showForecast).toEqual(true);
});
