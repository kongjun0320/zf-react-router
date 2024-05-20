export const userAPI = {
  list() {
    const userStr = localStorage.getItem('users');
    const users = userStr ? JSON.parse(userStr) : [];
    return users;
  },
  add(user) {
    let users = userAPI.list();
    if (!user.id) {
      user.id = users.length;
    }
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  },
  find(userId) {
    let users = userAPI.list();
    return users.find((user) => user.id === userId);
  },
};
