const sessionSerializer = ({ user, session } = {}) => {
  if (!session && !user) {
    return {};
  }
  if (!session &&
    (session = user.getLastSession(user)) == {}) {
    return {};
  }

  const data = {
    type: 'session',

    token: session.token,
  };
  if (user) {
    data.user = user.id;
  }

  return data;
};

export default sessionSerializer;
