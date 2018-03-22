export default {
  name: 'TextHeadingJsx',
  props: {
    message: {
      type: String,
    },
  },
  render() {
    return (
      <div>{this.message}</div>
    );
  },
};
