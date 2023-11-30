import {
  BatchedSQLDataSource,
  BatchedSQLDataSourceProps,
} from '@nic-jennings/sql-datasource';

export default class MainDataSource extends BatchedSQLDataSource {
  // getBar;

  constructor(config: BatchedSQLDataSourceProps) {
    super(config);

    // batching
    // this.getBar = this.db.query
    //     .select("*")
    //     .from({b: "bar"})
    //     .batch(async (query, keys) => {
    //       const result = query.whereIn("b.id", keys);
    //       return keys.map((x) => result?.filter((y) => y.id === x)
    //     });
  }

  // Standard
  getPlayers() {
    return this.db.query.cache.select('*').from('players');
  }

  // // caching
  // getFooCached() {
  //   return this.db.query
  //     .select("*")
  //     .from("foo")
  //     .where({ id: 1 })
  //     .cache(10);
  // }
}
