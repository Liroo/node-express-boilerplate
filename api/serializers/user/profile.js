const profileSerializer = (profile) => {
  if (!profile) {
    return {};
  }

  const data = {
    firstName: profile.firstName,
    lastName: profile.lastName,
  };

  return data;
};

export default profileSerializer;
