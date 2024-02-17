interface Example {
  property?: string;
}

const example: Example = {
  property: 'foo',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const includesBaz = example.property!.includes('baz');
