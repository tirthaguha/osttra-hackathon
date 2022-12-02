const authData = {
  "a@ms.com": { password: "Password1", org: "Morgan Stanley" },
  "a@wf.com": { password: "Password1", org: "Wells Fargo" },
  "a@boa.com": { password: "Password1", org: "Bank Of America" },
  "a@jpmc.com": { password: "Password1", org: "JP Morgan Chase" },
}

const orgArray = [
  "Morgan Stanley", "Wells Fargo", "Bank Of America", "JP Morgan Chase"
]

export function validateAuth(username: string, password: string): boolean {
  console.log(username, password);
  console.log(authData[username].password);
  if (authData[username].password === password) {
    return true;
  }
  return false;
}

export function orgData(username: string): string {
  return authData[username].org
}

export function otherOrgs(org: string): any {
  const newArray = orgArray.filter((val) => {
    if (val !== org) {
      return val;
    }
  })
  return newArray;
}
