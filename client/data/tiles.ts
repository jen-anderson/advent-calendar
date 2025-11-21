import { Tile } from '../types'

export const tiledata: Omit<Tile, 'id' | 'isOpen'>[] = [
  //Creates a Tile copy except for id and isOpen values, which change dynamically in Calendar.
  {
    image: '../src/images/01.jpg',
    text: 'Look at meeeeee',
  },
  {
    image: '../src/images/02.jpg',
    text: 'Thugscape',
  },
  {
    image: '/images/3.jpg',
    text: 'Three French hens',
  },
  {
    image: '/images/4.jpg',
    text: 'Four calling birds',
  },
  {
    image: '/images/5.jpg',
    text: 'Five golden rings',
  },
  {
    image: '/images/6.jpg',
    text: 'Six geese a-laying',
  },
  {
    image: '/images/7.jpg',
    text: 'Seven swans a-swimming',
  },
  {
    image: '/images/8.jpg',
    text: 'Eight maids a-milking',
  },
  {
    image: '/images/9.jpg',
    text: 'Nine ladies dancing',
  },
  {
    image: '/images/10.jpg',
    text: 'Ten lords a-leaping',
  },
  {
    image: '/images/11.jpg',
    text: 'Eleven pipers piping',
  },
  {
    image: '/images/12.jpg',
    text: 'Twelve drummers drumming',
  },
  {
    image: '/images/13.jpg',
    text: 'A lucky number',
  },
  {
    image: '/images/14.jpg',
    text: 'A fortnight',
  },
  {
    image: '/images/15.jpg',
    text: 'Halfway there!',
  },
  {
    image: '/images/16.jpg',
    text: 'Sweet sixteen',
  },
  {
    image: '/images/17.jpg',
    text: 'Dancing queen',
  },
  {
    image: '/images/18.jpg',
    text: 'Time to be an adult',
  },
  {
    image: '/images/19.jpg',
    text: 'One before twenty',
  },
  {
    image: '/images/20.jpg',
    text: 'A score',
  },
  {
    image: '/images/21.jpg',
    text: 'Old enough to drink (in the US)',
  },
  {
    image: '/images/22.jpg',
    text: 'Catch-22',
  },
  {
    image: '/images/23.jpg',
    text: 'A prime time',
  },
  {
    image: '/images/24.jpg',
    text: 'A full day',
  },
  {
    image: '/images/25.jpg',
    text: 'Christmas Day!',
  },
]
