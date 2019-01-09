export default {
  post: jest.fn(() => Promise.resolve({ data: { message: "success", id: 1 } }))
};
