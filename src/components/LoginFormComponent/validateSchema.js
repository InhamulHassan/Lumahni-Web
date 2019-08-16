export default {
  username: {
    presence: { allowEmpty: false, message: "^Username is required" },
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: "^Password is required" },
    length: {
      maximum: 128
    }
  }
};
