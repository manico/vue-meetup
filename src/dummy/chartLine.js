export default {
  title: 'Stocks',
  description: 'Stocks through time',
  timeField: 'date',
  dataSource: {
    name: 'stocks',
    model: 'Stock',
    connector: {
      type: 'http',
      options: {
        url: '/data/temperature.json',
      },
    },
    schema: {
      date: {
        name: 'date',
        type: 'Date',
        label: 'Date',
      },
      newYork: {
        name: 'newYork',
        type: 'Number',
        label: 'New York',
      },
      sanFrancisco: {
        name: 'sanFrancisco',
        type: 'Number',
        label: 'San Francisco',
      },
      austin: {
        name: 'austin',
        type: 'Number',
        label: 'Austin',
      },
    },
  },
};
