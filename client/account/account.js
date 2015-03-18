
Template.Mongol_account.helpers({
  active: function () {
    if (Session.equals("Mongol_currentCollection", "account_618")) {
      return "Mongol_row_expand";
    }
  },
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


Template.Mongol_account.events({
  'click .Mongol_row': function () {
    if (Session.equals("Mongol_currentCollection", "account_618")) {
      Session.set("Mongol_currentCollection", null);
    } else {
      Session.set("Mongol_currentCollection", "account_618");
    }
  },
  'click .Mongol_contentView': function(e, t) {
    e.stopPropagation();
  }
});
