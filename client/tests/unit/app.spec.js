import { mount } from "@vue/test-utils";
import App, { API } from "@/App";
import mockAxios from "../../__mocks__/axios";
// import mockAxios from "axios";

describe("App", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(App);
  });

  it("renders a without crashing", () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.vm.message).toBe("");
    expect(wrapper.vm.downloadLink).toBe("");
    expect(wrapper.vm.error).toBe(false);
    expect(wrapper.vm.input.total).toBe("");
    expect(wrapper.vm.input.error).toBe("");
  });

  it("handles ", done => {
    wrapper.setData({ input: { total: 5 } });
    expect(wrapper.vm.input.total).toBe(5);
    wrapper.find("form").trigger("submit");
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.message).toBe("success");
      expect(wrapper.vm.downloadLink).toBe(API + "/1");
      expect(wrapper.vm.error).toBe(false);
      expect(wrapper.vm.input.total).toBe("");
      expect(wrapper.vm.input.error).toBe("");
      expect(wrapper.vm.input.total).toBe("");
      done();
    });
  });

  it("clears message once the input field is focused", done => {
    wrapper.setData({ input: { total: 5 } });
    expect(wrapper.vm.input.total).toBe(5);
    wrapper.find("form").trigger("submit");
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.message).toBe("success");
      wrapper.find("input").trigger("focus");
      expect(wrapper.vm.message).toBe("");
      done();
    });
  });

  it("handles error cases", done => {
    wrapper.setData({ input: { total: 5 } });
    expect(wrapper.vm.input.total).toBe(5);
    mockAxios.post.mockImplementation(() =>
      Promise.reject({
        response: { status: 500, data: { error: { message: "failure" } } }
      })
    );
    wrapper.find("form").trigger("submit");
    wrapper.vm.$nextTick(() => {
      // expect(wrapper.vm.message).toBe("failure");
      done();
    });
  });
});
