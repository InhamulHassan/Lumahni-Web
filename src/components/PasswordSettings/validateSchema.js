export default {
  old_password: {
    presence: { allowEmpty: false, message: "^Old Password is required" },
    length: {
      maximum: 128
    }
  },
  new_password: {
    presence: { allowEmpty: false, message: "^New Password is required" },
    length: {
      maximum: 128
    }
  },
  confirm_password: {
    presence: {
      allowEmpty: false,
      message: "^Please re-enter your new password"
    },
    equality: {
      attribute: "new_password",
      message: "^The passwords do not match"
    },
    length: {
      maximum: 128
    }
  }
};
