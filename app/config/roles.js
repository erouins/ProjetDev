const allRoles = {
  client: ['client'],
  restaurant: ['restaurant'],
  deliverer: ['deliverer'],
  admin: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
