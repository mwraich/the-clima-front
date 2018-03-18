import Temperature from "./Temperature";

it('renders correctly', () => {
  const wrapper = render(
    <Temperature city="Toronto" temp={10} toggleForecast={
        () => {}}/>
    );
    expect(wrapper).toMatchSnapshot();
});
