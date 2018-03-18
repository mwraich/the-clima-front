import Temperature from "./Temperature";

it('renders correctly', () => {
  const wrapper = render(
    <Temperature city="Toronto" temp={10} toggleForecast={
        () => {}} />
    );
    expect(wrapper).toMatchSnapshot();
});

it('calls toggle function when clicked', () => {
  const spy = sinon.spy();
  const wrapper = mount(
    <Temperature city="Toronto" temp={10} toggleForecast={spy} />
    );

  wrapper
    .find("div")
    .first()
    .simulate("click");

  expect(spy.calledOnce).toEqual(true)
})
