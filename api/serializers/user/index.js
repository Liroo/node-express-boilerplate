import profileSerializer from 'serializers/user/profile';

const userSerializer = (user) => {
  if (!user) {
    return {};
  }

  const data = {
    type: 'user',

    id: user.id,

    email: user.email,

    profile: profileSerializer(user.profile),
  };

  return data;
};

export default userSerializer;
