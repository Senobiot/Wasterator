export default class DashboardFields {
  constructor(data) {
    data = data || {};
    this["Birthday"] = data.birthday;
    this["Email"] = data.email;
    this["Activated account"] = data.hasActivated ? "Yes" : "No";
    this["Last Name"] = data.lastName;
    this["Name"] = data.name;
    this["Phone"] = data.phone;
    this["Gender"] = data.gender;
  }
}
