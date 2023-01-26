import Images from './staticResources/index';

export const mockUser = {
    firstName : 'Jan',
    lastName : 'Kowalski',
    transactionHistory : [
        { key: 'transaction1', value : '121.99', type : 'in' },
        { key: 'transaction2', value : '-122.99', type : 'out' },
        { key: 'transaction3', value : '123.99', type : 'in' },
        { key: 'transaction4', value : '-124.99', type : 'out' },
        { key: 'transaction5', value : '125.99', type : 'in' },
        { key: 'transaction6', value : '125.99', type : 'in' }
    ],
    overall : 0.00,
    image: {
        source: Images.defaultImage,
        isDefault: true
    }

}


