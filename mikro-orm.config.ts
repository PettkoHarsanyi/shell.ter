import { Configuration, IDatabaseDriver, Options } from "@mikro-orm/core";
import { Dog } from "./src/dogs/entities/dog";
import { User } from "./src/users/entity/user";
import { Walk } from "./src/walks/entities/walk";

export default {
    entities: [Dog, Walk, User], // no need for `entitiesTs` this way
    dbName: (process.env.seed ? './dist/' : '') + process.env.dbName || 'shellter.sqlite3',
    type: 'sqlite', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
    migrations:{
      path: './migrations',
      pattern: /^[\w-]+\d+\.(ts|js)$/,
    }
  } as Options<IDatabaseDriver>;