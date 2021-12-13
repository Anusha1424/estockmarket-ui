const NavItems = () => {
  return [
    {
      title: 'home',
      to: '/home',
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: '',
    },
    {
      title: 'Top Referrals',
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: '/topreferrals',
    },
  ];
};

export default NavItems;
