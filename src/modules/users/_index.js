import { readFileSync } from 'fs';
import { join } from 'path';
import { pubsub } from '../../graphql/pubsub.js';
import { ForbiddedError } from '../../shared/errors/index.js';
import { isLoggedIn } from '../../graphql/is-loggedin.js';
import { addUser } from './add-user.js';
import { listUsers } from './list-users.js';
import { showUser } from './show-user.js';
import { editUser } from './edit-user.js';
import { removeUser } from './remove-user.js';
import { loginUser } from './login-user.js';

const typeDefs = readFileSync(
  join(process.cwd(), 'src', 'modules', 'users', '_schema.gql'),
  'utf8'
);

const resolvers = {
  Query: {
    users: (_, __, contextValue) => {
      isLoggedIn(contextValue);

      return listUsers();
    },

    user: (_, args, contextValue) => {
      isLoggedIn(contextValue);

      return showUser({ id: args.id });
    }
  },
  Mutation: {
    createUser: async (_, args) => {

      const result = await addUser(args.input);

      pubsub.publish('USER_CREATED', { userCreated: result });

      return result;
    },

    updateUser: (_, args, contextValue) => {
      isLoggedIn(contextValue);

      if (contextValue.user.id !== +args.id) {
        throw new ForbiddedError("Faqat o'z profilingizni tahrirlay olasiz");
      };

      return editUser({ id: args.id, ...args.input });
    },

    removeUser: (_, args, contextValue) => {
      isLoggedIn(contextValue);

      if (contextValue.user.id !== +args.id) {
        throw new ForbiddedError("Faqat o'z profilingizni o'chira olasiz");
      };

      return removeUser({ id: args.id });
    },

    loginUser: (_, args) => {
      return loginUser(args.input);
    },
  },
  Subscription: {
    userCreated: {
      subscribe: () => pubsub.asyncIterator(['USER_CREATED']),
    },
  }
};

export default { typeDefs, resolvers };