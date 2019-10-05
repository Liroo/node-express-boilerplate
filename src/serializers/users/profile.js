const profileSerializer = (profile) => {
  if (!profile) {
    return {};
  }

  const data = {
    firstName: profile.firstName,
    lastName: profile.lastName,

    company: profile.company,
  };

  return data;
};

export default profileSerializer
