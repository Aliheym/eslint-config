interface ITest {}

const someCondition: boolean = true;

if (someCondition === true) {
  const test: ITest = {};

  // eslint-disable-next-line no-console
  console.log(test);
}
