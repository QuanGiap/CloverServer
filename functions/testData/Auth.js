const users = [{email:'test@gmail.com'}]

async function addTestUsers(auth) {
    const listUsersResult = await auth.listUsers(1); // Retrieve 1 user
    if (listUsersResult.users.length === 0) {
        const promises = users.map((user) => auth.createUser({
            email: user.email,
        }));
        await Promise.all(promises);
    }
}

module.exports = {users, addTestUsers};