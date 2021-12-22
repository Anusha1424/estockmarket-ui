const NavItems = () => {
  return [
    {
      title: 'Company List',
      to: '/',
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: '',
    },
    {
      title: 'Add Company',
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: '/addCompany',
    },
    {
      title: 'Add Stock',
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: '/addStock',
    },
    {
      title: 'Search Stocks',
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: '/searchStocks',
    },
  ];
};

export default NavItems;
