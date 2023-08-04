import bcryptjs from 'bcryptjs';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  await knex('users').del()
  await knex('users').insert([
    {
      // id: 1,
      first_name: 'Sardor',
      last_name: 'Yuldashev',
      username: 'sardorbek',
      password: bcryptjs.hashSync('123456', 10),
    },
    {
      // id: 2,
      first_name: 'Imron',
      last_name: 'Abdusalimov',
      username: 'imron',
      password: bcryptjs.hashSync('123456', 10),
    },
    {
      // id: 3,
      first_name: 'Sherzod',
      last_name: 'Arziyev',
      username: 'sherzod',
      password: bcryptjs.hashSync('123456', 10),
    },
    {
      // id: 4,
      first_name: 'Aziz',
      last_name: 'Nabiyev',
      username: 'aziz',
      password: bcryptjs.hashSync('123456', 10),
    },
    {
      // id: 5,
      first_name: "Bunyod",
      last_name: "Jo'rayev",
      username: 'bunyod',
      password: bcryptjs.hashSync('123456', 10),
    },
    {
      // id: 6,
      first_name: "Bekzod",
      last_name: "To'ychiyev",
      username: 'bekzod',
      password: bcryptjs.hashSync('123456', 10),
    },
    {
      // id: 7,
      first_name: "Akmal",
      last_name: "Usmonov",
      username: 'akmal',
      password: bcryptjs.hashSync('123456', 10),
    },
    {
      // id: 8,
      first_name: "Javohir",
      last_name: "Umaraliyev",
      username: 'javohir',
      password: bcryptjs.hashSync('123456', 10),
    },
  ]);
};
