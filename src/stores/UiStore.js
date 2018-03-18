import { observable, action } from "mobx";

class UiStore {
  @observable showForecast = false;
  @observable showChat = false;

  @action
  toggleForecast = () => {
    this.showForecast = !this.showForecast;
  };

  @action
  toggleChat = () => {
    this.showChat = !this.showChat;
  };
}

// singleton pattern, i.e. why new UiStore() vs. default UiStore
export default new UiStore();
