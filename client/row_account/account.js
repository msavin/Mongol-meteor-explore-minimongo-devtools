Template.Mongol_account.helpers({
  hasAccountsUI: function () {
    if (Template.loginButtons) {
      return true;
    }
  },
  canSignIn: function () {
    // Not reactive, but it'll have to do
    return !!Package['accounts-base'] && !!Package['accounts-ui'] && !Meteor.userId() && $('#login-sign-in-link').length;
  }
});
