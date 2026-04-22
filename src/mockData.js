export const currentUser = {
  id: 'u1',
  name: 'John Doe',
  avatar: 'https://i.pravatar.cc/150?u=u1',
  location: [41.0082, 28.9784], // Istanbul
};

export const mockRequests = [
  {
    id: 'r1',
    user: { id: 'u2', name: 'Zeynep Kaya', avatar: 'https://i.pravatar.cc/150?u=u2', rating: 4.8 },
    restaurant: 'Burger King',
    restaurantCategory: 'Fast Food',
    targetAmount: 300,
    currentAmount: 120,
    remainingAmount: 180,
    distance: '300m',
    expiresIn: '15 min',
    location: [41.0100, 28.9800],
    description: 'I will buy a menu, the minimum delivery is too high for one person, anyone want to join?',
    participants: 1,
    status: 'active'
  },
  {
    id: 'r2',
    user: { id: 'u3', name: 'Caner Oz', avatar: 'https://i.pravatar.cc/150?u=u3', rating: 4.5 },
    restaurant: 'Komagene',
    restaurantCategory: 'Turkish Cuisine',
    targetAmount: 200,
    currentAmount: 80,
    remainingAmount: 120,
    distance: '500m',
    expiresIn: '25 min',
    location: [41.0050, 28.9750],
    description: 'Ordering a mega wrap, looking for a partner.',
    participants: 1,
    status: 'active'
  },
  {
    id: 'r3',
    user: { id: 'u4', name: 'Elif Demir', avatar: 'https://i.pravatar.cc/150?u=u4', rating: 4.9 },
    restaurant: 'Dominos Pizza',
    restaurantCategory: 'Pizza',
    targetAmount: 400,
    currentAmount: 200,
    remainingAmount: 200,
    distance: '800m',
    expiresIn: '40 min',
    location: [41.0120, 28.9710],
    description: 'Need 2 more people to benefit from the buy 3 pay for 1 large pizza campaign.',
    participants: 2,
    status: 'active'
  }
];
