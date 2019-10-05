import profileSerializer from 'serializers/users/profile';

const userSerializer = (user) => {
  if (!user) {
    return {};
  }

  const data = {
    type: 'user',

    id: user.id,

    email: user.email,
    profile: profileSerializer(user.profile),
    companies: user.companies,
  };

  return data;
};

export default userSerializer
