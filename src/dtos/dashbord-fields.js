export default class DashboardFields {
  constructor(data = {}) {
    this["Birthday"] = data.birthday;
    this["Email"] = data.email;
    this["Activated accaount"] = data.hasActivated ? "Yes" : "No";
    this["Last Name"] = data.lastName;
    this["Name"] = data.name;
    this["Phone"] = data.phone;
    this["Gender"] = data.gender;
  }
}
